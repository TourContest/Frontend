import { useEffect, useMemo, useRef, useState } from "react";

export type OngoingLite = {
  id: string | number;
  latitude?: number | null;
  longitude?: number | null;
  name?: string;
};

type Options = {
  thresholdMeters?: number; // 이 거리 이내면 모달 오픈
  cooldownMs?: number; // 같은 챌린지에 대해 재토출 방지
};

export function useProximityCert(
  items: OngoingLite[],
  lat?: number | null,
  lng?: number | null,
  opt: Options = {}
) {
  const threshold = opt.thresholdMeters ?? 120;
  const cooldownMs = opt.cooldownMs ?? 180_000;

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<OngoingLite | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  // 재노출 제어하기 (메모리 + localStorage)
  const lastShownRef = useRef<Record<string | number, number>>({});

  const nearest = useMemo(() => {
    if (lat == null || lng == null || !items?.length) return null;
    let best: { item: OngoingLite; d: number } | null = null;
    for (const it of items) {
      const a = it.latitude,
        b = it.longitude;
      if (a == null || b == null) continue;
      const d = haversine(lat, lng, a, b);
      if (!best || d < best.d) best = { item: it, d };
    }
    return best;
  }, [items, lat, lng]);

  useEffect(() => {
    if (!nearest) return;
    const { item, d } = nearest;
    if (d > threshold) return;

    const key = String(item.id);
    const now = Date.now();
    const last =
      lastShownRef.current[key] ??
      Number(localStorage.getItem(`cert:last:${key}`) || 0);
    if (now - last < cooldownMs) return;

    lastShownRef.current[key] = now;
    localStorage.setItem(`cert:last:${key}`, String(now));

    setTarget(item);
    setDistance(d);
    setOpen(true);
  }, [nearest, threshold, cooldownMs]);

  const dismiss = () => setOpen(false);

  return { open, target, distance, dismiss };
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
