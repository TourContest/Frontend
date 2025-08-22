import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "src/api/auth";
import { renderRegisterStep } from "src/components/auth/register/normal/stepsRender";
import StepBar from "src/components/auth/register/StepBar";
import { useRegister } from "src/context/AuthContext"

const RegisterFlow = () => {
    const { state, dispatch } = useRegister();
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    const totalSteps = state.kakaoEmail ? 3 : 5;

    const goNext = async () => {
        const isLastStep = step === totalSteps - 1;

        if (isLastStep) {
            try {
                // 카카오 
                if (state.kakaoEmail) {
                    const kakaoPayload = {
                        code: state.kakaoCode!,
                        nickname: state.kakaoNickname!,
                        themes: state.themes,
                        gender: state.gender as 'MALE' | 'FEMALE',
                        birthYear: state.birthYear,
                        referralNickname: state.referralCode || undefined,
                    }; 
    
                    const res = await authApi.registerFinalKaKao(kakaoPayload);
    
                    if (res.data.success) {
                        navigate('/');
                    } else {
                        console.error('회원가입 실패:', res.data?.message);
                    }
                } else {
                    // 일반
                    const formData = new FormData();
    
                    formData.append(
                        'data', new Blob(
                            [JSON.stringify({
                                email: state.email,
                                password: state.password,
                                nickname: state.nickname,
                                birthYear: state.birthYear,
                                themes: state.themes,
                                language: 'KO',
                                platform: 'APP'
                            })],
                            { type: 'application/json' }
                        )
                    );
    
                    // 프로필 이미지 첨부
                    if (state.imageUrl && !state.imageUrl.includes('default_profile.svg')) {
                        const file = await fetch(state.imageUrl)
                            .then((res) => res.blob())
                            .then(
                                (blob) => new File([blob], 'profile.png', { type: blob.type })
                            );
                        formData.append('profile', file);
                    }
    
                    const genderQuery = state.gender || 'MALE';
                    const res = await authApi.registerFinal(genderQuery as 'MALE' | 'FEMALE', formData);
    
                    if(res.data.success) {
                        navigate('/');
                    } else {
                        console.error('회원가입 실패:', res.data?.message);
                    }
                }
    
            } catch(err) {
                console.error('회원가입 에러:', err);
            }
        }
        
        setStep((prev) => prev + 1)
    };
    const goPrev = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        goNext(); // 마지막 단계에서만 처리
    }

    return (
        <form onSubmit={handleSubmit}>
            <StepBar current={step + 1} total={totalSteps} />
            {renderRegisterStep(step, state, dispatch, goNext, goPrev)}
        </form>
    )
};

export default RegisterFlow;