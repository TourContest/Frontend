import { useQuery } from "@tanstack/react-query";
import type { OwnedProduct } from "src/api/product";
import { productApi } from "src/api/product";
import { QK } from "src/utils/lib/queryKeys";

export const useExchangeDetail = (exchangeId?: string | number) =>
    useQuery<OwnedProduct>({
        queryKey: QK.exchangeDetail(exchangeId),
        enabled: !!exchangeId,
        queryFn: async ({ signal }) => {
            if (exchangeId == null) throw new Error('exchangeId가 없습니다.');
            const res = await productApi.getExchangeDetail(Number(exchangeId), signal);
            return res.data.data;
        },
    });