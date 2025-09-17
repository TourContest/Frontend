import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { spotsApi } from "src/api/spotsApi";
import type { MapItem } from "./types";
import type { NearbySpot } from "src/api/spotsApi";
import { makeMockSpotsAround } from "src/mocks/mockSpots";

type Options = {
  /** 진행중 챌린지만 돌려받고 싶을 때 true */
  onlyOngoingChallenge?: boolean;
  mockOnly?: boolean;
};

// 서버 응답 → MapItem
function mapNearbyToItems(list: NearbySpot[]): MapItem[] {
  return list
    .map((s) => {
      // 서버 type 우선 (POST는 지도 제외)
      let level: MapItem["level"] | null = null;
      if (s.type === "CHALLENGE") level = "challenge";
      else if (s.type === "SPOT") level = "spot";
      else return null;

      return {
        id: String(s.id),
        lat: Number(s.latitude),
        lng: Number(s.longitude),
        level,
        themes: [],
        title: s.name,
        thumb: s.imageUrls?.[0],
        likes: Number(s.likeCount ?? 0),
        liked: !!s.likedByMe,
        ongoing: !!s.challengeOngoing,
      } as MapItem;
    })
    .filter((v): v is MapItem => v !== null);
}

export function useNearbySpots(
  centerLat?: number,
  centerLng?: number,
  radiusKm = 3,
  opts: Options = {}
) {
  const { onlyOngoingChallenge = false, mockOnly = false } = opts;
  if (mockOnly) {
    const mocks = useMemo(() => {
      if (centerLat == null || centerLng == null) return [];
      // (필요하면 n, radiusKm 조절)
      return makeMockSpotsAround(
        centerLat,
        centerLng,
        6,
        Math.min(radiusKm, 2)
      );
    }, [centerLat, centerLng, radiusKm]);

    const markers = onlyOngoingChallenge
      ? mocks.filter((m) => m.level === "challenge" && m.ongoing)
      : mocks;

    return {
      markers,
      raw: mocks,
      loading: false,
      error: null as string | null,
    };
  }

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "nearbySpots",
      centerLat,
      centerLng,
      radiusKm,
      onlyOngoingChallenge,
    ],
    enabled: centerLat != null && centerLng != null,
    queryFn: async () => {
      if (centerLat == null || centerLng == null) return [] as NearbySpot[];
      const res = await spotsApi.getNearby(centerLat, centerLng, radiusKm);
      const payload = res.data?.data ?? res.data ?? [];
      return Array.isArray(payload) ? (payload as NearbySpot[]) : [];
    },
    select: (raw: NearbySpot[]) => {
      const mapped = mapNearbyToItems(raw);
      const filtered = onlyOngoingChallenge
        ? mapped.filter((m) => m.level === "challenge" && m.ongoing)
        : mapped;

      const mocks =
        centerLat != null && centerLng != null
          ? makeMockSpotsAround(centerLat, centerLng, 3, Math.min(radiusKm, 2))
          : [];

      return {
        markers: [...filtered, ...mocks],
        raw,
      };
    },
    staleTime: 60_000,
  });

  return {
    markers: data?.markers ?? [],
    raw: data?.raw ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
