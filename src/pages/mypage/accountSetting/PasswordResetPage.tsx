import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonWrapper, Wrapper } from "src/components/auth/login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import PasswordForm from "src/components/commons/Forms/PasswordForm";
import BackHeader from "src/components/commons/Header/BackHeader";
import type { Validation } from "src/components/commons/Inputs/TextField/types";
import { useSessionMe } from "src/features/my-page/useSessionMe";
import { useResetPassword } from "src/features/user/useResetPassword";
import { passwordConfirmSchema, passwordSchema } from "src/utils/validation/passwordSchema";

const PasswordResetPage:React.FC = () => {
    const navigate = useNavigate();

    const { data: me } = useSessionMe();
    const { mutate, isPending, isSuccess } = useResetPassword();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const [passwordError, setPasswordError] = useState('')
    const [confirmError, setConfirmError] = useState('')
    const [successM, setSuccessM] = useState('')


    const validatePassword = (value: string) => {
        const result = passwordSchema.safeParse(value);
        if (!result.success) {
            const message = result.error.issues[0]?.message ?? '비밀번호 형식을 확인해주세요.'
            setPasswordError(message);
            return false;
        }
        setPasswordError('');
        return true;
    };

    const passwordValidation: Validation = passwordError ? 'negative' : password.length > 0 ? 'positive' : 'normal' ;
    const confirmValidation: Validation = confirmError ? 'negative' : successM ? 'positive' : 'normal' ;

    const validateConfirm = (password: string, confirm: string) => {
        const result = passwordConfirmSchema.safeParse({ password, confirm });
        
        if(!result.success) {
            const { fieldErrors } = result.error.flatten();
            const message = fieldErrors.confirm?.[0] ?? '비밀번호가 일치하지 않습니다.';
            setConfirmError(message);
            setSuccessM('');
            return false;
        }

        setConfirmError('');
        setSuccessM('비밀번호가 일치합니다.')
    };

    const onChangePassword = (value: string) => {
        setPassword(value);

        if(value.length === 0) {
            setPasswordError('');
            setConfirmError('');
            return;
        }

        const ok = validatePassword(value);
        // confirm을 이미 입력했다면, 즉시 재검증
        if (ok && confirm.length > 0) validateConfirm(value, confirm);
    };

    const onChangeConfirm = (value: string) => {
        setConfirm(value);

        if(value.length === 0) {
            setConfirmError('');
            setSuccessM('');
            return;
        }

        // 비밀번호가 유효해야 성공
        const passwordOk = validatePassword(password);
        if (passwordOk) validateConfirm(password, value);
    };

    const handleSubmit = () => {
        const email = me?.email;
        if (!email) return;

        mutate(
            { email, newPassword: password },
            {
                onSuccess: () => {
                    setConfirmError('');
                    setSuccessM('비밀번호가 변경되었습니다.');
                    navigate('/mypage')
                },
                onError: (error) => {
                    const message = (error as any)?.response?.data?.message ?? '비밀번호 재설정에 실패했습니다.';
                    setConfirmError(message);
                    setSuccessM('');
                },
            },
        );
    };

    return(
        <>
            <BackHeader title='비밀번호 수정하기'/>
            <Wrapper>
                <PasswordForm 
                    password={password}
                    confirm={confirm}
                    passwordError={passwordError}
                    confirmError={confirmError}
                    successMessage={successM}
                    onChangePassword={onChangePassword}
                    onChangeConfirm={onChangeConfirm}
                    passwordValidation={passwordValidation}
                    confirmValidation={confirmValidation}
                    showConfirm
                    disableAll={isPending || isSuccess}
                />
            </Wrapper>
            <ButtonWrapper>
                <BottomButton type="submit" size="large" onClick={handleSubmit}>수정하기</BottomButton>
            </ButtonWrapper>
        </>
    )
};

export default PasswordResetPage;