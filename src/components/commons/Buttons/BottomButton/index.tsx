import type React from "react";
import { StyledButton } from "./style";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 'small' | 'medium' | 'large';
};

const BottomButton = ({
    children,
    size = 'large',
    onClick,
    disabled = false,
    type= "button",
    ...props
}: ButtonProps) => {

    return(
        <StyledButton
            size={size}
            onClick={onClick}
            disabled={disabled}
            type={type}
            {...props}
        >
            {children}
        </StyledButton>
    );
};

export default BottomButton;