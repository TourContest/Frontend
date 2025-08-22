import { createContext, useContext, useReducer } from "react";
import { initialRegisterState, registerReducer } from "src/reducer/registerReducer";
import type { RegisterAction, RegisterState } from "src/types/RegisterTypes";

interface RegisterContextProps {
    state: RegisterState;
    dispatch: React.Dispatch<RegisterAction>;
}

const RegisterContext = createContext<RegisterContextProps | undefined>(undefined);

export const RegisterProvider = ({ children }: { children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(registerReducer, initialRegisterState);

    return (
        <RegisterContext.Provider value={{ state, dispatch }}>
            {children}
        </RegisterContext.Provider>
    )
}

export const useRegister = () => {
    const context = useContext(RegisterContext);
    if(!context) throw new Error("RegisterProvider를 사용한 곳에서만 useRegister 사용 가능")
    return context;
}