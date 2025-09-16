import Location from '../../../assets/Location.svg';
import InputTextField from "src/components/commons/Inputs/TextField";
import { Head3Wrapper } from "./style";
import type { LocationFieldProps } from "../types";
import { FaChevronRight } from "react-icons/fa";
import type { Validation } from 'src/components/commons/Inputs/TextField/types';

export default function LocationField({
  value,
  onChange,
  placeholder = "현재 위치 입력",
  validation,
  message,
  disabled,
  onBlur,
}: LocationFieldProps) {
   const vali: Validation = validation ?? (message ? 'negative' : 'normal');

  return (
    <>
        <Head3Wrapper>
            <div>
                <img src={Location} />
                <span>
                  위치를 알려주세요.
                  <strong>*</strong>
                </span>
            </div>
            <FaChevronRight color="#B7B7B7"/>
        </Head3Wrapper>
        <InputTextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            validation={vali}
            message={message}
            disabled={disabled}
            onBlur={onBlur}
        />
    </>
  );
};