import { useState } from 'react';
import type { Status, Validation } from './types';
import { InputIconBox, StyledInput, StyledInputBox, StyledInputLabel, StyledInputWrapper, StyledMessage } from './style';
import { TbAlertCircleFilled } from 'react-icons/tb';
import { GoCheckCircleFill } from 'react-icons/go';

// 컴포넌트 prop 타입 정의
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    validation: Validation;
    message?: string;
};

const InputTextField = ({
    label,
    validation = 'normal',
    message,
    disabled = false,
    value,
    ...props
}: TextFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);

    // 내부 상호 상태 도출 (focus, active, disabled)
    const derivedStatus: Status = disabled
    ? 'disabled'
    : isFocused && value // else-if
    ? 'activeFocus'
    :isFocused
    ? 'focus'
    :value
    ? 'active'
    : 'inactive' // else

    return (
        <StyledInputWrapper>
            {label && <StyledInputLabel>{label}</StyledInputLabel>}

            <StyledInputBox status={derivedStatus} validation={validation}>
                <StyledInput 
                    value={value}
                    disabled={disabled}
                    status={derivedStatus}
                    validation={validation}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {validation === 'positive' && (
                    <InputIconBox>
                        <GoCheckCircleFill size={20} color='#FF8B4C' />
                    </InputIconBox>
                )}

                {validation === 'negative' && (
                    <InputIconBox>
                        <TbAlertCircleFilled size={20} color='#FF4646' />
                    </InputIconBox>
                )}
            </StyledInputBox>

            {message && <StyledMessage validation={validation}>{message}</StyledMessage>}
        </StyledInputWrapper>
    )
};

export default InputTextField;