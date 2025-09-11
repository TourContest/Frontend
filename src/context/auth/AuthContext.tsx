import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { authApi } from "src/api/auth";
import { userApi } from "src/api/users";
import { authReducer, initialAuthState } from "src/reducer/AuthReducer";
import type { AuthState } from "src/types/AuthTypes"

type AuthContextValue = {
    state: AuthState;
    signIn: (p: {email: string; password: string }) => Promise<void>;
    signInKaKao: (code: string) => Promise<void>;
    // signOut: () => Promise<void>;
    refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
AuthContext.displayName = 'AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const bootstrap = useCallback(async () => {
        dispatch({ type: "BOOT_START" });
        try {
            const res = await userApi.getSessionMe();
            dispatch({ type: "BOOT_SUCCESS", payload: res.data.data })
        } catch(err) {
            dispatch({ type: "BOOT_FAIL" });
        }
    }, []);

    useEffect(() => { void bootstrap(); }, [bootstrap]);

    const signIn = useCallback(async (credential: { email: string; password: string }) => {
        const res = await authApi.login(credential);
        if (res.data?.failure) throw new Error(res.data?.message ?? "이메일 또는 비밀번호가 일치하지 않습니다.");
        await bootstrap();
    }, []);

    const signInKaKao = useCallback(async (code: string) => {
        const res = await authApi.kakaoLogin(code);
        if (res.data?.failure) throw new Error(res.data?.message ?? "카카오 로그인 실패");
        await bootstrap();
    }, []);

    // 로그아웃

    const value = useMemo<AuthContextValue>(() => ({
        state, signIn, signInKaKao, refresh: bootstrap,
    }), [state, signIn, signInKaKao, bootstrap]);

    if (state.status === 'loading') return null;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthProvider 내부에서만 useAuth사용 가능");
    return context;
}