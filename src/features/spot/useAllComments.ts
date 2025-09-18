import { useEffect, useState } from "react";
import { communityApi } from "src/api/community";
import type { SpotComment } from "src/components/community/Comment/types";

export const useAllComments = (spotId: number) => {
  const [comments, setComments] = useState<SpotComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const root = await communityApi.getComments(spotId);
        let all: SpotComment[] = [];

        for (const c of root.content) {
          all.push(c);
          // 각 댓글의 대댓글도 불러오기
          const replies = await communityApi.getReplies(spotId, c.id);
          all = [...all, ...replies.content];
        }

        setComments(all);
      } catch (e) {
        console.error("댓글 불러오기 실패", e);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [spotId]);

  return { comments, loading };
};
