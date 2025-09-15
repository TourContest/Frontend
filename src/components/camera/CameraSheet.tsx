import { useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import ConfirmModal from "src/components/modal/confirm/ConfirmModal";
import * as S from "./style";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (photoDataUrl: string) => void; // 촬영 결과
};

export default function CameraSheet({ open, onClose, onConfirm }: Props) {
  const isNative = Capacitor.isNativePlatform();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [facing, setFacing] = useState<"environment" | "user">("environment");

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

  const handleRetake = () => {
    setPhoto(null);
    setConfirmOpen(false);
  };

  const handleConfirm = () => {
    if (!photo) return;
    onConfirm(photo);
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
        confirmText="확인"
        cancelText="취소"
        onCancel={handleRetake}
        onConfirm={handleConfirm}
      />
    </S.Wrap>
  ) : null;
}
