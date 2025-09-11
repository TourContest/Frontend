import styled from '@emotion/styled';

export const TabsRoot = styled.div`
    max-width: 720px;
    margin: 0 auto;
`;

export const TabsList = styled.div`
    position: relative;
    display: flex;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;
    
export const TabBtn = styled("button", {
    // select가 DOM에 내려가지 않게
    shouldForwardProp: (prop) => prop !== "select",
})<{ select?: boolean }>`
    flex: 1 1 0;
    padding: 8px;
    line-height: 1.4;
    text-align: center;
    font-size: 16px;
    font-weight: ${({ select }) => select ? 600 : 400};
    color: ${({ theme, select }) => select
        ? theme.colors.primary[400] : theme.colors.gray[500]};
    border-bottom: 
        1.5px solid ${({ theme, select }) => select
        ? theme.colors.primary[400] : theme.colors.gray[200]};
    margin-bottom: -1px;
`;