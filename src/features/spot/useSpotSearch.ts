import { useQuery } from "@tanstack/react-query";
import { spotsApi } from "src/api/spotsApi";

export function useSpotSearch(query: string) {
  return useQuery({
    queryKey: ["spotSearch", query],
    queryFn: () => spotsApi.search(query),
    enabled: !!query.trim(), // query 없으면 요청 안 감
    staleTime: 1000 * 60,    // 1분 캐싱
  });
};