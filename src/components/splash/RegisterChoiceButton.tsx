import { EmailRegisterBtn, KaKaoBtn, RegisterButtonWrapper, SplashLogoWrapper, Welcome } from "./splash.style";
import Logo from '../../assets/react.svg';
import KaKao from '../../assets/kakao_login_large_wide.png';

interface RegisterChoiceButtonProps {
    onSelect: (type: 'kakao' | 'email') => void;
}

const RegisterChoiceButton = ({ onSelect }: RegisterChoiceButtonProps) => {
    return (
        <>
            <SplashLogoWrapper>
                <img src={Logo} alt='logo' width={160} />
                <Welcome>
                    <h1>하루제주에 오신 것을 환영합니다!</h1>
                </Welcome>
            </SplashLogoWrapper>
            <RegisterButtonWrapper>
                <KaKaoBtn onClick={() => onSelect('kakao')}>
                    <img src={KaKao} alt="kakao로 시작하기" />
                </KaKaoBtn>
                <EmailRegisterBtn onClick={() => onSelect('email')}>
                    이메일로 시작하기
                </EmailRegisterBtn>
            </RegisterButtonWrapper>
        </>
    )
};

export default RegisterChoiceButton;