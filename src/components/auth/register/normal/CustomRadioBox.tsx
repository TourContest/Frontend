import { GoCheckCircleFill } from 'react-icons/go';
import type { CustomRadioBoxProps } from "./types";
import { HiddenRadio, RadioBox, RadioLabel } from './normalRegister.style';

const CustomRadioBox = ({ value, selectedValue, onChange, name, label }: CustomRadioBoxProps) => {
    const isSelected = value === selectedValue;

    return (
        <RadioLabel>
            <HiddenRadio 
                type='radio'
                name={name}
                value={value}
                checked={isSelected}
                onChange={() => onChange(value)}
            />
            <RadioBox isSelected={isSelected}>
                {isSelected && <GoCheckCircleFill size={24}/>}
                <span style={{ display:"block", lineHeight: "24px"}}>{label}</span>
            </RadioBox>
        </RadioLabel>
    )
};

export default CustomRadioBox;