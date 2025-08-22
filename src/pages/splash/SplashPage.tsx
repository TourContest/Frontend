import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashLogo from "src/components/splash/SplashLogo";

const SplashPage = () => {
    const navigate = useNavigate();
    const [started, setStarted] = useState(false);

    const handleStart = () => {
        setStarted(true);
        navigate('/splash/permission')
    }

    // useEffect(() => {
    //     if (!started) return;

    //     const isFirstVisit = ''; // 첫방문 여부 체크 (추후 추가)
    //     const accessToken = ''; // 토큰 확인 (자동 로그인)

    //     const timer = setTimeout(() => {
    //         if (accessToken) {
    //             navigate('/home')
    //         } else if(!isFirstVisit) {
    //             navigate('/splash/language');
    //         } else {
    //             navigate('/auth/login');
    //         }
    //     }, 500); // 로고 애니메이션 없을 시 삭제 !!

    //     return clearTimeout(timer);
    // },[started, navigate])

    return <SplashLogo onStart={handleStart} onLoginClick={() => navigate('/auth/login')}/>
};

export default SplashPage;