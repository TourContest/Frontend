import styled from '@emotion/styled';

export const MyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-block-size: 100vh;
`;

export const MyPageWrapper = styled.div`
    background: ${({ theme }) => theme.colors.bg[50]};
    padding: 20px;
    // height: 100vh;
    flex: 1 1 auto; 
    min-block-size: 0;
`;

export const CouponDetailWrapper = styled.div`
    background: ${({ theme }) => theme.colors.bg[50]};
    padding: 0 24px;
    padding-bottom: 75px;
    height: calc(100vh - 48px);
    overflow-y: scroll;
`;

export const Bar = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray[200]};
    margin: 8px 0;
`;