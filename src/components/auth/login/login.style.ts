import styled from '@emotion/styled';

export const Wrapper = styled.div`
    max-width: 560px;
    margin: 32px auto;
    padding: 0 20px;

    & > form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 12px 20px 46px 20px;
    display: flex;
    gap: 15px;
    background: #fff;
    box-shadow: 0 3px 16px rgba(210, 210, 210, 0.4);
    border-top: .5px solid ${({ theme }) => theme.colors.gray[200]}
`;