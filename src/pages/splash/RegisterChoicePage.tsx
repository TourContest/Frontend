import { useNavigate } from "react-router-dom";
import { authApi } from "src/api/auth";
import RegisterChoiceButton from "src/components/splash/RegisterChoiceButton";

const RegisterChoicePage = () => {
    const navigate = useNavigate();

    const handleSelect = async (type: 'kakao' | 'email') => {
        if(type === 'kakao') {
            const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
            const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

            // 카카오 인증 페이지로 이동
            const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
            window.location.href = kakaoAuthUrl;
        } else {
            navigate('/auth/register');
        }
    }
    
    return <RegisterChoiceButton onSelect={handleSelect} />
};

export default RegisterChoicePage;