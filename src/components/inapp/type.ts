import type { ProductCategory } from "src/api/product";
import type { Product } from "../my-page/product/type";

export type PaymentProps = {
    price: number;
    available: number; // 보유 한라봉
    onPreviewChange?: (p: { applied: number; cashToPay: number; shortage: number }) => void;
    showMessage?: boolean;
};

export type PaymentProps02 = {
    product: Product;
    fallbackCategory?: ProductCategory;
}

export type HanlabongPreview = {
    applied: number; // 실제 적용될 한라봉 개수
    shortage: number; // 부족 개수
    cashToPay: number; // 추가결제 필요개수
};

export type ShortageProps = {
    open: boolean;
    onClose: () => void;
    onConvertPoint?: () => void;
    onJoinChallenge?: () => void;
    onWritePost?: () => void;
}