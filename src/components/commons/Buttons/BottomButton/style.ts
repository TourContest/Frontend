import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

type SizeType = 'small' | 'medium' | 'large';

type StyledButtonProps = {
    size: SizeType;
    disabled?: boolean;
}

export const StyledButton = styled('button', {
    // emotion에 HTML에 전달하지 않을 props를 걸러내도록 알려줌
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'size',
})<StyledButtonProps>`
    border: none;
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    padding: 13px 0;
    border-radius: 10px;
    cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.2s ease-in-out;
    background-color: ${({ theme, disabled, size }) => 
        disabled || size === 'small' ? theme.colors.gray[100]: theme.colors.primary[400]};
    color : ${({ theme, disabled, size }) => 
        disabled || size === 'small' ? theme.colors.gray[400] : theme.colors.base[0]};

    ${({ size }) => {
        const flexes = {
            small : 1,
            medium: 2,
            large: '0 0 100%',
        };
        return `flex: ${flexes[size]}`;
    }};

    &:active, &:focus {
        background-color: ${({ theme, disabled }) => 
            !disabled ? theme.colors.primary[500] : theme.colors.gray[100]};
    }
`;