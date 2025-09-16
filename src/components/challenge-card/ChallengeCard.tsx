import { useState } from "react";
import { useDispatch } from "react-redux";
import { startChallenge } from "src/redux/challenge/actions";
import { challengeApi } from "src/api/challengeApi";
import { useGeolocation } from "src/features/main/useGeolocation";
import { refreshUpcomingAndStore } from "src/features/challenges/refreshUpcoming";
import ConfirmModal from "../modal/confirm/ConfirmModal";
import * as S from "./style";

export type ChallengeCardData = {
  id: string;
  title: string;
  categoryLabel: string;
  statusLabel: "진행전" | "진행중" | "완료";
  dateText: string;
  imageUrl: string;
  categoryTone?: "primary" | "neutral";
};

type Props = { data: ChallengeCardData };

export default function ChallengeCard({ data }: Props) {
  const {
    title,
    categoryLabel,
    statusLabel,
    dateText,
    imageUrl,
    categoryTone,
  } = data;

  const isDone = statusLabel === "완료";
  const dispatch = useDispatch();
  const isReady = data.statusLabel === "진행전";
  const { lat, lng } = useGeolocation();

  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <S.Card
        onClick={() => {
          if (isReady) setConfirmOpen(true);
        }}
      >
        <S.Media>
          <S.Image src={imageUrl} alt="" />

          {isDone && (
            <>
              <S.Dim />
              <S.StampImg />
            </>
          )}
          <S.Trophy aria-hidden />

          <S.BottomLeft>
            <S.Title>{title}</S.Title>
            <S.Status>{statusLabel}</S.Status>
          </S.BottomLeft>

          <S.DateText>{dateText}</S.DateText>
        </S.Media>
        <S.Category tone={categoryTone ?? "neutral"}>
          {categoryLabel}
        </S.Category>

        {isReady && (
          <ConfirmModal
            open={confirmOpen}
            title="이 챌린지를 시작할까요?"
            subtitle="진행중 목록으로 이동합니다."
            confirmText={submitting ? "시작 중…" : "시작하기"}
            cancelText="취소"
            onCancel={() => setConfirmOpen(false)}
            onConfirm={async () => {
              if (lat == null || lng == null) {
                alert(
                  "현재 위치를 확인할 수 없어요. 위치 권한을 허용해 주세요."
                );
                return;
              }
              try {
                setSubmitting(true);
                // 1) 서버에 진행 시작 + 내 좌표
                await challengeApi.start(data.id, Number(lat), Number(lng));
                // 2) 로컬에서 진행전 → 진행중 이동 (낙관적)
                dispatch(startChallenge(String(data.id)));
                // 3) 서버 기준으로 진행전 목록 재계산 → 재조회 → Redux 반영
                await refreshUpcomingAndStore(dispatch);
                setConfirmOpen(false);
              } catch (e) {
                alert("챌린지 시작에 실패했어요. 잠시 후 다시 시도해 주세요.");
              } finally {
                setSubmitting(false);
              }
            }}
          />
        )}
      </S.Card>
    </>
  );
}
