// src/mocks/mockSpots.ts
import type { MapItem } from "src/features/markers/types";

/** 중심 좌표 주변에 n개의 목마커를 생성 (반경 radiusKm 안쪽) */
export function makeMockSpotsAround(
  centerLat: number,
  centerLng: number,
  n = 3,
  radiusKm = 1.5
): MapItem[] {
  // 위도/경도 1도 ≒ 111km
  const deg = radiusKm / 111;

  const res: MapItem[] = [];
  for (let i = 0; i < n; i++) {
    const dLat = (Math.random() - 0.5) * 2 * deg;
    const dLng = (Math.random() - 0.5) * 2 * deg;
    const isChallenge = i % 2 === 1; // 절반 정도는 챌린지

    res.push({
      id: `mock-${Date.now()}-${i}`,
      lat: centerLat + dLat,
      lng: centerLng + dLng,
      level: isChallenge ? "challenge" : "spot",
      themes: [],
      title: isChallenge ? `목 챌린지 ${i + 1}` : `목 스팟 ${i + 1}`,
      thumb: undefined,
      likes: 0,
      liked: false,
      ongoing: isChallenge && Math.random() > 0.5, // 챌린지는 절반쯤 진행중 표시
    });
  }
  return res;
}
