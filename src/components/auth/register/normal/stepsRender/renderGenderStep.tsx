import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";
import GenderStep from "../steps/GenderStep";

export function renderGenderStep(
    state: RegisterState,
    dispatch: React.Dispatch<RegisterAction>,
    onNext: () => void
) {
    return (
        <GenderStep 
            gender={state.gender}
            birthYear={state.birthYear}
            onChangeGender={(val) => dispatch({ type: "SET_GENDER", value: val })}
            onChangeBirthYear={(val) => dispatch({ type: "SET_BIRTH_YEAR", value: val })}
            onNext={onNext}
        />
    );
}