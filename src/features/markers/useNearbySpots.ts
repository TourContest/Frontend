import { useEffect, useMemo, useState } from "react";
import { spotsApi } from "src/api/spotsApi";
import type { MapItem } from "./types";

export type NearbySpot = {
  id: number | string;
  name: string;
  latitude: number;
  longitude: number;
  likeCount: number;
  likedByMe: boolean;
  imageUrls?: string[];
  type?: "POST" | "SPOT" | "CHALLENGE";
  challengeOngoing?: boolean;
};

type Options = {
  /** 진행중 챌린지만 돌려받고 싶을 때 true */
  onlyOngoingChallenge?: boolean;
};

function mapNearbyToItems(list: NearbySpot[]): MapItem[] {
  return list
    .map((s) => {
      let level: MapItem["level"] | null = null;
      if (s.type === "CHALLENGE") level = "challenge";
      else if (s.type === "SPOT") level = "spot";
      else level = null; // POST는 지도 제외

      if (!level) return null;

      return {
        id: String(s.id),
        lat: Number(s.latitude),
        lng: Number(s.longitude),
        level, // ← "challenge" | "spot"
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
  centerLat: number,
  centerLng: number,
  radiusKm = 3,
  opts: Options = {}
) {
  const { onlyOngoingChallenge = false } = opts;

  const [items, setItems] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const res = await spotsApi.getNearby(centerLat, centerLng, radiusKm);
        // 서버가 {success, data} 래핑이거나 바로 배열일 수 있음 → 둘 다 대응
        const payload = res.data?.data ?? res.data ?? [];
        const list: NearbySpot[] = Array.isArray(payload) ? payload : [];

        if (!alive) return;
        const mapped = mapNearbyToItems(list);

        const filtered = onlyOngoingChallenge
          ? mapped.filter((m) => m.level === "challenge" && m.ongoing)
          : mapped;

        setItems(filtered);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "근처 스팟 로드 실패");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [centerLat, centerLng, radiusKm, onlyOngoingChallenge]);

  const markers = useMemo(() => items, [items]);
  return { markers, loading, error, raw: items };
}
