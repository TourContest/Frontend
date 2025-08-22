export interface EmailStepProps {
    email: string;
    authCode: string;
    isEmailValid: boolean;
    isDuplicateChecked: boolean;
    showAuthInput: boolean;
    authPassed: boolean;
    emailErrorMessage?: string;
    authErrorMessage?: string;
    onChangeEmail: (value: string) => void;
    onChangeAuthCode: (value: string) => void;
    onEmailBlur: () => void;
    onCheckDuplicate: () => void;
    onConfirmAuth: () => void;
    onNext: () => void;
}

export type Gender = 'male' | 'female' | '';

export interface GenderStepProps {
    gender: Gender;
    birthYear: string;
    onChangeGender: (gender: Gender) => void;
    onChangeBirthYear: (value: string) => void;
    onNext: () => void;
}


export interface CustomRadioBoxProps {
    value: string;
    selectedValue: string;
    onChange: (value: string) => void;
    name: string;
    label: string;
}

export interface PasswordStepProps {
    email: string;
    password: string;
    onChangePassword: (val: string) => void;
    onNext: () => void;
    onBack: () => void;
}

export interface ProfileSettingStepProps {
    nickname: string;
    imageUrl: string;
    isDuplicateChecked: boolean;
    isCheckingNickname: boolean;
    nicknameError?: string;
    onChangeNickname: (value:string) => void;
    onBlurNickname: () => void;
    onCheckNickname: () => void;
    onChangeImg: (file: File) => void;
    onChangeReferral: (value: string) => void;
    onNext: () => void;
    isRegisterMode: boolean;
    referralCode: string;
    referralError?: string;
}

export interface InterestStepProps {
    selectedThemes: string[];
    onChangeThemes: (themes: string[]) => void;
    onNext: () => void;
}