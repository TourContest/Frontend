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

  const { lat, lng } = useGeolocation();

  const appKey = import.meta.env.VITE_KAKAO_JS_KEY as string;
  const readyKakao = useKakaoLoader(appKey, []);
  const mapRef = useRef<any>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  const center = useMemo(
    () =>
      item
        ? { lat: Number(item.latitude), lng: Number(item.longitude) }
        : { lat: 33.24083, lng: 126.605983 },
    [item]
  );

  useEffect(() => {
    if (!readyKakao || !mapElRef.current || !item) {
      return;
    }

    console.log(
      "map container size:",
      mapElRef.current.offsetWidth,
      mapElRef.current.offsetHeight
    );
    // 맵 컨테이너가 화면에 보일 때까지 기다립니다.
    const mapContainer = mapElRef.current;
    if (mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
      console.warn("지도 컨테이너가 숨겨져 있어 렌더링을 지연합니다.");

      // 다음 프레임에서 재시도 (가장 간단한 방법)
      const timeoutId = setTimeout(() => {
        // 컴포넌트가 언마운트되면 실행되지 않도록 확인
        if (mapElRef.current) {
          // 상태를 업데이트하여 useEffect를 재실행
          // (더 복잡한 해결책이지만 안정적)
          // 여기서는 간단하게 setTimeout으로 해결 시도
          // setSomeState(true)를 통해 리렌더링 유발 가능
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    }

    // 맵 생성
    const map = new kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(center.lat, center.lng),
      level: 8,
    });
    mapRef.current = map;

    // 마커 생성
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

    // 지도가 보이지 않을 때 relayout 호출
    requestAnimationFrame(() => {
      map.relayout();
      map.setCenter(markerPosition);

      setTimeout(() => {
        map.relayout();
        map.setCenter(markerPosition);
      }, 200);
    });
  }, [readyKakao, item, center.lat, center.lng]);

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

        <div style={{ marginTop: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <img
              src={challengePosIconUrl}
              alt="위치 아이콘"
              width={18}
              height={18}
              style={{ display: "inline-block" }}
            />
            <span style={{ fontWeight: 700, fontSize: 18 }}>챌린지 위치</span>
          </div>

          <div
            ref={mapElRef}
            style={{
              width: "100%",
              height: "100%",
              minHeight: 180,
              borderRadius: 16,
              overflow: "hidden",
            }}
          />
        </div>
      </div>

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
