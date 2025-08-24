// 팝업창 오픈, 일수, 점수, 보너스
type Props = {
  open: boolean;
  day: number;
  reward: number;
  bonus?: number;
  onClose: () => void;
  onClaim: () => void;
};

export default function CheckInModal({
  open,
  day,
  reward,
  bonus = 0,
  onClose,
  onClaim,
}: Props) {
  if (!open) return null;

  return (
    <div>
      <div>
        <h3>하루제주 입장을 환영해요!</h3>
        <p>
          {day}일 출석 성공! <b>{reward}</b> 한라봉을 지급했어요!
        </p>
        {bonus > 0 && (
          <p>
            {" "}
            7일 연속 달성 보너스 <b>{bonus}</b> 추가 지급!
          </p>
        )}

        {/* UI 임시로 */}
        <div>
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i}></div>
          ))}
        </div>

        <div>
          <button
            onClick={() => {
              onClaim();
              onClose();
            }}
          >
            {" "}
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
}
