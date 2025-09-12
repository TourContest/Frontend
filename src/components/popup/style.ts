import styled from '@emotion/styled';

export const PopupOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    pointer-events: none;

    &[data-open='true'] {
        background: rgba(0, 0, 0, 0.45);
        pointer-events: auto;
    }
`;

export const Popup = styled.div`
    position: fixed;
    bottom: 0; left: 0; right: 0;
    transform: translateY(100%);
    transition: transform 280ms ease;
    will-change: transform;
    z-index: 100;

    &[data-open='true'] {
        transform: translateY(0);
    }
`;

export const PopupHeader = styled.div`
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background: #fff;
    padding: 36px 0 0 0;

    h1 {
        padding: 13px 0;
        line-height: 1.4;
        font-size: 18px;
        font-weight: 700;
        color: ${({ theme }) => theme.colors.gray[800]};
        text-align: center;
    }
`;

export const Handle = styled.div`
    width: 40px;
    height: 5px;
    border-radius: 2.5px;
    background: #e2e2e2;
    position: absolute;
    top: 4.5px;
    left: 50%;
    transform: translateX(-50%);
`;

export const PupupBody = styled.div`
    padding: 20px 30px;
    background: #fff;
`;

export const Count = styled.div`
    display: flex;
    width: fit-content;
    flex: 0 0 auto;
    gap: 10px;
    margin-left: auto;
    padding: 10px;
    border-radius: 100px;
    border: 1px solid ${({ theme }) => theme.colors.primary[100]};
    background: ${({ theme }) => theme.colors.primary[50]};

    font-size: 13px;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.gray[500]};

    .count { font-weight: 600; color: ${({ theme }) => theme.colors.gray[600]}; }
`;

export const ConvertBox = styled.div`
    display: flex;    
    justify-content: center;
    gap: 75px;
    margin-top: 13px;
    padding: 8px 20px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.gray[100]};
    line-height: 1.4;
    position: relative;

    & > * { flex: 1 1 0; min-width: 0; }

    .convert {
        max-width: 100px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        text-align: center;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray[500]};
    }

    .caption {
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray[700]};
    }
`;

export const ArrowBox = styled.div`
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
`;

export const PopupInputBox = styled.div`
    margin-top: 20px;
    line-height: 1.4;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[700]};

    span { display: block; margin-bottom: 8px; }
`;

export const PopupBottom = styled.div`
    display: flex;
    padding: 10px 20px 44px 20px;
    background: #fff;
`;