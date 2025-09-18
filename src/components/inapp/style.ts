import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const InappWrapper = styled.div`
    background: ${({ theme }) => theme.colors.bg[50]};
    height: calc(100vh - 48px);
    overflow-y: scroll;
    padding: 0 20px;
`;

export const MyHanlabongWrapper = styled.div`
    display: flex;
    max-width: 720px;
    margin: 10px auto;
    padding: 14px 17.5px;
    font-weight: 500;
    border-radius: 50px;
    border: 1px solid ${({ theme }) => theme.colors.primary[200]};
    background: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[400]};

    & > * { min-width: 0; }

    &.sm {
        width: fit-content;
        margin: 10px 0 25px auto;
    }
`;

export const MyHanlabongBox =styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 0;

    img { width: 24px; }

    .hanlabong { 
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray[600]};
        margin-left: 8px;
    }
`;

export const Bar = styled.div`
    flex: 0 0 1px;
    align-self: stretch;
    background: ${({ theme }) => theme.colors.primary[200]};
`;

export const ChargeBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 9px;
    flex: 1 1 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.primary[400]};
`;

export const ProductDetailBox = styled.div``;

export const ProductInformation = styled.div`
    margin-top: 20px;
`;

export const ProductArea = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.gray[500]};
    line-height: 1.4;
`;

export const ProductsName = styled.div`
    margin-top: 10px;
    margin-bottom: 15px;

    .price {
        display: flex;
        gap: 4px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.4;

        img { width: 26px; }
    }
`;

export const BannerWrapper = styled.div`
    margin: 40px 0 143.33px 0;
    background: #fff4db;
    border-radius: 12px;
    height: 91px;
    overflow:hidden;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    & > div { width: calc(100% - 121px); }
`;

export const ChargeHanlabong = styled.div`
    font-size: 18px;
    font-weight: 600;
    line-height: 1.4;
    color: ${({ theme }) => theme.colors.primary[500]};
    display: flex;
    flex-direction: column;

    & > div { 
        display: flex; 
        align-items: center; 
        align-self: stretch;
        justify-content: space-between;
        padding-right: 20px;
    }
    
    span {
        display: block;
        margin-top: 4px;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.primary[400]};
    }
`;

export const PaymentBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    h4 {
        font-size: 18px;
        font-weight: 600;
        line-height: 1.4;
        color: #000;
    }
`;

export const RowBar = styled.div`
    width: 100%;
    height: 1px;
    background: ${({ theme }) => theme.colors.gray[200]};
`;

export const PaymentProductBox = styled.div`
    display: flex;
    gap: 18px;
    line-height: 1.4;
`;

export const PaymentImgWrapper = styled.div`
    width: 80px;
    height: 80px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
        display: block;
        user-select: none;
        -webkit-user-drag: none;
    }
`;

export const PaymentProductInfo = styled.div`
    display: flex;
    flex-direction: column;

    span { color: ${({ theme }) => theme.colors.gray[500]}; }
    h4 {
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray[700]};
    }
    & > div { display: flex; gap: 4px; align-items: center; }
    & > div .price { ${({ theme }) => theme.colors.gray[600]}; }
`;

export const Back = styled.div`
    position: fixed; inset: 0;
    background: ${({ theme }) => theme.colors.bg[50]};
    z-index: 11;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    gap: 45px;
`;

export const CloseBtn = styled.div`
    position: absolute;
    top: 6px;
    right: 17px;
`;

export const ShortageImgBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    gap: 43px;
    line-height: 1.4;
    text-align: center;
    max-width: 240px;

    h4 { 
        font-size: 18px;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.gray[800]};
        margin-bottom: 4px;
    }

    span {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray[600]};
    }
`;