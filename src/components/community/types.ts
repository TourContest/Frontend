import type { Validation } from "../commons/Inputs/TextField/types";

export type BannerSliderProps = {
  images: string[]; // 부모에서 내려주는 이미지 배열
};

export type ImgPickerProps = {
  images: string[];
  onChange: (images: string[])  => void;
}

export interface Post {
  id: number;
  username: string;
  date: string;
  location: string;
  content: string;
  images: string[];
  hasReport: boolean;
  likes?: number;
  comments?: number;
};

export interface LocationFieldProps {
  value: string;                        // 표시/편집 값 (리듀서 state.locationText)
  onChange: (text: string) => void;     // 입력 변경
  placeholder?: string;
  validation?: Validation;
  message?: string;
  disabled?: boolean;
  onBlur?: () => void;                  // API 연동
}

export type TextFieldProps = {
  id?: string;
  label?: string;
  required?: boolean;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  minRows?: number;        // 기본 3줄
  maxRows?: number;        // 제한 없으면 그대로 증가
  maxLength?: number;      // 글자수 제한(카운터 표시용)
  message?: string;     // 보조 설명
  errorText?: string;      // 에러 텍스트(있으면 오류 상태)
  disabled?: boolean;
};

export type ThemeChipsProps = {
  options: { id: number, label: string }[];                   
  value: number | null;                     
  onChange: (nextId: number) => void;                 
};

export type HashtagFieldProps = {
  value: string[];                      // 저장은 # 없이 ["힐링","맛집"]
  onChange: (next: string[]) => void;   
  max?: number;                   
  placeholder?: string;                 
  maxLengthPerTag?: number;             // 최대 글자수            
};