import type { AuthAction, AuthState } from "src/types/AuthTypes";


export const initialAuthState: AuthState = { user: null, status: 'loading' };

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "BOOT_START":
            return { ...state, status: 'loading' }
        case "BOOT_SUCCESS":
            return { user: action.payload, status: 'authenticated' }
        case "BOOT_FAIL":
            return { user: null, status: 'unauthenticated' }
        case "SIGN_OUT":
            return { user: null, status: 'unauthenticated' }
        default:
            return state;
    }
};