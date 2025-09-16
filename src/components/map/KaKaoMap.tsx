import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectDoing } from "src/redux/challenge/selectors";
import { useProximityCert } from "src/features/challenges/useProximityCert";
import { completeChallenge } from "src/redux/challenge/actions"; // Correct named import
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
import { challengeApi } from "src/api/challengeApi";
import ChargePopup from "src/components/popup/ChargePopup";
import ConfirmModal from "../../components/modal/confirm/ConfirmModal";

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371,
    toRad = (v: number) => (v * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1),
    dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export default function KaKaoMap({
  appKey,
  preferredThemes,
}: {
  appKey: string;
  preferredThemes?: string[];
}) {
  const ready = useKakaoLoader(appKey, []);
  const { lat, lng, accuracy, loading, error } = useGeolocation();
  const mapRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<any>(null);
  const bubbleRef = useRef<any>(null);
  const shadowRef = useRef<any>(null);
  const initedRef = useRef(false);
  const doing = useSelector(selectDoing);
  const dispatch = useDispatch();
  const { me } = useMe();

  const { km, steps } = usePathStats(lat, lng, accuracy);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    level: "spot" | "challenge";
  } | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [chargeOpen, setChargeOpen] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const center = useMemo(
    () => (lat != null && lng != null ? { lat, lng } : undefined),
    [lat, lng]
  );
  const JEJU_CENTER = { lat: 33.24083, lng: 126.605983 };

  const queryCenter = useMemo(() => {
    if (lat != null && lng != null) {
      const d = haversineKm(lat, lng, JEJU_CENTER.lat, JEJU_CENTER.lng);
      return d > 200 ? JEJU_CENTER : { lat, lng };
    }
    return JEJU_CENTER;
  }, [lat, lng]);

  // 진행중 챌린지들 -> 근접 감지에 필요한 최소 형태로 매핑시키기
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

  // 근접 감지(120m, 3분마다 쿨다운)
  const {
    open: certOpen,
    target: certTarget,
    distance: certDistance,
    dismiss: dismissCert,
  } = useProximityCert(ongoingLite, lat, lng, {
    thresholdMeters: 120,
    cooldownMs: 180_000,
  });
  // 나중에는 아래 코드로! 현재는 제주도를 기준으로 위치 잡으려고 함.
  // const { markers } = useMapMarkers(
  //   lat ?? undefined,
  //   lng ?? undefined,
  //   3, // radiusKm
  //   preferredThemes ?? [] // 테마필터(없으면 빈배열)
  // );

  // useEffect(() => {
  //   if (
  //     !ready ||
  //     !elRef.current ||
  //     lat == null ||
  //     lng == null ||
  //     initedRef.current
  //   )
  //     return;

  //   const center = new kakao.maps.LatLng(Number(lat), Number(lng));
  //   const map = new kakao.maps.Map(elRef.current, { center, level: 4 });
  //   mapRef.current = map;
  //   initedRef.current = true;

  //   setTimeout(() => map.relayout(), 0);
  //   // 제스처/모바일 가속 등 옵션은 필요시에 조정
  // }, [ready, lat, lng]);

  // useEffect(() => {
  //   if (!mapRef.current) return;
  //   if (!managerRef.current) {
  //     managerRef.current = new MarkerManager(mapRef.current, {
  //       onClick: (item) => {
  //         setSelectedItem({ id: item.id, level: item.level });
  //         setCameraOpen(true);
  //       },
  //     });
  //   }
  //   managerRef.current.sync(
  //     markers,
  //     center ? { lat: Number(center.lat), lng: Number(center.lng) } : undefined,
  //     // 3000
  //   ); // 반경 3km
  // }, [markers, center?.lat, center?.lng]);

  useSaveSteps(steps, {
    minDelta: 50,
    minIntervalMs: 60_000,
    onSaved: () => {
      window.dispatchEvent(new CustomEvent("me:refresh"));
    },
    enabled: true,
  });

  const { markers } = useNearbySpots(queryCenter.lat, queryCenter.lng, 120, {
    onlyOngoingChallenge: true,
  }); // 제주 전역 정도
  const managerRef = useRef<MarkerManager | null>(null);

  useEffect(() => {
    if (!ready || !elRef.current || mapReady) return;

    // 카카오 SDK 로딩 완료 후 보장
    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(
        Number(queryCenter.lat),
        Number(queryCenter.lng)
      );
      const map = new kakao.maps.Map(elRef.current!, { center, level: 8 }); // 제주 한눈에
      mapRef.current = map;

      // MarkerManager도 여기서 1회 생성
      managerRef.current = new MarkerManager(map, {
        onClick: (item) => {
          setSelectedItem({ id: item.id, level: item.level });
          setCameraOpen(true);
        },
      });

      setMapReady(true);
      setTimeout(() => map.relayout(), 0);
    });
  }, [ready, queryCenter.lat, queryCenter.lng, mapReady]);

  // useEffect(() => {
  //   if (!mapRef.current) return;
  //   if (!managerRef.current) {
  //     managerRef.current = new MarkerManager(mapRef.current, {
  //       onClick: (item) => {
  //         setSelectedItem({ id: item.id, level: item.level });
  //         setCameraOpen(true);
  //       },
  //     });
  //   }
  //   managerRef.current.sync(markers, queryCenter, 120_000); // 120km 기준 표시
  // }, [markers, queryCenter.lat, queryCenter.lng]);
  useEffect(() => {
    if (!mapReady || !managerRef.current) return;
    managerRef.current.sync(markers, queryCenter, 120_000); // 120km
  }, [mapReady, markers, queryCenter.lat, queryCenter.lng]);

  // 🔄 캐릭터 + 말풍선 + 그림자 오버레이 (기존 이펙트 전부 교체)
  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const map = mapRef.current;
    const pos = new kakao.maps.LatLng(
      Number(queryCenter.lat),
      Number(queryCenter.lng)
    );

    // 1) 캐릭터
    if (!avatarRef.current) {
      const img = document.createElement("img");
      img.src = characterUrl;
      img.width = 72;
      img.height = 72;
      img.style.pointerEvents = "none";
      img.style.transform = "translateY(35px)"; // 발 위치 보정

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
      wrap.style.pointerEvents = "none";
      wrap.textContent = "스팟 추가";

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
        yAnchor: 2.3, // 꼬리 끝이 기준
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
          "radial-gradient(50% 65% at 50% 50%," +
          "rgba(255,139,76,.45) 45%," +
          "rgba(255,139,76,.30) 40%," +
          "rgba(255,139,76,0) 75%)",
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

    // ⛳️ 내 실제 좌표가 있고 '제주에서 120km 이내'일 때만 사용자 위치로 살짝 따라가게
    // (그 외엔 제주 중앙에 고정)
    const JEJU = { lat: 33.24083, lng: 126.605983 };
    if (lat != null && lng != null) {
      const distKm = haversineKm(lat, lng, JEJU.lat, JEJU.lng);
      if (distKm < 120) {
        map.panTo(new kakao.maps.LatLng(Number(lat), Number(lng)));
      }
    }
    // deps: queryCenter가 바뀌면(제주<->내위치) 오버레이가 같이 이동
  }, [
    mapReady,
    queryCenter.lat,
    queryCenter.lng,
    lat,
    lng,
    T.ColorBase0,
    T.ColorPrimary400,
  ]);

  //캐릭터 + 말풍선 + 그림자 오버레이 생성 및 업데이트 코드!
  // useEffect(() => {
  //   if (!mapRef.current || lat == null || lng == null) return;
  //   const map = mapRef.current;
  //   const pos = new kakao.maps.LatLng(lat, lng);

  //   // 1) 캐릭터 마커
  //   if (!avatarRef.current) {
  //     const img = document.createElement("img");
  //     img.src = characterUrl;
  //     img.width = 72;
  //     img.height = 72;
  //     img.style.pointerEvents = "none";
  //     img.style.transform = "translateY(35px)"; // 발 위치 보정

  //     avatarRef.current = new kakao.maps.CustomOverlay({
  //       position: pos,
  //       content: img,
  //       xAnchor: 0.5, // 중앙 정렬
  //       yAnchor: 0.86, // 하단 쪽 앵커 (발 위치)
  //       zIndex: 5,
  //     });
  //     avatarRef.current.setMap(map);
  //   } else {
  //     avatarRef.current.setPosition(pos);
  //   }

  //   // 2) 말풍선 (스팟추가)
  //   if (!bubbleRef.current) {
  //     const wrap = document.createElement("div");
  //     wrap.style.position = "relative";
  //     wrap.style.display = "inline-block";
  //     wrap.style.padding = "6px 12px";
  //     wrap.style.borderRadius = "12px";
  //     wrap.style.color = T.ColorBase0;
  //     wrap.style.background = T.ColorPrimary400; // 토큰 색
  //     wrap.style.fontSize = "18px";
  //     wrap.style.fontWeight = "700";
  //     wrap.style.boxShadow = "0 6px 16px rgba(0,0,0,.18)";
  //     wrap.style.pointerEvents = "none";
  //     wrap.textContent = "스팟 추가";

  //     // 꼬리(아래로 뾰족)
  //     const tail = document.createElement("i");
  //     Object.assign(tail.style, {
  //       position: "absolute",
  //       left: "50%",
  //       bottom: "-6px",
  //       width: "12px",
  //       height: "12px",
  //       background: T.ColorPrimary400,
  //       transform: "translateX(-50%) rotate(45deg)",
  //       borderRadius: "2px",
  //       boxShadow: "0 2px 6px rgba(0,0,0,.12)",
  //     });
  //     wrap.appendChild(tail);

  //     bubbleRef.current = new kakao.maps.CustomOverlay({
  //       position: pos,
  //       content: wrap,
  //       xAnchor: 0.5,
  //       // 꼬리 끝이 기준이 되도록 1 근처로 고정 (맵/디바이스에 따라 약간 미세 조정)
  //       yAnchor: 2.3,
  //       zIndex: 6,
  //     });
  //     bubbleRef.current.setMap(map);
  //   } else {
  //     bubbleRef.current.setPosition(pos);
  //   }

  //   // 3) 발밑 그림자
  //   if (!shadowRef.current) {
  //     const shadow = document.createElement("div");
  //     Object.assign(shadow.style, {
  //       width: "160px",
  //       height: "56px",
  //       borderRadius: "50%",
  //       // 타원형 라디얼 그라데이션: 중앙 진하게 → 가장자리 투명
  //       background:
  //         "radial-gradient(50% 65% at 50% 50%," +
  //         "rgba(255,139,76,.45) 45%," +
  //         "rgba(255,139,76,.30) 40%," +
  //         "rgba(255,139,76,0) 75%)",
  //       transform: "translateY(10px)", // 발 아래로 살짝 내림
  //       pointerEvents: "none",
  //     });
  //     shadowRef.current = new kakao.maps.CustomOverlay({
  //       position: pos,
  //       content: shadow,
  //       xAnchor: 0.5,
  //       yAnchor: 0.06, // 중심보다 약간 위쪽을 기준점으로 (타원 상단이 좌표에 가깝게)
  //       zIndex: 1,
  //     });
  //     shadowRef.current.setMap(map);
  //   } else {
  //     shadowRef.current.setPosition(pos);
  //   }

  //   const JEJU = { lat: 33.24083, lng: 126.605983 };
  //   const distKm = haversineKm(lat, lng, JEJU.lat, JEJU.lng);
  //   if (distKm < 120) {
  //     map.panTo(pos);
  //   }

  //   // map.panTo(pos);
  // }, [lat, lng, accuracy]);

  // 3) 컨테이너 리사이즈/탭 전환 등으로 크기 바뀌면 재배치
  useEffect(() => {
    const onResize = () => mapRef.current?.relayout();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <MapHud
        kmText={`${km.toFixed(2)} km`}
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
        onEditName={() => {}}
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
          // 인증(카메라) 진입
          if (certTarget) {
            setSelectedItem({ id: String(certTarget.id), level: "challenge" });
            setCameraOpen(true);
          }
          dismissCert();
        }}
      />

      <ChargePopup
        open={chargeOpen}
        onClose={() => setChargeOpen(false)}
        onSubmit={() => {
          // TODO: 충전/결제 API 연동 지점
          setChargeOpen(false);
          // 충전 후 내 프로필(한라봉) 최신화
          window.dispatchEvent(new CustomEvent("me:refresh"));
        }}
      />

      <CameraSheet
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onConfirm={async (photoDataUrl) => {
          try {
            // 챌린지 마커일 때만 인증 완료 호출
            if (
              selectedItem?.level === "challenge" &&
              lat != null &&
              lng != null
            ) {
              await challengeApi.complete(
                selectedItem.id, // path param
                Number(lat),
                Number(lng),
                photoDataUrl // 임시: dataURL을 proofUrl로 전송
              );

              // 1) 진행중 → 완료로 로컬 상태 이동
              dispatch(completeChallenge(selectedItem.id));

              // 2) 내 재화/포인트 최신화(서버 응답에 myHallabongAfter 있으므로 프로필 리페치)
              window.dispatchEvent(new CustomEvent("me:refresh"));

              // 3) (선택) 완료 탭도 서버 싱크가 필요하면 훅/사가에서 듣고 재로딩 or 아래처럼 이벤트
              window.dispatchEvent(new CustomEvent("challenge:refresh"));
            }
          } catch (e) {
            console.error("complete failed", e);
            // TODO: 실패 토스트/모달 (필요시)
          } finally {
            setCameraOpen(false);
          }
        }}
      />
      <div ref={elRef} style={{ width: "100%", height: "100%" }} />
      {loading && <Banner text="현재 위치 확인 중…" />}
      {error && <Banner text={`위치 권한이 필요해요: ${error}`} />}
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
