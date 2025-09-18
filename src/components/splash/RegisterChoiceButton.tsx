import { EmailRegisterBtn, KaKaoBtn, RegisterButtonWrapper, SplashLogoWrapper, Welcome } from "./splash.style";
import Logo from '../../assets/Logo.svg';
import KaKao from '../../assets/kakao_login_large_wide.png';
import { useNavigate } from "react-router-dom";

interface RegisterChoiceButtonProps {
    onSelect: (type: 'kakao' | 'email') => void;
}

const RegisterChoiceButton = ({ onSelect }: RegisterChoiceButtonProps) => {
    const navigate = useNavigate();

    return (
        <>
            <SplashLogoWrapper>
                <img src={Logo} alt='logo' width={160} />
                <Welcome>
                    <h1>하루제주에 오신 것을 환영합니다!</h1>
                </Welcome>
            </SplashLogoWrapper>
            <RegisterButtonWrapper style={{ minWidth: '360px' }}>
                {/* <KaKaoBtn onClick={() => onSelect('kakao')}>
                    <img src={KaKao} alt="kakao로 시작하기" />
                </KaKaoBtn> */}
                <EmailRegisterBtn onClick={() => navigate('/auth/login')}>
                    로그인 하기
                </EmailRegisterBtn>
                <EmailRegisterBtn onClick={() => onSelect('email')}>
                    {/* 이메일로 시작하기 */}
                    회원가입 하기
                </EmailRegisterBtn>
            </RegisterButtonWrapper>
        </>
    )
};

export default RegisterChoiceButton;