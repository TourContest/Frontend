import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { userApi, type SessionMe } from "src/api/users";
import { QK } from "src/utils/lib/queryKeys";

export function useSessionMe<T = SessionMe>(options?: Pick<UseQueryOptions<SessionMe, Error, T>, 'select' | 'enabled'>) {
    return useQuery<SessionMe, Error, T>({
        queryKey: QK.sessionMe,
        queryFn: async () => {
            const res = await userApi.getSessionMe();
            if (!res.data?.success) throw new Error('세션 조회 실패');
            return res.data.data;
        },
        staleTime: 60_000,
        gcTime: 5 * 60_000,
    });
}