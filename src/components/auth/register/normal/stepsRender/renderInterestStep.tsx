import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";
import InterestStep from "../steps/InterestStep";

export function renderInterestStep(
    state: RegisterState,
    dispatch: React.Dispatch<RegisterAction>,
    onNext: () => void
) {
    return (
        <InterestStep 
            selectedThemes={state.themes}
            onChangeThemes={(values) => dispatch({ type: "SET_THEMES", payload: values })}
            onNext={onNext}
        />
    )
};