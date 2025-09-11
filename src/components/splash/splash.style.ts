import styled from '@emotion/styled';

export const SplashLogoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 73px 0 93px 0;
    height: calc(100vh - 154px);
`;

export const Welcome = styled.div`
    margin-top: 32px;
    line-height: 1.4;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[700]};

    & > h1 { 
        font-size: 24px; 
        font-weight: 600; 
        margin-bottom: 12px; 
        color: ${({ theme }) => theme.colors.gray[800]};
    }
`;

export const Guide = styled.div`
    font-size: 24px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[800]};
    line-height: 1.4;
`;

export const GoToLogin = styled.div`
    position: fixed;
    bottom: 130px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[500]};

    & > span {
        cursor: pointer;
        margin-left: 4px;
        color: ${({ theme }) => theme.colors.primary[400]};
    }
`;

export const PermissionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 96px;
    gap: 46px;
    padding: 0 20px;
`;

export const PermissionListBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[600]};
`;

export const PermissionList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
    line-height: 1.4;

    & > li {
        display: flex;
        align-items: center;
        gap: 15px;
        font-size: ${({ theme }) => theme.colors.gray[400]};
    }
`;

export const PermissionLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: #000;
`;

export const LangSelectorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 20px;
`;

export const RegisterButtonWrapper = styled.div`
    position: fixed;
    bottom: 75px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const KaKaoBtn = styled.button`
    width: 100%;
    max-width: 480px;
    cursor: pointer;

    & > img {
        height: 48px;
    }
`;

export const EmailRegisterBtn = styled.div`
    height: 48px;
    line-height: 48px;
    font-weight: 500;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[700]};
    border-radius: 7px;
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    cursor: pointer;
`;