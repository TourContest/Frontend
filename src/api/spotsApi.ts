// src/api/spotsApi.ts
import api from "./instance";

export type NearbySpot = {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  likeCount: number;
  likedByMe: boolean;
  imageUrls?: string[];
  type?: "POST" | "SPOT" | "CHALLENGE"; // 서버가 채워주기 시작
  challengeOngoing?: boolean;
};

export const spotsApi = {
  getNearby: (lat: number, lng: number, radiusKm?: number) =>
    api.get("api/spots/nearby", { params: { lat, lng, radiusKm } }),
};
