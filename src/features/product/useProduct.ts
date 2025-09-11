import { useQuery } from "@tanstack/react-query"
import { productApi } from "src/api/product";
import type { Product } from "src/components/my-page/product/type"

export const useProduct = (productId: string | number) => {
    return useQuery<Product>({
        queryKey: ['product', String(productId)],
        queryFn: async () => {
            const res = await productApi.getProductById(productId);
            return res.data.data;
        },
        enabled: !!productId, // 파라미터를 준비 될 때만 호출
    });
};