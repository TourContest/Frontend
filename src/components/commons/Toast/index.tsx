import { useEffect } from "react";
import { ToastWrapper } from "./style";
import ErrorIcon from '../../../assets/error.svg';

interface ErrorToastProps {
    message: string;
    visible: boolean;
    onClose: () => void;
};

const ErrorToast = ({ message, visible, onClose }: ErrorToastProps) => {
    useEffect(() => {
        if(!visible) return;
        
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [visible, onClose]);

    if (!visible) return null;

    return <ToastWrapper>
                <img src={ErrorIcon} alt='error' width={24} height={24} />
                {message}
            </ToastWrapper>

};

export default ErrorToast;