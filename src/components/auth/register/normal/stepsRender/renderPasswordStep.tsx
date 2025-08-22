import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";
import PasswordStep from "../steps/PasswordStep";

export function renderPasswordStep(
    state: RegisterState,
    dispatch: React.Dispatch<RegisterAction>,
    onNext: () => void,
    onBack: () => void
) {
    return (
        <PasswordStep 
            email={state.email}
            password={state.password}
            onChangePassword={(val) => dispatch({ type: "SET_PASSWORD", value: val})}
            onNext={onNext}
            onBack={onBack}
        />
    )
};