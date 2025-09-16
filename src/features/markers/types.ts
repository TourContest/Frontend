// 지도 마커 표준 타입 (MarkerManager가 먹는 형태)
export type MapItem = {
  id: string;
  lat: number;
  lng: number;
  level: "spot" | "challenge";
  themes: string[]; // 서버 응답엔 없음 → 빈 배열 유지
  title?: string;
  thumb?: string;
  likes?: number;
  liked?: boolean;
  ongoing?: boolean; // challengeOngoing 반영
};

// 좋아요 임계값 (게시글 → spot/challenge 판정용)
export const LIKE_TO_SPOT = 10;
export const LIKE_TO_CHALLENGE = 30;
