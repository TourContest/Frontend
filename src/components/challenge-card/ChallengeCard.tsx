import * as S from "./style";

export type ChallengeCardData = {
  id: string;
  title: string;
  categoryLabel: string;
  statusLabel: "진행전" | "진행중" | "완료";
  dateText: string;
  imageUrl: string;
  categoryTone?: "primary" | "neutral";
  latitude?: number;
  longitude?: number;
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

  return (
    <>
      <S.Card>
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
      </S.Card>
    </>
  );
}
