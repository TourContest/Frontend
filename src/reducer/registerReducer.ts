import type { RegisterState, RegisterAction } from "src/types/RegisterTypes";
import defaultProfile from 'src/assets/default_profile.svg';

export const initialRegisterState: RegisterState = {
    email: '',
    isEmailValid: false,
    isDuplicateChecked: false,
    showAuthInput: false,
    authCode: '',
    authPassed: false,
    emailError: '',
    authError: '',
    gender: '',
    birthYear: '',
    birthYearError: '',
    password: '',
    nickname: '',
    imageUrl: defaultProfile,
    isNicknameDuplicatedChecked: false,
    isCheckingNickname: false,
    nicknameError: '',
    isRegisterMode: true,
    referralCode: '제주데이',
    referralError: '',
    themes: [],
    kakaoCode: undefined,
    kakaoEmail: undefined,
    kakaoNickname: undefined,
};

export function registerReducer(
    state: RegisterState,
    action: RegisterAction
): RegisterState {
    switch (action.type) {
        case 'SET_EMAIL':
            return {
                ...state,
                email: action.value,
                isEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(action.value),
                isDuplicateChecked: false,
                showAuthInput: false,
                authPassed: false,
                emailError: '',
                authError: ''
            };
        case 'VALIDATE_EMAIL':
            return {
                ...state,
                isEmailValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email),
                emailError: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)
                    ? ''
                    : '유효한 이메일 형식이 아닙니다.',
            };
        case 'CHECK_DUPLICATE_SUCCESS':
            return { ...state, isDuplicateChecked: true };
        case 'SHOW_AUTH_INPUT':
            return { ...state, showAuthInput: true };
        case 'SET_AUTH_CODE':
            return { ...state, authCode: action.value };
        case 'AUTH_SUCCESS':
            return { ...state, authPassed: true, authError: '' };
        case 'SET_EMAIL_ERROR':
            return { ...state, emailError: action.message };
        case 'SET_AUTH_ERROR':
            return { ...state, authError: action.message };

        case 'SET_GENDER':
            return { ...state, gender: action.value };
        case 'SET_BIRTH_YEAR':
            return { ...state, birthYear: action.value };
        case 'SET_BIRTH_YEAR_ERROR':
            return { ...state, birthYearError: action.message };

        case 'SET_PASSWORD':
            return { ...state, password: action.value };
        
        case 'SET_NICKNAME':
            return { ...state, nickname: action.value };
        case 'SET_IMAGE_URL':
            return { ...state, imageUrl: action.payload || defaultProfile }
        case 'SET_NICKNAME_DUPLICATE_CHECKED':
            return { ...state, isNicknameDuplicatedChecked: action.payload }
        case 'SET_CHECKING_NICKNAME':
            return { ...state, isCheckingNickname: action.payload }
        case 'SET_NICKNAME_ERROR':
            return { ...state, nicknameError: action.payload }
        case 'SET_REFERRAL_CODE':
            return { ...state, referralCode: action.payload }
        case 'SET_REFERRAL_ERROR':
            return { ...state, referralError: action.payload }

        case "SET_THEMES":
            return { ...state, themes: action.payload }

        case "SET_KAKAO_CODE":
            return { ...state, kakaoCode: action.payload }
        case "SET_KAKAO_EMAIL":
            return {...state, kakaoEmail: action.payload }
        case "SET_KAKAO_NICKNAME":
            return { ...state, kakaoNickname: action.payload }

        default:
            return state;
    }
}