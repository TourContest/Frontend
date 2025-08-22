import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { authApi } from "src/api/auth";
import { useRegister } from "src/context/AuthContext";

const KaKaoRedirectPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useRegister();
    const location = useLocation();

    useEffect(() => {
        (async () => {
                const code = new URL(window.location.href).searchParams.get('code');
                if(!code) return navigate('/auth/register');
        
                const handleKaKaoLogin = async () => {
                    try {
                        const res = await authApi.kakaoLogin(code);
        
                        if(res.data.failure) {
                            // 신규 회원이면 저장 후 Register Flow로 이동
                            dispatch({ type: 'SET_KAKAO_CODE', payload: code })
                            dispatch({ type: 'SET_KAKAO_EMAIL', payload: res.data.email })
                            dispatch({ type: 'SET_KAKAO_NICKNAME', payload: res.data.nickname })
                            navigate('/auth/register')
                        } else {
                            // 기존 회원
                            navigate('/');
                        }
                    }
                    catch(err) {
                        console.log(err);
                    }
                }
        
                handleKaKaoLogin();
            }
        )
    }, [location.search, dispatch, navigate])

    return <div>카카오 로그인 처리중</div>;
}

export default KaKaoRedirectPage;