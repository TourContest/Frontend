import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { challengeApi } from "../../api/challengeApi";
import { setDoingChallenges } from "src/redux/challenge/actions";
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

const toCard = (row: any): ChallengeCardData => {
  const start = fmt(row?.startDate);
  const end = fmt(row?.endDate);
  const dateText = start && end ? `${start} ~ ${end}` : start || end || "";

  return {
    id: String(row?.id),
    title: row?.name ?? "제목 없음",
    categoryLabel: row?.themeName ?? "취향 저격 스팟",
    statusLabel: "진행중",
    dateText,
    imageUrl: row?.img1 || fallbackImg,
    // 테마 강조 유무는 자유 — 없으면 중립톤
    categoryTone: row?.themeName ? "primary" : "neutral",
  };
};

export function useLoadOngoing() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await challengeApi.getOngoing();
        const arr = Array.isArray(res.data)
          ? res.data
          : (res.data?.content ?? []);
        const mapped = arr.map(toCard);
        if (!stop) dispatch(setDoingChallenges(mapped));
      } catch (e: any) {
        if (!stop) setError(e?.message ?? "진행중 챌린지 로드 실패");
      } finally {
        if (!stop) setLoading(false);
      }
    })();
    return () => {
      stop = true;
    };
  }, [dispatch]);

  return { loading, error };
}
