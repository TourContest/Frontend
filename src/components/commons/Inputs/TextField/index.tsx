import { useState } from 'react';
import type { Status, Validation } from './types';
import { InputIconBox, StyledInput, StyledInputBox, StyledInputLabel, StyledInputWrapper, StyledMessage, ClearButton, RightSlotBox } from './style';
import { TbAlertCircleFilled } from 'react-icons/tb';
import { GoCheckCircleFill } from 'react-icons/go';
import ClearIcon from '../../../../assets/Clear.svg';

// 컴포넌트 prop 타입 정의
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    validation: Validation;
    message?: string;
    // rightSlot?: React.ReactNode;
    rightSlot?: any;
};

const InputTextField = ({
    label,
    validation = 'normal',
    message,
    disabled = false,
    value,
    onChange,
    rightSlot,
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

    
    const handleClear = () => {
        if(!disabled && onChange) {
            // onChange는 syntheticEvent 형식을 기대하므로 강제로 타입 캐스팅
            const syntheticEvent = {
                target: {
                    value: '',
                },
            } as React.ChangeEvent<HTMLInputElement>;

            // 부모 컴포넌트로부터 전달받은 onChange 핸들러를 호출하여 상태 초기화
            onChange(syntheticEvent);

        }
    }

    return (
        <StyledInputWrapper>
            {label && <StyledInputLabel>{label}</StyledInputLabel>}

            <StyledInputBox status={derivedStatus} validation={validation}>
                <StyledInput 
                    value={value ?? ''}
                    onChange={onChange}
                    disabled={disabled}
                    status={derivedStatus}
                    validation={validation}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                <RightSlotBox>
                    {/* Clear 버튼 */}
                    {isFocused && value && !disabled && !props.readOnly && (
                        <ClearButton
                            onMouseDown={(e) => {
                                e.preventDefault();
                                handleClear();
                            }}
                            type="button"
                        >
                            <img src={ClearIcon} alt="clear" width={24} height={24} />
                        </ClearButton>
                    )}
                    
                    {/* Validation 아이콘 */}
                    {validation !== 'normal' && (
                        validation === 'positive' ? (
                            <InputIconBox>
                                <GoCheckCircleFill size={20} color="#FF8B4C" />
                            </InputIconBox>
                        ) : (
                            <InputIconBox>
                                <TbAlertCircleFilled size={20} color="#FF4646" />
                            </InputIconBox>
                        )
                    )}

                    {/* Right Slot */}
                    {rightSlot}
                </RightSlotBox>

            </StyledInputBox>

            {message && <StyledMessage validation={validation}>{message}</StyledMessage>}
        </StyledInputWrapper>
    )
};

export default InputTextField;