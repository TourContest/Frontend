import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { communityApi } from "src/api/community";
import type { CommentRes } from "src/components/community/Comment/types";

// 댓글 목록 조회
export const useComments = (spotId: number) => {
  return useQuery<CommentRes>({
    queryKey: ["comments", spotId],
    queryFn: () => communityApi.getComments(spotId),
  });
};

// 댓글 작성
export const usePostComment = (spotId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => communityApi.postComment(spotId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", spotId] });
    },
  });
};

// 대댓글(답글) 목록 조회
export const useReplies = (spotId: number, parentReplyId: number | null) => {
  return useQuery<CommentRes>({
    queryKey: ["replies", spotId, parentReplyId],
    queryFn: () => communityApi.getReplies(spotId, parentReplyId as number),
    enabled: parentReplyId !== null, // ✅ parentReplyId 있을 때만 실행
  });
};

// 대댓글 작성
export const usePostReply = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spotId, parentReplyId, text }: { spotId: number; parentReplyId: number; text: string }) =>
      communityApi.postReply(spotId, parentReplyId, text),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["replies", variables.spotId, variables.parentReplyId] });
      queryClient.invalidateQueries({ queryKey: ["comments", variables.spotId] });
    },
  });
};

