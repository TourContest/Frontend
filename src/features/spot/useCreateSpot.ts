import { useMutation } from "@tanstack/react-query";
import { communityApi } from "src/api/community";
import type { SpotCreate } from "src/types/SpotTypes";

export function useCreateSpot() {
    return useMutation({
        mutationFn: (payload: SpotCreate) => communityApi.createSpot(payload),
    })
};