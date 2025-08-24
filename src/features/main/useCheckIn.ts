import { useCallback, useState, useEffect } from "react";

type CheckInState = {
  shouldOpen: boolean; // 진입 시에 모달을 여는지 여부
  day: number; // 오늘 연속 n일차 (1~7)
  reward: number; // 오늘 지급 금액 (100, 120, 140 ...)
  bonus: number; // 7일 보너스 (오늘이 7일차에서 완료되는 경우 500)
};

const LAST_DATE_KEY = "checkin:lastDate";
const STAREK_KEY = "checkin:streak";
const CLAIMED_KEY = "checkin:claimedDate"; // 같은 날 중복 지급 방지용

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export function useCheckIn() {
  const [state, setState] = useState<CheckInState>({
    shouldOpen: false,
    day: 1,
    reward: 100,
    bonus: 0,
  });

  useEffect(() => {
    const today = new Date();
    const lastDateStr = localStorage.getItem(LAST_DATE_KEY);
    const claimeStr = localStorage.getItem(CLAIMED_KEY);
    const streakStr = localStorage.getItem(STAREK_KEY);

    let streak = Number(streakStr || 0);
    const lastDate = lastDateStr ? new Date(lastDateStr) : null;

    // 연속으로 출첵하는지 계산
    if (!lastDate) {
      streak = 1; // 처음 출첵
    } else {
      const diffDays = Math.floor(
        today.setHours(0, 0, 0, 0) - new Date(lastDate).setHours(0, 0, 0, 0)
      );
      if (diffDays === 1) streak = Math.min(streak + 1, 7);
      else if (diffDays === 0) {
        // 같은 날 다시 진입: streak 유지
      } else streak = 1; // 끊기면 리셋
    }

    const day = streak; // 1~7
    const reward = 100 + 20 * (day - 1); // 1일차 100, 2일차 120 ...
    const alreadyClaimedToday =
      claimeStr && isSameDay(new Date(claimeStr), new Date());

    // 오늘 아직 수령 안했으면 모달 열기
    setState({
      shouldOpen: !alreadyClaimedToday,
      day,
      reward,
      bonus: day === 7 && !alreadyClaimedToday ? 500 : 0,
    });

    // streak 저장 (같은 날에는 값을 유지해야됨)
    localStorage.setItem(STAREK_KEY, String(streak));
    if (!lastDate || !isSameDay(new Date(), lastDate)) {
      localStorage.setItem(LAST_DATE_KEY, today.toISOString());
    }
  }, []);

  const claim = useCallback(() => {
    // 음.. 실제로는 서버에 출석 보상 지급 API를 호출해야됨..
    // localStorage.setItem(CLAIMED_KEY, new Date().toISOString()); 디자인 테스트 때문에 잠시 주석..!
    return { ok: true };
  }, []);

  return { state, claim };
}
