import styled from '@emotion/styled';
import type { Status, Validation } from './types';

export const StyledInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 16px;
    line-height: 1.4;
    font-weight: 400;
`

export const StyledInputLabel = styled.label`
    color: ${({ theme }) => theme.colors.gray[700]};
    font-weight: 500;
`

export const StyledInputBox = styled.div<{ status: Status, validation: Validation }>`
    position: relative;
    display: flex;
    align-items: center;
    padding: 13px 12px;
    border-radius: 12px;
    
    border: 1px solid 
        ${({ theme, status, validation }) => {
            if(status === 'disabled') return theme.colors.gray[300];

            if(status === 'inactive' || status === 'active') {
                if(validation === 'negative') return theme.colors.error[100];
                return theme.colors.gray[300];
            }

            if(status === 'focus' || status === 'activeFocus') {
                if(validation === 'negative') return theme.colors.error[100];
                if(validation === 'positive') return theme.colors.gray[300];
                return theme.colors.primary[400];
            }

            return theme.colors.gray[300];
    }};
    
    background-color: ${({ theme, status }) => 
        status === 'disabled' ? theme.colors.gray[100] : 'transparent'};
`;

export const StyledInput = styled.input<{ status: Status, validation: Validation, disabled?: boolean }>`
    flex: 1 0 0;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray[800]};
    line-height: 24px;
    padding-right: 80px;

    &::placeholder {
        color: ${({ theme, status, validation}) => {
            if(status === 'disabled') return theme.colors.gray[400];

            if(status === 'focus' || status === 'activeFocus' || validation === 'negative') 
                return theme.colors.gray[600];
        
            return theme.colors.gray[400];
        }}
    }
`;

export const InputIconBox = styled.div`
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index:2;
`

export const StyledMessage = styled.span<{ validation: Validation }>`
    font-size: 13px;
    color: ${({ theme, validation }) => {
        switch (validation) {
            case 'positive':
                return theme.colors.primary[400];
            case 'negative':
                return theme.colors.error[100];
            default:
                return theme.colors.gray[600];
        }
    }};
`;

export const ClearButton = styled.button`
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray[500]};
`;

export const RightSlotBox = styled.div`
    position:absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 6px;
    z-index: 1;
    pointer-events: none;

    > * {
        pointer-events: auto;
    }
`;