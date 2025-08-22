import styled from '@emotion/styled';

export const BarWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 7px 4px 22px 4px;
    gap: 4px;
`;

export const Step = styled.div<{ isActive: boolean }>`
    flex: 1;
    height: 3px;
    border-radius: 50px;
    background-color: ${({ theme, isActive }) => 
        isActive ? theme.colors.primary[400] : theme.colors.gray[300]};
    transition: background-color 0.2s;
`;