import { useEffect, useMemo, useState } from "react";
import type { MapItem } from "./types";
import { LIKE_TO_CHALLENGE, LIKE_TO_SPOT } from "./types";

export type PostRecord = {
  id: string | number;
  lat: number;
  lng: number;
  likes: number;
  themes: string[];
  title?: string;
  imageUrl?: string;
};

export function usePostMarkers(fetchPosts: () => Promise<PostRecord[]>) {
  const [items, setItems] = useState<MapItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const raw = await fetchPosts();

        const mapped: MapItem[] = raw
          .map((p) => {
            const level =
              p.likes >= LIKE_TO_CHALLENGE
                ? "CHALLENGE"
                : p.likes >= LIKE_TO_SPOT
                  ? "SPOT"
                  : null;
            if (!level) return null;
            return {
              id: String(p.id),
              lat: p.lat,
              lng: p.lng,
              level,
              themes: p.themes ?? [],
              title: p.title,
              thumb: p.imageUrl,
              likes: p.likes,
            } as MapItem;
          })
          .filter((v): v is MapItem => v !== null);

        if (!alive) return;
        setItems(mapped);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? "게시글 마커 변환 실패");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [fetchPosts]);

  const markers = useMemo(() => items, [items]);
  return { markers, loading, error, raw: items };
}
