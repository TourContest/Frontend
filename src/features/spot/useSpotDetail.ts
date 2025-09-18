import { useQuery } from "@tanstack/react-query";
import { communityApi } from "src/api/community";

export const useSpotDetail = (id: number) => {
  return useQuery({
    queryKey: ["spotDetail", id],
    queryFn: () => communityApi.getSpotDetail(id).then((res) => res.data),
    enabled: !!id, // id가 있을 때만 실행
  });
};
