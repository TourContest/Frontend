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
  });
}
