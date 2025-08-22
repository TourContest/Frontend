import InterestForm from "src/components/commons/Forms/interestForm";
import { RegisterContainer } from "../normalRegister.style";
import type { InterestStepProps } from "../types";
import { ButtonWrapper } from "src/components/auth/login/login.style";
import BottomButton from "src/components/commons/Buttons/BottomButton";


const InterestStep = ({
    selectedThemes,
    onChangeThemes,
    onNext
}: InterestStepProps) => {
    const handleSelect = (value: string) => {
        const already = selectedThemes.includes(value);
        if (already) {
            onChangeThemes(selectedThemes.filter((i: string) => i !== value));
        } else {
            if (selectedThemes.length < 3) {
                onChangeThemes([...selectedThemes, value]);
            }
        }
    }

    return(
        <>
            <RegisterContainer>
                <InterestForm 
                    selected={selectedThemes}
                    onSelect={handleSelect}
                    themes={[]}
                />
            </RegisterContainer>
            <ButtonWrapper>
                <BottomButton type="button" size="large" onClick={onNext}>다음</BottomButton>
            </ButtonWrapper>
        </>
    )
}

export default InterestStep;