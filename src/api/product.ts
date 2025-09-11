import type { Product } from "src/components/my-page/product/type";
import api from "./instance";

export type ProductCategory = 'JEJU_TICON' | 'GOODS';

export type OwnedProduct = {
    id: number;
    name: string;
    imageUrl: string;
    category: ProductCategory;
    accepted: boolean; // 내 상품권 응답에 존재
}

type ApiRes<T> = { success: boolean; data: T };

export const productApi = {
    // 상품 조회
    getProduct: (category: ProductCategory, signal?: AbortSignal) =>
        api.get<ApiRes<Product[]>>('v1/products', { params: { category }, signal }),
    getProductById: (productId: string | number) => 
        api.get<ApiRes<Product>>(`v1/products/${productId}`),
    exchangeProduct: (productId: string | number, userId: number | string, signal?: AbortSignal) =>
        api.post<ApiRes<string>>(`v1/products/${productId}/exchange`, null, { params: { userId }, signal }),

    // 상품권 조회
    getMyProduct: (userId: string, signal?: AbortSignal) =>
        api.get<ApiRes<OwnedProduct[]>>('v1/products/my', { params: { userId }, signal }),
    getExchangeDetail: (exchangeId: number, signal?: AbortSignal) =>
        api.get<ApiRes<OwnedProduct>>(`v1/products/exchanges/${exchangeId}/detail`, { signal }),
    
    // 상품 수령
    acceptToggle: (productId: string | number, signal?: AbortSignal) =>
        api.post<ApiRes<string>>(`v1/products/${productId}/accept-toggle`, null, { signal })
};