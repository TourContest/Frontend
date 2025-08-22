import { GoToLogin, SplashLogoWrapper, Welcome } from "./splash.style";
import { ButtonWrapper } from "../auth/login/login.style";
import Logo from '../../assets/Logo.svg';
import BottomButton from "../commons/Buttons/BottomButton";

interface SplashLogoProps {
    onStart: () => void;
    onLoginClick: () => void;
};

const SplashLogo = ({ onStart, onLoginClick }: SplashLogoProps) => {
    return (
        <>
            <SplashLogoWrapper>
                <img src={Logo} alt='logo' width={160} />
                <Welcome>
                    <h1>하루제주의 첫 걸음</h1>
                    하루제주에 오신 것을 환영합니다. <br/>
                    지금 챌린지에 입장하세요! 
                </Welcome>
            </SplashLogoWrapper>
            <GoToLogin>
                이미 계정이 있나요?
                <span onClick={onLoginClick}>로그인</span>
            </GoToLogin>
            <ButtonWrapper>
                <BottomButton
                    size ='large'
                    onClick={onStart}
                >
                    시작하기
                </BottomButton>
            </ButtonWrapper>
        </>
    ) 
};

export default SplashLogo;