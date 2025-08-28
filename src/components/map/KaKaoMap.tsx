import { useEffect, useRef } from "react";
import { useKakaoLoader } from "src/features/main/useKakaoLoader";
import { useGeolocation } from "src/features/main/useGeolocation";
import { usePathStats } from "src/features/main/usePathStats";
import MapHud from "./MapHud";
import * as T from "src/styles/tokens.js";
import characterUrl from "src/assets/BlackPig.svg?url";

type Props = { appKey: string };

export default function KaKaoMap({ appKey }: Props) {
  const ready = useKakaoLoader(appKey, []);
  const { lat, lng, accuracy, loading, error } = useGeolocation();
  const mapRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<any>(null);
  const bubbleRef = useRef<any>(null);
  const shadowRef = useRef<any>(null);
  const initedRef = useRef(false);
  const { km, steps, formatKm, formatSteps } = usePathStats(lat, lng, accuracy);

  useEffect(() => {
    if (
      !ready ||
      !elRef.current ||
      lat == null ||
      lng == null ||
      initedRef.current
    )
      return;

    const center = new kakao.maps.LatLng(Number(lat), Number(lng));
    const map = new kakao.maps.Map(elRef.current, { center, level: 4 });
    mapRef.current = map;
    initedRef.current = true;

    setTimeout(() => map.relayout(), 0);
    // 제스처/모바일 가속 등 옵션은 필요시에 조정
  }, [ready, lat, lng]);

  //   // 캐릭터 + 말풍선 + 그림자 오버레이 생성 및 업데이트 코드!
  useEffect(() => {
    if (!mapRef.current || lat == null || lng == null) return;
    const map = mapRef.current;
    const pos = new kakao.maps.LatLng(lat, lng);

    // 1) 캐릭터 마커
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
        xAnchor: 0.5, // 중앙 정렬
        yAnchor: 0.86, // 하단 쪽 앵커 (발 위치)
        zIndex: 5,
      });
      avatarRef.current.setMap(map);
    } else {
      avatarRef.current.setPosition(pos);
    }

    // 2) 말풍선 (스팟추가)
    if (!bubbleRef.current) {
      const wrap = document.createElement("div");
      wrap.style.position = "relative";
      wrap.style.display = "inline-block";
      wrap.style.padding = "6px 12px";
      wrap.style.borderRadius = "12px";
      wrap.style.color = T.ColorBase0;
      wrap.style.background = T.ColorPrimary400; // 토큰 색
      wrap.style.fontSize = "18px";
      wrap.style.fontWeight = "700";
      wrap.style.boxShadow = "0 6px 16px rgba(0,0,0,.18)";
      wrap.style.pointerEvents = "none";
      wrap.textContent = "스팟 추가";

      // 꼬리(아래로 뾰족)
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
        // 꼬리 끝이 기준이 되도록 1 근처로 고정 (맵/디바이스에 따라 약간 미세 조정)
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
        // 타원형 라디얼 그라데이션: 중앙 진하게 → 가장자리 투명
        background:
          "radial-gradient(50% 65% at 50% 50%," +
          "rgba(255,139,76,.45) 45%," +
          "rgba(255,139,76,.30) 40%," +
          "rgba(255,139,76,0) 75%)",
        transform: "translateY(10px)", // 발 아래로 살짝 내림
        pointerEvents: "none",
      });
      shadowRef.current = new kakao.maps.CustomOverlay({
        position: pos,
        content: shadow,
        xAnchor: 0.5,
        yAnchor: 0.06, // 중심보다 약간 위쪽을 기준점으로 (타원 상단이 좌표에 가깝게)
        zIndex: 1,
      });
      shadowRef.current.setMap(map);
    } else {
      shadowRef.current.setPosition(pos);
    }

    map.panTo(pos);
  }, [lat, lng, accuracy]);

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
          level: 99,
          name: "닉네임은8자까지",
          subtitle: "친밀도 스택 / 00",
          avatarUrl: characterUrl,
        }}
        onProfileClick={() => {
          // TODO: 프로필 화면 이동
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
