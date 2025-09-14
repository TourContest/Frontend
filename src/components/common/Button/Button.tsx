import styled from '@emotion/styled';
import { theme } from '../../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
  transition: all 0.2s ease;
  
  ${({ variant, size, disabled }) => {
    const baseStyles = `
      ${theme.typography.body1};
    `;
    
    const variantStyles = {
      primary: `
        background-color: ${theme.colors.primary[400]};
        color: ${theme.colors.base[0]};
        &:hover {
          background-color: ${theme.colors.primary[500]};
        }
      `,
      secondary: `
        background-color: ${theme.colors.gray[200]};
        color: ${theme.colors.gray[800]};
        &:hover {
          background-color: ${theme.colors.gray[300]};
        }
      `,
      ghost: `
        background-color: transparent;
        color: ${theme.colors.gray[600]};
        &:hover {
          background-color: ${theme.colors.gray[100]};
        }
      `
    };
    
    const sizeStyles = {
      small: `
        padding: 4px 8px;
        font-size: 13px;
        height: 30px;
      `,
      medium: `
        padding: 6px 12px;
        font-size: 14px;
        height: 36px;
      `,
      large: `
        padding: 8px 16px;
        font-size: 16px;
        height: 44px;
      `
    };
    
    const disabledStyles = disabled ? `
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        background-color: inherit;
      }
    ` : '';
    
    return `
      ${baseStyles}
      ${variantStyles[variant || 'primary']}
      ${sizeStyles[size || 'medium']}
      ${disabledStyles}
    `;
  }}
`;

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'medium', 
  children, 
  onClick, 
  disabled = false 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 