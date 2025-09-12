import { useMutation, useQueryClient } from "@tanstack/react-query"
import { productApi, type ProductCategory } from "src/api/product";
import { QK } from "src/utils/lib/queryKeys";

type ExchangeVars = {
    productId : string | number;
    userId: string;
}

export const useExchangeProduct = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async ({ productId, userId }: ExchangeVars) => {
            const res = await productApi.exchangeProduct(productId, userId);
            return res.data.data;
        },
        onSuccess: async (_data, vars) => {
            // 성공 시 내 상품권 갱신
            await qc.invalidateQueries({ queryKey: QK.myProducts(vars.userId) });
        }
    })
};