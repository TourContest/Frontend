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

export interface SpotMapRes {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  type: "POST" | "SPOT" | "CHALLENGE" | string;
};

export const spotsApi = {
  getNearby: (lat: number, lng: number, radiusKm?: number) =>
    api.get("api/spots/nearby", { params: { lat, lng, radiusKm } }),
  
  search: (query: string) =>
    api.get<{ success: boolean; data: SpotMapRes[] }>(
      "api/spots/map/search",
      { params: { query } }
    ),
};