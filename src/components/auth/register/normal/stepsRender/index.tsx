import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";
import { renderEmailStep } from "./renderEmailStep";
import { renderGenderStep } from "./renderGenderStep";
import { renderPasswordStep } from "./renderPasswordStep";
import { renderProfileSettingStep } from "./renderProfileSettingStep";
import { renderInterestStep } from "./renderInterestStep";

export const renderRegisterStep =(
    step: number,
    state: RegisterState,
    dispatch: React.Dispatch<RegisterAction>,
    onNext: () => void,
    onBack: () => void
) => {
    const isKaKaoNew = !!state.kakaoCode && !!state.kakaoEmail && !state.email;

    if (isKaKaoNew) {
        switch (step) {
            case 0:
                return renderGenderStep(state, dispatch, onNext);        
            case 1:
                return renderProfileSettingStep(state, dispatch, onNext);
            case 2:
                return renderInterestStep(state, dispatch, onNext);
            default:
                return null;    
        }
    }

    switch (step) {
        case 0:
            return renderEmailStep(state, dispatch, onNext);
        case 1: 
            return renderPasswordStep(state, dispatch, onNext, onBack);
        case 2:
            return renderGenderStep(state, dispatch, onNext);        
        case 3:
            return renderProfileSettingStep(state, dispatch, onNext);
        case 4:
            return renderInterestStep(state, dispatch, onNext);
        default:
            return null;
    }
}
