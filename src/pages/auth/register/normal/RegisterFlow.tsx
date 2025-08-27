import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "src/api/auth";
import { renderRegisterStep } from "src/components/auth/register/normal/stepsRender";
import StepBar from "src/components/auth/register/StepBar";
import { useRegister } from "src/context/AuthContext"

const RegisterFlow = () => {
    const { state, dispatch } = useRegister();
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const totalSteps = state.kakaoEmail ? 3 : 5;

    const buildProfileFile = async (): Promise<File | undefined> => {
        try {
            const blob = await fetch(state.imageUrl).then(r => r.blob());
            return new File([blob], 'profile.png', {type: blob.type});
        } catch(e) {
            console.warn("프로필 파일 변환 실패(무시하고 진행)", e);
        }

        return undefined;
    };

    const goNext = async () => {
        const isLastStep = step === totalSteps - 1;

        if (isLastStep) {
            if(submitting) return;
            setSubmitting(true);

            try {
                // 카카오 
                if (state.kakaoEmail) {
                    const kakaoPayload = {
                        code: state.kakaoCode!,
                        nickname: state.kakaoNickname!,
                        themes: state.themes,
                        gender: state.gender as 'MALE' | 'FEMALE',
                        birthYear: state.birthYear,
                        referrerNickname: state.referralCode,
                    }; 
    
                    const res = await authApi.registerFinalKaKao(kakaoPayload);
                    if (res.data?.success) {
                        navigate('/main');
                        return;
                    } else {
                        console.error('회원가입 실패:', res.data?.message);
                        return;
                    };
                }

                // 일반
                const profileFile = await buildProfileFile();
                const payload = {
                    email: state.email,
                    nickname: state.nickname.trim(),
                    themes: state.themes,
                    gender: state.gender as 'MALE' | 'FEMALE',
                    birthYear: state.birthYear,
                    referrerNickname: state.referralCode,
                }

                const res = await authApi.registerFinal(payload, profileFile);
                if(res.data?.success) {
                    navigate('/main');
                    return;
                } else {
                    console.error('회원가입 실패:', res.data?.message);
                    return;
                }    
            } catch(err) {
                console.error('회원가입 에러:', err);
            } finally {
                setSubmitting(false);
            }
        }
        
        setStep((prev) => prev + 1)
    };
    const goPrev = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await goNext(); // 마지막 단계에서만 처리
    }

    return (
        <form onSubmit={handleSubmit}>
            <StepBar current={step + 1} total={totalSteps} />
            {renderRegisterStep(step, state, dispatch, goNext, goPrev)}
        </form>
    )
};

export default RegisterFlow;