import { useEffect, useRef, useState } from "react";
type GeoState = {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  loading: boolean;
  error?: string;
};

export function useGeolocation(
  options: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 1000,
  }
) {
  const [state, setState] = useState<GeoState>({
    lat: null,
    lng: null,
    accuracy: null,
    loading: true,
  });

  const id = useRef<number | null>(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "브라우저에서 위치를 지원하지 않아요!",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (p) =>
        setState({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracy: p.coords.accuracy,
          loading: false,
        }),
      (e) =>
        setState((x) => ({
          ...x,
          loading: false,
          error: e.message,
        })),
      options
    );
    id.current = navigator.geolocation.watchPosition(
      (p) =>
        setState({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracy: p.coords.accuracy,
          loading: false,
        }),
      (e) => setState((x) => ({ ...x, error: e.message })),
      options
    );
    return () => {
      if (id.current != null) navigator.geolocation.clearWatch(id.current);
    };
  }, []);
  return state;
}
