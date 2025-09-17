// src/features/challenges/refreshUpcoming.ts
import { challengeApi } from "../../api/challengeApi";
import { setReadyChallenges } from "src/redux/challenge/actions";
import type { ChallengeCardData } from "src/components/challenge-card/ChallengeCard";
import fallbackImg from "src/assets/jeju.svg?url";

const fmtToday = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
};

// 서버 스키마(name, img1, themeName 기준) → 카드 스키마
export const mapUpcomingRowToCard = (row: any): ChallengeCardData => ({
  id: String(row?.id),
  title: row?.name ?? "제목 없음",
  categoryLabel: row?.themeName ?? "취향 저격 스팟",
  statusLabel: "진행전",
  dateText: fmtToday(),
  imageUrl: row?.img1 || fallbackImg,
  categoryTone: row?.themeName ? "primary" : "neutral",
});

export async function refreshUpcomingAndStore(dispatch: any) {
  try {
    await challengeApi.refreshUpcoming();
  } catch {
    /* 트리거 실패는 무시 */
  }
  const res = await challengeApi.getUpcoming();
  const list = Array.isArray(res.data) ? res.data : (res.data?.content ?? []);
  dispatch(setReadyChallenges(list.map(mapUpcomingRowToCard)));
}
