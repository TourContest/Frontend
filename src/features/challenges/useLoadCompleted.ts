// src/features/challenges/useLoadCompleted.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { challengeApi } from "../../api/challengeApi";
import {
  setDoneChallenges,
  appendDoneChallenges,
} from "src/redux/challenge/actions";
import { selectDone } from "src/redux/challenge/selectors";
import type { ChallengeCardData } from "src/components/challenge-card/ChallengeCard";
import fallbackImg from "src/assets/jeju.svg?url";

const fmt = (x?: string) => {
  if (!x) return "";
  const d = new Date(x);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
};

const toCard = (row: any): ChallengeCardData => ({
  id: String(row?.id),
  title: row?.name ?? "제목 없음",
  categoryLabel: row?.themeName ?? "취향 저격 스팟",
  statusLabel: "완료",
  dateText: row?.completedAt
    ? fmt(row.completedAt)
    : row?.endDate
      ? fmt(row.endDate)
      : "",
  imageUrl: row?.img1 || fallbackImg,
  categoryTone: row?.themeName ? "primary" : "neutral",
});

export function useLoadCompleted(initialSize = 20) {
  const dispatch = useDispatch();
  const done = useSelector(selectDone);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const lastIdRef = useRef<string | undefined>(undefined);

  const fetchPage = useCallback(
    async (mode: "reset" | "append") => {
      setLoading(true);
      setError(null);
      try {
        const params: any = { sort: "latest", size: initialSize };
        if (mode === "append" && lastIdRef.current)
          params.lastId = lastIdRef.current;

        const res = await challengeApi.getCompleted(params);
        const arr: any[] = Array.isArray(res.data)
          ? res.data
          : (res.data?.content ?? []);
        const mapped = arr.map(toCard);

        if (mode === "reset") dispatch(setDoneChallenges(mapped));
        else dispatch(appendDoneChallenges(mapped));

        const last = arr.at(-1);
        lastIdRef.current = last ? String(last.id) : lastIdRef.current;
        setHasMore(arr.length >= (params.size ?? initialSize));
      } catch (e: any) {
        setError(e?.message ?? "완료 챌린지 로드 실패");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, initialSize]
  );

  const reset = useCallback(() => {
    lastIdRef.current = undefined;
    setHasMore(true);
    return fetchPage("reset");
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) return fetchPage("append");
  }, [fetchPage, loading, hasMore]);

  // 처음 한 번 로드 (이미 store에 있으면 생략)
  useEffect(() => {
    if (done.length === 0) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // IntersectionObserver ref
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setSentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first?.isIntersecting) loadMore();
        },
        { rootMargin: "200px" }
      );
      observerRef.current.observe(node);
    },
    [loadMore]
  );

  return {
    loading,
    error,
    hasMore,
    reset,
    loadMore,
    sentinelRef: setSentinelRef,
  };
}
