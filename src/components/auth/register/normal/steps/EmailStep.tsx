import InputTextField from "src/components/commons/Inputs/TextField";
import { AuthCaption, AuthFieldWrapper, DupCheckBtn, EmailInputWrapper, RegisterContainer } from "../normalRegister.style"
import { ButtonWrapper } from "../../../login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import type { EmailStepProps } from "../types";
import { Head3 } from "src/styles/typography";

const EmailStep = ({
    email, authCode, isEmailValid, isDuplicateChecked, showAuthInput, authPassed, emailErrorMessage, authErrorMessage, onChangeEmail, onChangeAuthCode, onEmailBlur, onCheckDuplicate, onConfirmAuth, onNext
}: EmailStepProps) => {
    const isEmailFilled = email.trim() !== '';

    const emailValidation: 'positive' | 'negative' | 'normal' =
        isDuplicateChecked ? 'positive' :
        emailErrorMessage?.trim() ? 'negative' :
        'normal';

    const authValidation: 'positive' | 'negative' | 'normal' = authPassed
    ? 'positive' 
    : authErrorMessage
    ? 'negative'
    : 'normal';

    const emailM = emailErrorMessage
    ? emailErrorMessage
    : isDuplicateChecked
    ? '사용 가능한 이메일입니다.'
    : isEmailFilled
    ? '이메일을 인증해주세요.'
    : '';

    return (
        <>
            <RegisterContainer>
                <EmailInputWrapper>
                    <Head3>이메일을 입력해주세요.</Head3>
                    <InputTextField 
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        validation={emailValidation}
                        value={email}
                        onChange={(e) => onChangeEmail(e.target.value)}
                        onBlur={onEmailBlur}
                        message={emailM}
                        rightSlot={
                            !isDuplicateChecked && (
                                <DupCheckBtn 
                                    type="button" 
                                    disabled={!email.trim()} 
                                    onClick={onCheckDuplicate}
                                    style={{ cursor: isEmailValid ? 'pointer' : 'not-allowed' }}
                                >중복확인</DupCheckBtn>
                            )}
                        readOnly={isDuplicateChecked}
                    />
                </EmailInputWrapper>

                <AuthFieldWrapper show={showAuthInput}>
                    <EmailInputWrapper>
                        <AuthCaption>인증번호를 입력해주세요.</AuthCaption>
                        <InputTextField 
                            type="text"
                            placeholder="인증번호를 입력해주세요."
                            value={authCode}
                            onChange={(e) => onChangeAuthCode(e.target.value)}
                            validation={authValidation}
                            message={authErrorMessage}
                            rightSlot={
                                !authPassed && (
                                    <DupCheckBtn
                                        type="button"
                                        disabled={!authCode.trim()}
                                        onClick={onConfirmAuth}
                                        style={{ cursor: 'pointer'}}
                                    >
                                        확인
                                    </DupCheckBtn>
                                )
                            }
                            readOnly={authPassed}
                        />
                    </EmailInputWrapper>
                </AuthFieldWrapper>
            </RegisterContainer>
            <ButtonWrapper>
                <BottomButton disabled size="small">이전</BottomButton>
                <BottomButton size="medium" type="button" onClick={onNext}>다음</BottomButton>
            </ButtonWrapper>
        </>
    )
};

export default EmailStep;