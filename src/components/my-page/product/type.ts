import type { OwnedProduct } from "src/api/product";

export type Product = {
    id: number;
    name: string;
    imageUrl?: string | null;
    hallabongCost?: number;
    stock?: number;
};

export type ShopListProps = {
    mode: "shop"
    products: Product[];
    onClickItem?: (id: number) => void;
};

export type OwnedListProps = {
    mode: "owned"
    products: OwnedProduct[];
    onClickItem?: (id: number) => void;
}

export type ProductListProps = ShopListProps | OwnedListProps;

export type ProductItemProps = {
    id: number;
    imageUrl?: string | null;
    name: string;
    hallabongCost?: number;   
    onClick?: (id: number) => void;
};

export type CouponDetailData = import("src/api/product").OwnedProduct;

export type CouponDetailProps = {
    coupon: CouponDetailData;
    // onClick?: (id: number) => void;
}