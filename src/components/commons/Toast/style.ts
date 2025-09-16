import styled from '@emotion/styled';

export const ToastWrapper = styled.div`
    position: fixed;
    left: 50%; bottom: 125px;
    transform: translateX(-50%);
    background-color:${({ theme }) => theme.colors.gray[800]};
    color: ${({ theme }) => theme.colors.bg[0]};
    border-radius: 14px;
    width: calc(100% - 20px);
    padding: 16px 18px 16px 16px;
    display: flex;
    align-items: center;
    gap: 10px;  
    font-weight: 500;
    line-height: 1.4;

    @keyframes toast-fade {
        0% {
            opacity: 0;
            transform: translate(-15%, 10px);
        }
        10%, 90% {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, 10px);
        }
    }
`;