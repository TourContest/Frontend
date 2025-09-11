import { useCallback, useEffect, useRef, useState } from "react";
import { productApi, type ProductCategory } from "src/api/product";
import type { Product } from "src/components/my-page/product/type";

export function useProducts(category: ProductCategory, enabled = true) {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(!!enabled);
    const [error, setError] = useState<string | null>(null);

    // 진행 중인 요청을 끊기 위해 보관하는 컨트롤러
    const controllerRef = useRef<AbortController | null>(null);

    // 목록 요청 함수
    const fetchList = useCallback(async () => {
        // 1. 이전 요청 진행 중이면 → 즉시 취소한다.
        controllerRef.current?.abort();

        // 2. 이번 요청 전용 컨트롤러 생성
        const controller = new AbortController();
        controllerRef.current = controller;

        setIsLoading(true);
        setError(null);

        try {
            // 3. 서버 호출 * signal을 넘기면, absort()로 끊기 가능
            const { data } = await productApi.getProduct(category, controller.signal);
            if (controller.signal.aborted) return; // 만약 이 사이 요청 취소 됐다면 더이상 아무것도 하지 않는다.

            setProducts(data?.data ?? []);
        } catch(err) {
            if (controller.signal.aborted) return; // 에러가 취소로 인한 것이면 무시한다. (에러 노출 x)

            // 4. 외의 에러 표시
            setError("상품 목록을 불러오지 못했습니다.");
            setProducts([]);
        } finally {
            // 취소된 요청이면 로딩 표시를 건드리지 않는다.
            if (!controller.signal.aborted) setIsLoading(false);
        }
    }, [category]);

    useEffect(() => {
        // 5. enabled일 때만 자동 호출
        if (enabled) fetchList();

        // 6. 카테고리가 바뀌거나 컴포넌트가 사라질 때 진행중인 요청을 취소한다.
        return () => controllerRef.current?.abort();
    }, [enabled, fetchList]);

    return {
        products,
        isLoading,
        isError: !!error,
        error,
        refetch: fetchList
    }
};