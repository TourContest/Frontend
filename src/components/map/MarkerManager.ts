// SVG 아이콘으로 표시 + 내 위치 반경 필터링 지원
import type { MapItem } from "src/features/markers/types";
import spotUrl from "src/assets/spot.svg?url";
import challengeUrl from "src/assets/challenge.svg?url";

type Center = { lat: number; lng: number };
type ClickHandler = (item: MapItem) => void;

function haversine(a: Center, b: Center) {
  const R = 6371000; // m
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export class MarkerManager {
  private map: kakao.maps.Map;
  private pool = new Map<string, kakao.maps.Marker>();
  private imgCache = new Map<
    "SPOT" | "POST" | "CHALLENGE",
    kakao.maps.MarkerImage
  >();
  private onClick?: ClickHandler;

  constructor(map: kakao.maps.Map, opts?: { onClick?: ClickHandler }) {
    this.map = map;
    this.onClick = opts?.onClick;
  }

  setOnclick(cb?: ClickHandler) {
    this.onClick = cb;
  }

  private getImage(level: "SPOT" | "POST" | "CHALLENGE") {
    if (this.imgCache.has(level)) return this.imgCache.get(level)!;

    // 아이콘 사이즈/오프셋은 실제 SVG 비율에 맞게 조정해줘
    // (아래 값은 36x44 기준, 핀 끝이 좌표에 딱 닿도록 offset 설정)
    const size = new kakao.maps.Size(36, 44);
    const offset = new kakao.maps.Point(18, 42);

    let url: string;

    if (level === "SPOT") url = spotUrl;
    else if (level === "CHALLENGE") url = challengeUrl;
    else url = spotUrl;
    const img = new kakao.maps.MarkerImage(url, size, { offset });
    this.imgCache.set(level, img);
    return img;
  }

  /**
   * items: 정규화된 지도 데이터
   * center: 내 위치(없으면 반경 필터 미적용)
   * radiusMeters: 노출 반경(m) 기본 3000m
   */
  sync(
    items?: MapItem[],
    center?: { lat: number; lng: number },
    radiusMeters = 3000
  ) {
    // 1) 입력 정제
    const source = Array.isArray(items) ? items : [];
    const sanitized: MapItem[] = source.filter(
      (it): it is MapItem =>
        !!it &&
        typeof it.lat === "number" &&
        typeof it.lng === "number" &&
        !Number.isNaN(it.lat) &&
        !Number.isNaN(it.lng)
    );

    // 2) 반경 필터(내 위치 없으면 전체)
    const base = center
      ? sanitized.filter(
          (it) =>
            haversine(center, { lat: it.lat, lng: it.lng }) <= radiusMeters
        )
      : sanitized;
    const list = center && base.length === 0 ? sanitized : base;

    const incoming = new Set(list.map((i) => i.id));

    // 3) upsert
    for (const it of list) {
      const pos = new kakao.maps.LatLng(it.lat, it.lng);
      const exist = this.pool.get(it.id);

      if (exist) {
        exist.setPosition(pos);
        exist.setImage(this.getImage(it.level));
        exist.setZIndex(it.level === "CHALLENGE" ? 3 : 2);
        continue;
      }

      const marker = new kakao.maps.Marker({
        position: pos,
        image: this.getImage(it.level),
        zIndex: it.level === "CHALLENGE" ? 3 : 2,
        clickable: true,
      });

      if (this.onClick) {
        kakao.maps.event.addListener(marker, "click", () => this.onClick!(it));
      }

      marker.setMap(this.map);
      this.pool.set(it.id, marker);
    }

    // 4) 제거
    for (const [id, m] of this.pool) {
      if (!incoming.has(id)) {
        m.setMap(null);
        this.pool.delete(id);
      }
    }
  }
}
