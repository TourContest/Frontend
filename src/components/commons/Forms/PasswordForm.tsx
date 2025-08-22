import type { PasswordFormProps } from "./types"
import InputTextField from "../Inputs/TextField";
import { Head3 } from "src/styles/typography";
import { AuthCaption, AuthFieldWrapper } from "src/components/auth/register/normal/normalRegister.style";

const PasswordForm = ({ 
    password, confirm, passwordError, confirmError, successMessage, passwordValidation, confirmValidation, onChangePassword, onChangeConfirm, showConfirm, disableAll 
}: PasswordFormProps) => {

    // mode : my page
    // const handleSubmit = () => {
    //     if (!isStepMode) {
    //         const result = passwordConfirmSchema.safeParse({ password, confirm });
    //         if(result.success) {
    //             setPasswordError('');
    //             setConfirmError('');
    //             onValidChange?.(true);
    //             onSubmit?.();
    //         } else {
    //             const issues = result.error.flatten().fieldErrors;
    //             setPasswordError(issues.password?.[0] || '');
    //             setConfirmError(issues.confirm?.[0] || '');
    //             onValidChange?.(false);
    //         }
    //     }
    // }

    return (
        <>  
            <Head3>비밀번호를 입력해주세요.</Head3>
            <InputTextField 
                type="password"
                placeholder="특수문자 포함 8-12자로 입력해주세요."
                value={password}
                onChange={(e) => onChangePassword(e.target.value)}
                validation={passwordValidation}
                message={passwordError}
            />
            <AuthFieldWrapper show={showConfirm}>
                <AuthCaption>비밀번호를 한번 더 확인해주세요.</AuthCaption>
                <InputTextField 
                    type="password"
                    value={confirm}
                    onChange={(e) => onChangeConfirm(e.target.value)}
                    validation={confirmValidation}
                    message={confirmError || successMessage}
                    disabled={disableAll}
                />
            </AuthFieldWrapper>
        </>
    )
};

export default PasswordForm;