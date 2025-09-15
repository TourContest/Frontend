// src/mocks/fetchMapRecordsNearMe.ts
import type { Fetcher, PostRecord } from "src/features/markers/useMapMarkers";
import { offsetByMeters } from "./geo";

export const makeNearbyMockFetcher = (center?: {
  lat: number;
  lng: number;
}): Fetcher => {
  return async () => {
    if (!center) {
      // 위치 못 얻었을 땐 기존 목데이터 그대로
      return [
        { id: "p-1", lat: 33.489, lng: 126.498, likes: 7, themes: ["오름"] },
        {
          id: "p-2",
          lat: 33.49,
          lng: 126.503,
          likes: 12,
          themes: ["카페", "바다"],
        },
        {
          id: "p-3",
          lat: 33.493,
          lng: 126.502,
          likes: 45,
          themes: ["올레", "바다"],
        },
        { id: "p-4", lat: 33.491, lng: 126.506, likes: 20, themes: [] },
      ] as PostRecord[];
    }
    // 현재 위치 기준으로 150~800m 오프셋
    const p2 = offsetByMeters(center.lat, center.lng, 200, 80); // 12 likes → spot(파랑)
    const p3 = offsetByMeters(center.lat, center.lng, -450, 260); // 45 likes → challenge(빨강)
    const p4 = offsetByMeters(center.lat, center.lng, 800, -150); // 20 likes → spot
    return [
      {
        id: "p-2",
        lat: p2.lat,
        lng: p2.lng,
        likes: 12,
        themes: ["카페", "바다"],
      },
      {
        id: "p-3",
        lat: p3.lat,
        lng: p3.lng,
        likes: 45,
        themes: ["올레", "바다"],
      },
      { id: "p-4", lat: p4.lat, lng: p4.lng, likes: 20, themes: [] },
    ] as PostRecord[];
  };
};
