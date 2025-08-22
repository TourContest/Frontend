import styled from '@emotion/styled';

export const RegisterContainer = styled.div`
    padding: 0 20px 0 20px;
    max-width: 560px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

export const AuthFieldWrapper = styled.div<{ show: boolean }>`
    transition: all 0.5s ease;
    opacity: ${({ show }) => show ? 1 : 0};
    transform: ${({ show }) => show ? 'translateY(0)' : 'translateY(20px)'}
`;

export const EmailInputWrapper = styled.div`
    position: relative;
`;

export const DupCheckBtn = styled.button`
    padding: 3px 8px;
    border-radius: 6px;
    background-color: ${({ theme, disabled }) => (disabled ? theme.colors.gray[400] : theme.colors.primary[400])};
    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.base[0]};
`;

export const AuthCaption = styled.div`
    margin: 10px 0px 8px 0px;
    line-height: 1.4;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[700]};
`;

export const HiddenRadio = styled.input`
    display: none;
`;

export const RadioLabel = styled.label`
    cursor: pointer;
    flex: 1;
`;

export const RadioWrapper = styled.div`
    display: flex;
    gap: 14px;
    width: 100%;
    margin-bottom: 32px;
`;

export const RadioBox = styled.div<{ isSelected: boolean }>`
    padding: ${({ isSelected }) => isSelected ? '24px 20px' : '24px 30px'};
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 11px;
    font-weight: ${({ isSelected }) => isSelected ? '500' : '400'};
    background: ${({ theme, isSelected }) => isSelected ? theme.colors.primary[50] : '#fff'};
    border: 1px solid ${({ theme, isSelected }) => isSelected ? theme.colors.primary[300] : theme.colors.gray[300]};
    color: ${({ theme, isSelected }) => isSelected ? theme.colors.primary[400] : theme.colors.gray[500]};
    transition: all 0.02s ease;
`;