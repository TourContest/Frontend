import { useEffect, useRef, useState } from "react";

type Opt = {
  minStepMeters?: number; // 너무 작은 이동거리는 무시
  minAccuracyOk?: number; // 정확도가 나쁘면 무시
  strideMeters?: number; // 보폭(기본 0.7m)
  autoStart?: boolean;
};

export function usePathStats(
  lat: number | null,
  lng: number | null,
  accuracy?: number | null,
  opt: Opt = {}
) {
  const {
    minStepMeters = 2,
    minAccuracyOk = 60,
    strideMeters = 0.7,
    autoStart = true,
  } = opt;

  const prev = useRef<{ lat: number; lng: number } | null>(null);
  const [meters, setMeters] = useState(0);

  useEffect(() => {
    if (lat == null || lng == null) return;

    if (!prev.current) {
      if (autoStart) prev.current = { lat, lng };
      return;
    }
    if (typeof accuracy === "number" && accuracy > minAccuracyOk) return;
    const d = haversineMeters(prev.current.lat, prev.current.lng, lat, lng);
    if (d < minStepMeters) return;

    setMeters((m) => m + d);
    prev.current = { lat, lng };
  }, [lat, lng, accuracy, minAccuracyOk, minStepMeters, autoStart]);

  const km = meters / 1000;
  const steps = Math.floor(meters / strideMeters);

  return {
    km,
    steps,
    formatKm: (digits = 2) => `${km.toFixed(digits)} km`,
    formatSteps: () => `${steps} 걸음`,
  };
}

function haversineMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371000; // m
  const toRad = (x: number) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
