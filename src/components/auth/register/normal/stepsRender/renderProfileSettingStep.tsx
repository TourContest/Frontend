import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";
import ProfileSettingStep from "../steps/ProfileSettingStep";
import { authApi } from "src/api/auth";

export function renderProfileSettingStep(
    state: RegisterState,
    dispatch: React.Dispatch<RegisterAction>,
    onNext: () => void
) {
    const handleChangeImage = (file: File) => {
        const url = URL.createObjectURL(file);
        dispatch({ type: "SET_IMAGE_URL", payload: url });
    }
    
    const handleChangeNickname = (value: string) => {
        dispatch({ type: "SET_NICKNAME", value });
        dispatch({ type: "SET_NICKNAME_DUPLICATE_CHECKED", payload: false });
        dispatch({ type: "SET_NICKNAME_ERROR", payload: '' });
    };
    
    const trimmed = state.nickname.trim();
    const handleBlurNickname = () => {

        if (!trimmed) return;

        if (trimmed.length < 2) {
            dispatch({ type: "SET_NICKNAME_ERROR", payload: "닉네임은 최소 2자 이상이어야 합니다."})
            return;
        }
        
        if (trimmed.length > 8) {
            dispatch({ type: "SET_NICKNAME_ERROR", payload: "닉네임은 최대 8자까지 가능합니다."})
            return;
        };
    };

    const handleCheckNickname = async () => {
        if (trimmed.length < 2) {
            dispatch({ type: "SET_NICKNAME_ERROR", payload: "닉네임은 최소 2자 이상이어야 합니다."})
            return;
        }

        if (trimmed.length > 8) {
            dispatch({ type: "SET_NICKNAME_ERROR", payload: "닉네임은 최대 8자까지 가능합니다."})
            return;
        };

        try {
            dispatch({ type: "SET_NICKNAME_DUPLICATE_CHECKED", payload: true });
            const res = await authApi.checkNicknameDuplicate(trimmed);
            
            if(res.data.success) {
                dispatch({ type: "SET_NICKNAME_DUPLICATE_CHECKED", payload: true });
                dispatch({ type: "SET_NICKNAME_ERROR", payload: '' });
            } else {
                dispatch({ type: "SET_NICKNAME_DUPLICATE_CHECKED", payload: false });
                dispatch({ type: "SET_NICKNAME_ERROR", payload: res.data?.message || "이미 사용 중인 닉네임입니다." })
            }
        } catch(err) {
            console.error(err);
            dispatch({ type: "SET_NICKNAME_DUPLICATE_CHECKED", payload: false });
            dispatch({ type: "SET_NICKNAME_ERROR", payload: "닉네임 확인 중 오류가 발생했습니다." })
        }
    };

    const handleChangeReferral = (value: string) => {
        dispatch({ type: "SET_REFERRAL_CODE", payload: value });
        dispatch({ type: "SET_REFERRAL_ERROR", payload: value ? '' : '추천인을 입력해주세요. (ex.제주데이)' })
    }

    return(
        <ProfileSettingStep 
            nickname={state.nickname}
            imageUrl={state.imageUrl}
            onChangeImg={handleChangeImage}
            onChangeNickname={handleChangeNickname}
            onBlurNickname={handleBlurNickname}
            onChangeReferral={handleChangeReferral}
            onCheckNickname={handleCheckNickname}
            nicknameError={state.nicknameError}
            isDuplicateChecked={state.isNicknameDuplicatedChecked}
            isCheckingNickname={state.isCheckingNickname}
            onNext={onNext}
            isRegisterMode={state.isRegisterMode}
            referralCode={state.referralCode}
            referralError={state.referralError}
        />
    )
}