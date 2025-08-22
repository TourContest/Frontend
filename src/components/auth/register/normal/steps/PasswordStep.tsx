import PasswordForm from "src/components/commons/Forms/PasswordForm"
import { RegisterContainer } from "../normalRegister.style"
import type { PasswordStepProps } from "../types"
import { useState } from "react";
import { passwordConfirmSchema, passwordSchema } from "src/utils/validation/passwordSchema";
import { ButtonWrapper } from "../../../login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import { authApi } from "src/api/auth";

const PasswordStep = ({ password, onChangePassword, onNext, onBack, email }: PasswordStepProps) => {
    const [step, setStep] = useState<'password' | 'confirm'>('password');
    const [confirm, setConfirm] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const [isLock, setIsLocked] = useState(false);

    const passwordValidation = 
        passwordError !== '' ? 'negative' 
        : step === 'confirm' ? 'positive' 
        : 'normal';
    const confirmValidation =
        confirmError !== '' ? 'negative'
        : step === 'confirm' && confirm ? 'positive'
        : 'normal'

    const handleNext = async () => {
        if (step === 'password') {
            const result = passwordSchema.safeParse(password);
            if (!result.success) {
                setPasswordError(result.error.issues[0]?.message || '');
                setConfirmError('');
                return;
            }
            setPasswordError('');
            setStep('confirm');
        } else {
            const result = passwordConfirmSchema.safeParse({ password: password, confirm });
            if (!result.success) {
                const issues = result.error.flatten().fieldErrors;
                setConfirmError(issues.confirm?.[0] || '');
                setPasswordError('');
                return;
            }
            
            // 검증 통과 시
            setConfirmError('');
            setSuccessMessage('맞는 비밀번호입니다.')
            setPasswordError('');
            setIsLocked(true);

            try {
                const res = await authApi.registerAppUser({ email, password });

                if(res.data.success) {
                    setTimeout(() => {onNext();}, 500);
                } else {
                    setIsLocked(false);
                    setSuccessMessage('');
                }
            } catch(err) {
                setIsLocked(false);
                setSuccessMessage('');
            }
        }
    };
    
    const handleBack = () => {
        if (step === 'confirm') {
            setStep('password')
        } else {
            onBack();
        }
    }

    return (
        <>
            <RegisterContainer>
                <PasswordForm 
                    password={password}
                    confirm={confirm}
                    passwordError={passwordError}
                    passwordValidation={passwordValidation}
                    confirmError={confirmError}
                    confirmValidation={confirmValidation}
                    successMessage={successMessage}
                    onChangePassword={onChangePassword}
                    onChangeConfirm={setConfirm}
                    showConfirm={step === "confirm"}
                    disableAll={isLock}
                />
            </RegisterContainer>
            <ButtonWrapper>
                <BottomButton type="button" size="small" onClick={handleBack}>이전</BottomButton>
                <BottomButton type="button" size="medium" onClick={handleNext}>다음</BottomButton>
            </ButtonWrapper>
        </>
    )
};

export default PasswordStep;