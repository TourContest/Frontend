import type { Validation } from "../Inputs/TextField/types";

export type passwordFormMode = 'register' | 'myPage';

export interface PasswordFormProps {
    password: string;
    confirm: string;
    passwordError: string;
    confirmError: string;
    successMessage: string;
    passwordValidation: Validation;
    confirmValidation: Validation;
    onChangePassword: (val: string) => void;
    onChangeConfirm: (val: string) => void;
    showConfirm: boolean; // 마이페이지에서는 showConfirm true
    disableAll?: boolean;
}

export interface ProfileFormProps {
    nickname: string;
    imageUrl?: string;
    onChangeNickname: (value: string) => void;
    onBlurNickname: () => void;
    onCheckNickname: () => void;
    nicknameError?: string;
    isDuplicatedChecked: boolean;
    isCheckingNickname?: boolean;
    onChangeImage: (file: File) => void;

    // 추천입 코드 (회원가입만)
    isRegisterMode?: boolean;
    referralCode?: string;
    onChangeReferral?: (value: string) => void;
    referralError?: string;
}

export interface interestsFormProps {
    themes: string[],
    selected: string[],
    onSelect: (value: string) => void;
}