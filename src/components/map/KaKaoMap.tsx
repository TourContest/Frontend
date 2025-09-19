import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectDoing } from "src/redux/challenge/selectors";
import { useProximityCert } from "src/features/challenges/useProximityCert";
import { completeChallenge } from "src/redux/challenge/actions";
import { useKakaoLoader } from "src/features/main/useKakaoLoader";
import { useGeolocation } from "src/features/main/useGeolocation";
import { usePathStats } from "src/features/main/usePathStats";
import MapHud from "./MapHud";
import * as T from "src/styles/tokens.js";
import characterUrl from "src/assets/BlackPig.svg?url";
import ProfileSheet from "src/components/profile/ProfileSheet";
import CameraSheet from "../camera/CameraSheet";
import { MarkerManager } from "./MarkerManager";
import { useMe } from "src/features/user/useMe";
import { useSaveSteps } from "src/features/steps/useSaveSteps";
import { useNearbySpots } from "src/features/markers/useNearbySpots";
import ChargePopup from "src/components/popup/ChargePopup";
import ConfirmModal from "../../components/modal/confirm/ConfirmModal";

export default function KaKaoMap({
  appKey,
}: {
  appKey: string;
  preferredThemes?: string[];
}) {
  const ready = useKakaoLoader(appKey, []);
  const { lat, lng, accuracy, loading, error } = useGeolocation(); // ↔ 위치 권한 허용 시 lat/lng 세팅됨
  const mapRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<any>(null);
  const bubbleRef = useRef<any>(null);
  const shadowRef = useRef<any>(null);
  const [mapReady, setMapReady] = useState(false);

  const doing = useSelector(selectDoing);
  const dispatch = useDispatch();
  const { me } = useMe();
  const navigate = useNavigate();

  const center = useMemo(
    () => (lat != null && lng != null ? { lat, lng } : undefined),
    [lat, lng]
  );

  // 진행중 챌린지 → 근접 감지용 축약 데이터
  const ongoingLite = useMemo(
    () =>
      (doing ?? []).map((d: any) => ({
        id: d.id,
        name: d.name ?? d.title,
        latitude: d.latitude ?? d.lat,
        longitude: d.longitude ?? d.lng,
      })),
    [doing]
  );

  // 근접 감지(120m, 3분 쿨다운)
  const {
    open: certOpen,
    target: certTarget,
    distance: certDistance,
    dismiss: dismissCert,
  } = useProximityCert(ongoingLite, lat, lng, {
    thresholdMeters: 120,
    cooldownMs: 180_000,
  });

  // 걸음수/거리 통계
  const { steps } = usePathStats(lat, lng, accuracy);

  // 걸음수 저장(배치)
  useSaveSteps(steps, {
    minDelta: 50,
    minIntervalMs: 60_000,
    onSaved: () => window.dispatchEvent(new CustomEvent("me:refresh")),
    enabled: true,
  });

  // 내 위치 기준 주변 스팟 조회(반경 km 단위)
  const { markers } = useNearbySpots(
    center?.lat,
    center?.lng,
    3, // km
    {
      onlyOngoingChallenge: true,
      mockOnly: false,
    }
  );

  const managerRef = useRef<MarkerManager | null>(null);

  useEffect(() => {
    if (!ready || !elRef.current) return;
    if (mapReady) return;
    if (center == null) return; // 위치 권한 전이면 대기 (배너 안내)

    kakao.maps.load(() => {
      const initCenter = new kakao.maps.LatLng(
        Number(center.lat),
        Number(center.lng)
      );
      const map = new kakao.maps.Map(elRef.current!, {
        center: initCenter,
        level: 4,
      });
      mapRef.current = map;

      managerRef.current = new MarkerManager(map, {
        onClick: (item) => {
          setSelectedItem({
            id: String(item.id),
            level: item.level,
            lat: Number(item.lat),
            lng: Number(item.lng),
          });
          setCameraOpen(true);
        },
      });

      setMapReady(true);
      setTimeout(() => map.relayout(), 0);
    });
  }, [ready, center, mapReady]);

  // 마커 동기화(내 위치 중심 반경 3km)
  useEffect(() => {
    if (!mapReady || !managerRef.current) return;
    if (!center) return;
    managerRef.current.sync(markers, center, 3_000);
  }, [mapReady, markers, center]);

  // 🔄 캐릭터 + 말풍선 + 그림자 오버레이 (내 위치 따라 이동)
  useEffect(() => {
    if (!mapReady || !mapRef.current || !center) return;

    const map = mapRef.current;
    const pos = new kakao.maps.LatLng(Number(center.lat), Number(center.lng));

    // 1) 캐릭터
    if (!avatarRef.current) {
      const img = document.createElement("img");
      img.src = characterUrl;
      img.width = 72;
      img.height = 72;
      img.style.pointerEvents = "none";
      img.style.transform = "translateY(35px)";
      avatarRef.current = new kakao.maps.CustomOverlay({
        position: pos,
        content: img,
        xAnchor: 0.5,
        yAnchor: 0.86,
        zIndex: 5,
      });
      avatarRef.current.setMap(map);
    } else {
      avatarRef.current.setPosition(pos);
    }

    // 2) 말풍선
    if (!bubbleRef.current) {
      const wrap = document.createElement("div");
      wrap.style.position = "relative";
      wrap.style.display = "inline-block";
      wrap.style.padding = "6px 12px";
      wrap.style.borderRadius = "12px";
      wrap.style.color = T.ColorBase0;
      wrap.style.background = T.ColorPrimary400;
      wrap.style.fontSize = "18px";
      wrap.style.fontWeight = "700";
      wrap.style.boxShadow = "0 6px 16px rgba(0,0,0,.18)";
      wrap.style.pointerEvents = "auto";
      wrap.style.cursor = "pointer";
      wrap.textContent = "스팟 추가";

      const onAddSpotClick = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        navigate("/write");
      };
      wrap.addEventListener("click", onAddSpotClick);

      const tail = document.createElement("i");
      Object.assign(tail.style, {
        position: "absolute",
        left: "50%",
        bottom: "-6px",
        width: "12px",
        height: "12px",
        background: T.ColorPrimary400,
        transform: "translateX(-50%) rotate(45deg)",
        borderRadius: "2px",
        boxShadow: "0 2px 6px rgba(0,0,0,.12)",
      });
      wrap.appendChild(tail);

      bubbleRef.current = new kakao.maps.CustomOverlay({
        position: pos,
        content: wrap,
        xAnchor: 0.5,
        yAnchor: 2.3,
        zIndex: 6,
      });
      bubbleRef.current.setMap(map);
    } else {
      bubbleRef.current.setPosition(pos);
    }

    // 3) 발밑 그림자
    if (!shadowRef.current) {
      const shadow = document.createElement("div");
      Object.assign(shadow.style, {
        width: "160px",
        height: "56px",
        borderRadius: "50%",
        background:
          "radial-gradient(50% 65% at 50% 50%, rgba(255,139,76,.45) 45%, rgba(255,139,76,.30) 40%, rgba(255,139,76,0) 75%)",
        transform: "translateY(10px)",
        pointerEvents: "none",
      });
      shadowRef.current = new kakao.maps.CustomOverlay({
        position: pos,
        content: shadow,
        xAnchor: 0.5,
        yAnchor: 0.06,
        zIndex: 1,
      });
      shadowRef.current.setMap(map);
    } else {
      shadowRef.current.setPosition(pos);
    }

    // 부드럽게 현재 위치로
    map.panTo(pos);
  }, [mapReady, center?.lat, center?.lng, T.ColorBase0, T.ColorPrimary400]);

  // 창 리사이즈 시 재레이아웃
  useEffect(() => {
    const onResize = () => mapRef.current?.relayout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // === UI & 상태 ===
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    level: "SPOT" | "POST" | "CHALLENGE";
    lat?: number;
    lng?: number;
  } | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [chargeOpen, setChargeOpen] = useState(false);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <MapHud
        stepsText={`${steps.toLocaleString()} 걸음`}
        user={{
          rankLabel: me?.gradeName ?? "발바닥",
          name: me?.nickname || me?.name || "게스트",
          avatarUrl: me?.avatarUrl || characterUrl,
        }}
        onProfileClick={() => setProfileOpen(true)}
      />

      <ProfileSheet
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={{
          rankLabel: me?.gradeName ?? "발바닥",
          name: me?.nickname || me?.name || "게스트",
          avatarUrl: me?.avatarUrl || characterUrl,
        }}
        todaySteps={me?.totalSteps ?? 0}
        hanlabong={me?.hallabong ?? 0}
        onChargeClick={() => setChargeOpen(true)}
      />

      <ConfirmModal
        open={certOpen}
        title="챌린지를 진행하시기 전에 확인해주세요"
        subtitle={
          certTarget
            ? `${certTarget.name ?? "현재 챌린지"}까지 약 ${Math.max(
                1,
                Math.round(certDistance ?? 0)
              )}m 거리에요. 인증을 진행하시겠어요?`
            : undefined
        }
        confirmText="인증하기"
        cancelText="나중에"
        onCancel={dismissCert}
        onConfirm={() => {
          if (certTarget) {
            setSelectedItem({ id: String(certTarget.id), level: "CHALLENGE" });
            setCameraOpen(true);
          }
          dismissCert();
        }}
      />

      <ChargePopup
        open={chargeOpen}
        onClose={() => setChargeOpen(false)}
        onSubmit={() => {
          setChargeOpen(false);
          window.dispatchEvent(new CustomEvent("me:refresh"));
        }}
      />

      <CameraSheet
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        challengeId={
          selectedItem?.level === "CHALLENGE" ? selectedItem?.id : undefined
        }
        lat={lat ?? undefined}
        lng={lng ?? undefined}
        targetLat={selectedItem?.lat}
        targetLng={selectedItem?.lng}
        onConfirm={() => {
          if (selectedItem?.level === "CHALLENGE") {
            dispatch(completeChallenge(String(selectedItem.id)));
            window.dispatchEvent(new CustomEvent("me:refresh"));
            window.dispatchEvent(new CustomEvent("challenge:refresh"));
          }
          setCameraOpen(false);
        }}
      />

      {/* 카카오맵 컨테이너 */}
      <div ref={elRef} style={{ width: "100%", height: "100%" }} />

      {/* 상태 배너 */}
      {loading && <Banner text="현재 위치 확인 중…" />}
      {error && <Banner text={`위치 권한이 필요해: ${error}`} />}
      {!loading && !error && !center && (
        <Banner text="위치 권한을 허용하면 내 위치가 표시돼!" />
      )}
    </div>
  );
}

function Banner({ text }: { text: string }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 12,
        right: 12,
        bottom: 90,
        padding: "10px 12px",
        background: "rgba(0,0,0,0.55)",
        color: "#fff",
        borderRadius: 10,
        fontSize: 13,
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
}
