import type React from "react";
import { StyledButton } from "./style";

type ButtonProps = {
    children: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    disabled?: boolean;
    type? : 'button' | 'submit' | 'reset';
};

const BottomButton = ({
    children,
    size = 'large',
    onClick,
    disabled = false,
    type= 'button'
}: ButtonProps) => {
    return(
        <StyledButton
            size={size}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </StyledButton>
    );
};

export default BottomButton;