import styled from '@emotion/styled';
import { checkerBg } from 'src/styles/checkerBg';


export const ProductCard = styled.div`
    color: ${({ theme }) => theme.colors.gray[700]};
    line-height: 1.4;
    cursor: pointer;
`;

export const ProductImgWrapper = styled.div<{ checker: boolean }>`
    position: relative;
    width: 100%;
    aspect-ratio: 32 / 27;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
    ${({ checker }) => checker && checkerBg};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        user-select: none; // 이미지 드래그 선택 방지
        -webkit-user-drag: none; // 이미지 끌림 방지
    }
`;

export const ProductName = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ProductPrice = styled.div`
    display: flex;
    align-items: center;

    img {
        width: 24px;
        display: block;
    }
`;

export const GridWrapper = styled.ul`
    max-width: 720px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 15px;
    list-style: none;
    padding: 30px 0;
    margin: 0 auto;

    li { min-width: 0; }
`;

export const EmptyContainer = styled.div`
    background: ${({ theme }) => theme.colors.bg[50]};
    height: calc(100vh - 48px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    algin-items: center;
    gap: 10px;

    img {
        height: 110px;
    }
`;

export const EmptyMessage = styled.div`
    text-align: center;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[500]};
`;

export const CouponBox = styled.div`
    max-width: 720px;
    position: relative;
    top: 20px;
    margin: 0 auto;
    padding: 18px 15px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0 3px 16px 0 rgba(210, 210, 210, 0.40);
`;

export const CouponInformation = styled.div`
    margin: 20px 0;
`;

export const CouponName = styled.div`
    font-size: 18px;
    font-weight: 600;

    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: keep-all;
    overflow-wrap: anywhere;

    &.product {
        font-size: 24px;
        margin-bottom: 2px;
    }
`;

export const AvailablePlace = styled.div`
    line-height: 1.4;
    margin-bottom: 8px;

    .caption {
        font-size: 14px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.gray[700]};
        display: block;
        margin-bottom: 4px;
    }

    .place {
        font-size: 13px;
        color: ${({ theme }) => theme.colors.gray[600]};
        display: block;
    }
`;

export const CouponAlert = styled.div`
    padding:8px 12px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.bg[50]} ;
    font-size: 13px;
    line-height: 1.4;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[400]};
`;