import { useEffect, useRef, useState } from "react";
import { completeChallenge } from "src/redux/challenge/actions";
import { useDispatch } from "react-redux";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import ConfirmModal from "src/components/modal/confirm/ConfirmModal";
import { challengeApi } from "src/api/challengeApi";
import * as S from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (photoDataUrl: string) => void;
  challengeId?: string | number;
  lat?: number | null; // 사용자 현재 위치
  lng?: number | null;
  targetLat?: number; // 폴백: 마커 좌표
  targetLng?: number;
};

export default function CameraSheet({
  open,
  onClose,
  onConfirm,
  challengeId,
  lat,
  lng,
}: Props) {
  const isNative = Capacitor.isNativePlatform();
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [submitting, setSubmitting] = useState(false);

  // 웹 카메라 오픈/클로즈
  useEffect(() => {
    const start = async () => {
      if (!open || isNative) return;
      try {
        const st = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing },
          audio: false,
        });
        streamRef.current = st;
        if (videoRef.current) {
          videoRef.current.srcObject = st;
          await videoRef.current.play();
        }
      } catch (e) {
        console.error(e);
      }
    };
    const stop = () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
    open ? start() : stop();
    return stop;
  }, [open, facing, isNative]);

  const handleShutter = async () => {
    try {
      if (isNative) {
        const shot = await Camera.getPhoto({
          source: CameraSource.Camera,
          resultType: CameraResultType.DataUrl,
          quality: 85,
          saveToGallery: false,
        });
        setPhoto(shot.dataUrl!);
        setConfirmOpen(true);
        return;
      }

      // 웹 캡쳐
      const video = videoRef.current!;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setPhoto(dataUrl);
      setConfirmOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleConfirm = async () => {
    if (!photo) return;

    if (challengeId != null && lat != null && lng != null) {
      try {
        if (submitting) return;
        setSubmitting(true);
        await challengeApi.complete(
          challengeId,
          Number(lat),
          Number(lng),
          photo // dataURL → 서버가 허용하지 않으면 이후 업로더 붙여서 URL로 교체
        );
      } catch (e) {
        console.error("challenge complete failed", e);
      } finally {
        setSubmitting(false);
      }
    } else {
      console.warn(
        "complete 호출 누락: challengeId/lat/lng 중 일부가 없음",
        lat,
        lng,
        challengeId
      );
    }

    dispatch(completeChallenge(String(challengeId), new Date().toISOString()));

    onConfirm(photo); // 부모 후처리(상태 이동/탭 전환)
    setConfirmOpen(false);
    onClose();
  };

  if (!open) return null;

  // 프리뷰를 최하단에, 바/버튼은 오버레이로
  return open ? (
    <S.Wrap>
      <S.Preview>
        {isNative ? (
          <S.NativePlaceholder />
        ) : (
          <S.Video ref={videoRef} muted playsInline />
        )}
      </S.Preview>

      <S.TopBar>
        <S.BackBtn onClick={onClose} aria-label="뒤로가기" />
        <S.Title>사진 찍기</S.Title>
        <div />
      </S.TopBar>

      <S.BottomBar>
        <S.RotateBtn
          onClick={() =>
            setFacing((v) => (v === "user" ? "environment" : "user"))
          }
        />
        <S.Shutter onClick={handleShutter} />
        <S.NextBtn disabled={!photo} onClick={() => setConfirmOpen(true)}>
          다음
        </S.NextBtn>
      </S.BottomBar>

      <ConfirmModal
        open={confirmOpen}
        title="챌린지 인증 완료!"
        subtitle="인증한 챌린지 확인하러 가시겠어요?"
        confirmText={submitting ? "처리 중..." : "확인"}
        cancelText="취소"
        onCancel={() => {
          setConfirmOpen(false);
          // 재촬영 흐름 유지 시 원하면 setPhoto(null);
        }}
        onConfirm={handleConfirm}
      />
    </S.Wrap>
  ) : null;
}
