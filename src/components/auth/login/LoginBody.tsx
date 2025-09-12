import { useEffect, useState } from "react";
import InputTextField from "src/components/commons/Inputs/TextField";
import type { Validation } from "src/components/commons/Inputs/TextField/types";
import { validateLoginForm } from "src/utils/validation/authValidation";
import { Title, Wrapper } from "./login.style";

type Props = {
    onValidityChange: (isValid: boolean) => void;
    onLoginDataChange: (data: { email: string; password: string }) => void;
};

const LoginBody = ({ onValidityChange, onLoginDataChange }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const [emailValidation, setEmailValidation] = useState<Validation>('normal');
    const [passwordValidation, setPasswordValidation] = useState<Validation>('normal');

    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    useEffect(() => {
        const filled = email.trim() !== '' && password.trim() !== '';
        onValidityChange(filled);
        onLoginDataChange({ email, password })
    }, [email, password, onValidityChange, onLoginDataChange]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e. preventDefault();
        setIsSubmit(true);
        
        const { isValid, errors } = validateLoginForm(email,password);
        
        setEmailValidation(errors.email ? 'negative' : 'positive');
        setPasswordValidation(errors.password ? 'negative' : 'positive');

        setEmailMessage(errors.email);
        setPasswordMessage(errors.password);

        onValidityChange(isValid);

        if (!isValid) return;
    };

    return (
        <Wrapper>
            <Title>
                다시 오신 것을 환영해요 :) <br/>
                로그인해주세요.
            </Title>
            <form id='login-form' onSubmit={handleSubmit} noValidate>
                <InputTextField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    validation={emailValidation}
                    message={emailMessage}
                    placeholder="이메일을 입력해주세요."
                />
                <InputTextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    validation={passwordValidation}
                    message={passwordMessage}
                    placeholder="비밀번호를 입력해주세요."
                />
            </form>
        </Wrapper>
    );
};

export default LoginBody;