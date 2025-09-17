import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { challengeApi } from "../../api/challengeApi";
import { setReadyChallenges } from "src/redux/challenge/actions";
import type { ChallengeCardData } from "src/components/challenge-card/ChallengeCard";
import jejuUrl from "src/assets/jeju.svg?url";

const fmt = (x?: string | number | Date) => {
  const d = x ? new Date(x) : new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
};

const toCard = (row: any): ChallengeCardData => ({
  id: String(row.id),
  title: row.name ?? "제목 없음",
  categoryLabel: row.themeName ?? "취향 저격 스팟",
  statusLabel: "진행전",
  dateText: fmt(), // 서버 날짜 없으니 오늘 날짜
  imageUrl: row.img1 ?? jejuUrl, // img1 사용
  categoryTone: row.themeName ? "primary" : "neutral",
});

export function useLoadUpcoming() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stop = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await challengeApi.getUpcoming();
        const payload = res.data;
        const arr = Array.isArray(payload) ? payload : (payload?.content ?? []);
        const mapped = arr.map(toCard);
        if (!stop) dispatch(setReadyChallenges(mapped));
      } catch (e: any) {
        if (!stop) setError(e?.message ?? "로드 실패");
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
