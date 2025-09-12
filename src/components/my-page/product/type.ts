export type Product = {
    productId: string | number;
    name: string;
    imageUrl?: string | null;
    hallabongCost?: number;
    stock?: number;
};

export type OwnedProduct = import('src/api/product').OwnedProduct;

export type ShopListProps = {
    mode: "shop"
    products: Product[];
    onClickItem?: (productId: string | number) => void;
};

export type OwnedListProps = {
    mode: "owned"
    products: OwnedProduct[];
    onClickItem?: (exchangeId: string | number) => void;
}

export type ProductListProps = ShopListProps | OwnedListProps;

export type ProductItemProps = {
    id: string | number;
    imageUrl?: string | null;
    name: string;
    hallabongCost?: number;   
    onClick?: () => void;
};

export type CouponDetailData = import("src/api/product").OwnedProduct;

export type CouponDetailProps = {
    coupon: CouponDetailData;
    // onClick?: (productId: string | number, coupon: CouponDetailData) => void;
}