import { RadioWrapper, RegisterContainer } from "../normalRegister.style";
import CustomRadioBox from "../CustomRadioBox";
import { ButtonWrapper } from "../../../login/login.style";
import type { Gender, GenderStepProps } from "../types";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import { Head3 } from "src/styles/typography";
import InputTextField from "src/components/commons/Inputs/TextField";
import { validateBirthYear } from "src/utils/validation";
import type { Validation } from "src/components/commons/Inputs/TextField/types";
import { useRegister } from "src/context/AuthContext";

const GenderStep = ({
    gender, birthYear, onChangeGender, onChangeBirthYear, onNext
}: GenderStepProps) => {

    const options = [
        { label: '남자', value: 'male'},
        { label: '여자', value: 'female'},
    ]

    const { state } = useRegister();
    const isGenderValid = state.gender !== null;
    const isBirthYearValid = state.birthYear !== '' && validateBirthYear(state.birthYear) === '';
    const isFormValid = isGenderValid && isBirthYearValid;

    const birthYearErrorMessage = 
        birthYear === '' ? '' : validateBirthYear(birthYear);

    const birthValidation: Validation = 
        birthYear === '' ? 'normal' :
        birthYearErrorMessage ? 'negative' : 
        'positive';

    return (
        <>
            <RegisterContainer>
                <Head3>성별을 선택해주세요.</Head3>
                <RadioWrapper>
                    {options.map((opt) => (
                        <CustomRadioBox 
                            key={opt.value}
                            name="gender"
                            value={opt.value}
                            label={opt.label}
                            selectedValue={gender}
                            onChange={(val) => onChangeGender(val as Gender)}
                        />
                    ))}
                </RadioWrapper>
                <Head3>태어난 연도를 알려주세요.</Head3>
                <InputTextField 
                    type="number"
                    placeholder="예)1999"
                    value={birthYear}
                    onChange={(e) => onChangeBirthYear(e.target.value)}
                    validation={birthValidation}
                    message={birthYearErrorMessage}
                />
            </RegisterContainer>
            <ButtonWrapper>
                <BottomButton type="button" size="medium" disabled={!isFormValid} onClick={onNext}>다음</BottomButton>
            </ButtonWrapper>
        </>
    )
};

export default GenderStep;