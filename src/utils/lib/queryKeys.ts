export const QK = {
    // 상품 목록
    products: (category?: 'JEJU_TICON' | 'GOODS') => 
        ['GET /v1/products', { category }] as const,

    // 단일 상품
    product: (productId: string | number) =>
        ['GET /v1/products/:productId', String(productId)] as const,

    // 보유 상품 목록
    myProducts: (userId: string | number) =>
        ['GET /v1/products/my', String(userId ?? '')] as const,
    exchangeDetail: (id?: string | number) => ["product", "exchange-detail", String(id ?? "")] as const,

    sessionMe: ['GET /v1/users/session/me'] as const,
}