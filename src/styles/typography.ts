import styled from '@emotion/styled';

export const Head3 = styled.h3`
    ${({ theme }) => theme.typography.head3};
    font-weight: 600;
    margin-bottom: 20px;
`;

export const Body1 = styled.div`
    ${({ theme }) => theme.typography.body2}
`;

export const Caption = styled.span`
    ${({ theme }) => theme.typography.caption1}
`;