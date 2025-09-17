import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BackHeader from "src/components/commons/Header/BackHeader";
import ConfirmModal from "src/components/modal/confirm/ConfirmModal";
import { useKakaoLoader } from "src/features/main/useKakaoLoader";
import { useGeolocation } from "src/features/main/useGeolocation";
import { selectReady } from "src/redux/challenge/selectors";
import { startChallenge as startChallengeAction } from "src/redux/challenge/actions";
import { challengeApi } from "src/api/challengeApi";
import challengePosIconUrl from "src/assets/challengePos.svg?url";
import challengeMarkerUrl from "src/assets/challenge.svg?url";
import * as T from "src/styles/tokens.js";

type ReadyItem = {
  id: string | number;
  name?: string;
  title?: string;
  description?: string | null;
  latitude: number;
  longitude: number;
  img1?: string;
  imageUrl?: string;
};

export default function ChallengeUpcomingDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id = "" } = useParams();
  const { state } = useLocation() as { state?: { item?: ReadyItem } };

  const readyFromStore = useSelector(selectReady);
  const item: ReadyItem | undefined = useMemo(() => {
    if (state?.item) return state.item;
    const found = readyFromStore.find((r: any) => String(r.id) === String(id));
    return found as ReadyItem | undefined;
  }, [state?.item, readyFromStore, id]);

  // 현재 위치 (시작 API에 필요)
  const { lat, lng } = useGeolocation();

  // kakao map
  const appKey = import.meta.env.VITE_KAKAO_JS_KEY as string;
  // 주소 역지오코딩을 위해 services 라이브러리 로드
  const readyKakao = useKakaoLoader(appKey, ["services"]);
  const mapRef = useRef<any>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  const center = useMemo(
    () =>
      item
        ? { lat: Number(item.latitude), lng: Number(item.longitude) }
        : { lat: 33.24083, lng: 126.605983 }, // fallback 제주
    [item]
  );

  // 역지오코딩 주소 상태
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    if (!readyKakao || !mapElRef.current || !item) return;

    const map = new kakao.maps.Map(mapElRef.current, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 8,
    });
    mapRef.current = map;

    // 마커 이미지: challenge.svg
    const image = new kakao.maps.MarkerImage(
      challengeMarkerUrl,
      new kakao.maps.Size(36, 44),
      { offset: new kakao.maps.Point(18, 42) }
    );

    const markerPosition = new kakao.maps.LatLng(center.lat, center.lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image,
      zIndex: 3,
    });
    marker.setMap(map);
    markerRef.current = marker;

    // 지도가 보이지 않는 경우 대비: 다음 프레임에서 relayout + setCenter
    requestAnimationFrame(() => {
      map.relayout();
      map.setCenter(markerPosition);
    });

    // 위/경도로 주소 생성 (coord2Address는 lng, lat 순서!)
    const services = (kakao.maps as any).services;
    if (services && typeof services.Geocoder === "function") {
      const geocoder = new services.Geocoder();
      // coord2Address는 (lng, lat) 순서!
      geocoder.coord2Address(
        center.lng,
        center.lat,
        (result: any, status: kakao.maps.services.Status) => {
          if (status === kakao.maps.services.Status.OK && result?.length) {
            const addr =
              result[0]?.road_address?.address_name ||
              result[0]?.address?.address_name;
            setAddress(addr || "");
          } else {
            setAddress("");
          }
        }
      );
    } else {
      // services가 없으면 주소는 비워두고 좌표만 보여줌 (에러 방지)
      console.warn("[Kakao] services 라이브러리 로드 실패 - 주소 표시 불가");
      setAddress("");
    }
  }, [readyKakao, item, center.lat, center.lng]);

  // 시작 모달
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleStart = async () => {
    try {
      if (!item) return;
      const myLat = lat ?? 33.24083;
      const myLng = lng ?? 126.605983;

      await challengeApi.start(String(item.id), Number(myLat), Number(myLng));
      challengeApi.refreshUpcoming().catch(() => {});
      dispatch(startChallengeAction(String(item.id)));
      navigate("/challenge?tab=doing", { replace: true });
    } catch (e) {
      console.error(e);
    } finally {
      setConfirmOpen(false);
    }
  };

  if (!item) {
    return (
      <>
        <BackHeader title="진행 전" />
        <div style={{ padding: 20 }}>챌린지 정보를 찾을 수 없어요.</div>
      </>
    );
  }

  const title = item.name || item.title || "챌린지";
  const desc = item.description;
  const image = item.img1 || item.imageUrl;

  return (
    <>
      <BackHeader title="진행 전" />

      <div style={{ padding: "16px 16px 110px" }}>
        {/* 타이틀/설명 */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: "28px" }}>
            {title}
          </div>
          <div
            style={{
              marginTop: 6,
              fontSize: 14,
              color: "#777",
              lineHeight: "20px",
            }}
          >
            {desc}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 12,
          }}
        >
          {[image].map((src, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                paddingTop: "66%",
                borderRadius: 12,
                background: src
                  ? `url(${src}) center/cover no-repeat`
                  : "repeating-conic-gradient(#eee 0% 25%, #f6f6f6 0% 50%)",
                backgroundSize: src ? "cover" : "20px 20px",
              }}
            />
          ))}
        </div>

        {/* 위치 블록 */}
        <div style={{ marginTop: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {/* ⬇️ challengePos 아이콘 */}
            <img
              src={challengePosIconUrl}
              alt="위치 아이콘"
              width={18}
              height={18}
              style={{ display: "inline-block" }}
            />
            <span style={{ fontWeight: 700, fontSize: 18 }}>챌린지 위치</span>
          </div>

          {/* 미니 카카오맵 */}
          <div
            ref={mapElRef}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 16,
              overflow: "hidden",
              // 부모 레이아웃 영향 줄이기 위한 최소 보정
            }}
          />
        </div>
      </div>

      {/* 하단 고정 시작하기 버튼 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "12px 16px 20px",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, #fff 28px)",
        }}
      >
        <button
          onClick={() => setConfirmOpen(true)}
          style={{
            width: "100%",
            height: 52,
            border: 0,
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 700,
            color: "#fff",
            background: T.ColorPrimary400,
            boxShadow: "0 6px 16px rgba(255,139,76,.35)",
          }}
        >
          시작하기
        </button>
      </div>

      {/* 시작 확인 모달 */}
      <ConfirmModal
        open={confirmOpen}
        title={"챌린지를 진행하시기 전에 \n확인해주세요."}
        subtitle="지금 시작하시겠어요?"
        cancelText="취소"
        confirmText="확인"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleStart}
      />
    </>
  );
}
