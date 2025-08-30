import { useEffect } from "react";
import * as S from "./sytle";

type Props = {
  open: boolean;
  onClose: () => void;
  user: {
    level: number;
    name: string;
    rankLabel: string; // 예: "발바닥"
    avatarUrl: string; // 큰 캐릭터 이미지
  };
  todaySteps: number; // 20000
  hanlabong: number; // 0 ~
  onChargeClick?: () => void;
  onEditName?: () => void;
};

export default function ProfileSheet({
  open,
  onClose,
  user,
  todaySteps,
  hanlabong,
  onChargeClick,
  onEditName,
}: Props) {
  // 스크롤 막기
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Sheet
        onClick={(e: any) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="프로필 상세"
      >
        {/* 상단 헤더 */}
        {/* 헤더 */}
        <S.HeaderGrad>
          {/* 뒤로가기 */}
          <S.BackBtn onClick={onClose} aria-label="뒤로가기">
            <S.BackIcon viewBox="0 0 24 24" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </S.BackIcon>
          </S.BackBtn>

          <S.AppTitle>내 캐릭터</S.AppTitle>

          {/* 상단 캡슐: 내 한라봉 / 채우기 */}
          <S.Capsule>
            <S.CapsuleLeft>
              내 한라봉 <S.Emoji></S.Emoji>{" "}
              <S.Mono>{hanlabong.toString().padStart(3, "0")}</S.Mono>
            </S.CapsuleLeft>
            <S.CapsuleDivider />
            <S.CapsuleRight
              onClick={onChargeClick}
              role="button"
              aria-label="한라봉 채우기"
            >
              한라봉 채우기{" "}
              <S.ChevronSmall viewBox="0 0 24 24" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </S.ChevronSmall>
            </S.CapsuleRight>
          </S.Capsule>

          <S.Hero>
            <S.Avatar src={user.avatarUrl} alt="" />
            <S.FootShadow />
          </S.Hero>
        </S.HeaderGrad>

        {/* 닉네임 + 편집 */}
        <S.NameRow>
          <S.Name>{user.name}</S.Name>
          <S.EditBtn
            type="button"
            onClick={onEditName}
            aria-label="닉네임 편집"
          ></S.EditBtn>
        </S.NameRow>

        {/* 2칸 카드: 오늘의 걸음 / 등급 */}
        <S.TwoCol>
          <S.StatCard>
            <S.StatLabel>오늘의 걸음</S.StatLabel>
            <S.StatValue>
              <S.Emph>{todaySteps.toLocaleString()}</S.Emph> 걸음
            </S.StatValue>
          </S.StatCard>

          <S.StatCard>
            <S.StatLabel>등급</S.StatLabel>
            <S.RankText>{user.rankLabel}</S.RankText>
          </S.StatCard>
        </S.TwoCol>

        {/* 리스트: 진행 중인 챌린지 / 상점 바로가기 */}
        <S.List>
          <S.ListItem role="button">
            <S.TrophyIcon></S.TrophyIcon>
            <S.ListText>진행 중인 챌린지</S.ListText>
            <S.ChevronRight viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </S.ChevronRight>
          </S.ListItem>

          <S.ListItem role="button">
            <S.StoreIcon></S.StoreIcon>
            <S.ListText>상점 바로가기</S.ListText>
            <S.ChevronRight viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6" />
            </S.ChevronRight>
          </S.ListItem>
        </S.List>
      </S.Sheet>
    </S.Overlay>
  );
}
