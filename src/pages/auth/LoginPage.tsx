import { useState } from "react";
import BackHeader from "src/components/commons/Header/BackHeader";
import LoginBody from "src/components/auth/login/LoginBody";
import LoginSubmit from "src/components/auth/login/LoginBottom";
import ErrorToast from "src/components/commons/Toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/context";

const LoginPage = () => {
    const [isFormValid, setIsFormValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [loginData, setLoginData] = useState({ email: '', password: '' })

    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleLogin = async () => {
        try {
            // Api 요청
            // const res = await authApi.login({ email: loginData.email, password: loginData.password });
            await signIn({ email: loginData.email, password: loginData.password });
            navigate('/main', { replace: true });

        } catch (error:any) {
            const message = error.response?.message || '로그인에 실패했습니다. 다시 시도해주세요.';
            setToastMessage(message);
            setShowToast(true); 
        }
    }

    return (
        <>
            <BackHeader />
            <LoginBody onValidityChange={setIsFormValid} onLoginDataChange={setLoginData}/>
            <LoginSubmit isFormValid={isFormValid} onSubmit={handleLogin} />
            <ErrorToast 
                visible={showToast}
                message={toastMessage}
                onClose={() => setShowToast(false)}
            />
        </>
    )
}

export default LoginPage;