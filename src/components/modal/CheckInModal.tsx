import {
  Overlay,
  Modal,
  Title,
  Desc,
  StampBoard,
  TrackSvg,
  Row,
  Stamp,
  FruitIcon,
  StampLabel,
  Footer,
  PrimaryBtn,
} from "./style";

// 팝업창 오픈, 일수, 점수, 보너스
type Props = {
  open: boolean;
  day: number;
  reward: number;
  bonus?: number;
  onClose: () => void;
  onClaim: () => void;
};

function buildTrackPath() {
  // 레이아웃
  const BOARD_W = 295;

  const D = 60; // 스탬프 지름
  const G = 10; // 스탬프 간격
  const PAD_X = -10;
  const topY = 53; // 상단 센터 y
  const botY = 150; // 하단 센터 y
  const DESIRED_R = 50; // 코너 반경

  // 상단 4개 센터 x
  const x0 = PAD_X + D / 2 + 5;
  const x1 = x0 + (D + G);
  const x2 = x1 + (D + G);
  const x3 = x2 + (D + G);

  // 가로로는 우측 여백 안에서 x3→xr까지 R만큼 나가야 하고,
  // 세로로는 topY→botY 사이에서 2R을 소모(위/아래 1/4 원 두 개).
  const RIGHT_MARGIN = 10; // 보드 오른쪽 내부 여백
  const maxRByWidth = Math.max(4, BOARD_W - RIGHT_MARGIN + x3);
  const maxRByHeight = Math.max(4, (botY - topY) / 2);
  const R = Math.min(DESIRED_R, maxRByWidth, maxRByHeight);

  const xr = x3 + R; // 코너 바깥쪽 x

  // 경로: 상단 직선 → 우측 1/4원 아크 → 수직 ↓ → 하단 1/4원 아크 → 좌향 직선
  const d = [
    `M ${x0 + 25},${topY}`,
    `L ${x1},${topY}`,
    `L ${x2},${topY}`,
    `L ${x3},${topY}`,

    // 우상단 → 우하단(1/4 원, 시계방향)
    `A ${R} ${R} 0 0 1 ${xr} ${topY + R}`,

    // 수직 하강
    `L ${xr} ${botY - R}`,

    // 우하단 → 우측 하단 직선 시작점(1/4 원, 시계방향)
    `A ${R} ${R} 0 0 1 ${x3} ${botY}`,

    // 하단 좌향으로 3칸
    `L ${x2} ${botY}`,
    `L ${x1} ${botY}`,
  ].join(" ");

  return d;
}

export default function CheckInModal({
  open,
  day,
  reward,
  bonus = 0,
  onClose,
  onClaim,
}: Props) {
  if (!open) return null;

  const top = [1, 2, 3, 4];
  const bottom = [5, 6, 7];

  return (
    <Overlay>
      <Modal role="dialog" aria-modal="true" aria-label="출석 보상">
        <Title>하루제주 입장을 환영해요!</Title>
        <Desc>
          {day}일 출석 성공! <b>{reward}</b> 한라봉을 지급했어요!
          {bonus > 0 && (
            <>
              {" "}
              &nbsp;7일 연속 달성 보너스 <b>{bonus}</b> 추가 지급!
            </>
          )}
        </Desc>

        <StampBoard>
          <TrackSvg viewBox="0 0 295 200" preserveAspectRatio="none">
            <path d={buildTrackPath()} />
          </TrackSvg>

          <Row>
            {top.map((n) => (
              <div key={n} style={{ display: "grid", placeItems: "center" }}>
                <Stamp active={n <= day}>
                  <FruitIcon active={n <= day} />
                </Stamp>
                <StampLabel active={n === day}>{n}일차</StampLabel>
              </div>
            ))}
          </Row>

          <Row reversed>
            {bottom.map((n) => (
              <div key={n} style={{ display: "grid", placeItems: "center" }}>
                <Stamp active={n <= day}>
                  <FruitIcon active={n <= day} />
                </Stamp>
                <StampLabel active={n === day}>{n}일차</StampLabel>
              </div>
            ))}
          </Row>
        </StampBoard>

        <Footer>
          <PrimaryBtn
            onClick={() => {
              onClaim();
              onClose();
            }}
          >
            홈으로 가기
          </PrimaryBtn>
        </Footer>
      </Modal>
    </Overlay>
  );
}
