import styled from '@emotion/styled';

export const LangWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin: 0 auto;
`;

export const LangItem = styled.div<{ isActive: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    padding: 17px 0;
    border-radius: 12px;
    border: 1px solid 
        ${({ theme, isActive }) => isActive ? theme.colors.primary[300] : theme.colors.gray[300]};
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary[50] : '#fff'};
    color: ${({ theme, isActive }) => isActive ? theme.colors.primary[400] : theme.colors.gray[600]};
    cursor: pointer;
`;

export const LangLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    margin-left: 12px;
`;

export const CheckIcon = styled.div<{ isActive: boolean }>`
    position: absolute;
    right: 17px;
    top: 17px;
    color: ${({ theme, isActive }) => {
        console.log(theme.colors.gray[300]);
        return isActive ? theme.colors.primary[400] : theme.colors.gray[300]
    }};
`;