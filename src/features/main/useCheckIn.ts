// src/features/main/useCheckIn.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { attendanceApi } from "../../api/attendanceApi";

type CheckInState = {
  shouldOpen: boolean; // 모달 열지 여부
  day: number; // 연속 일수
  reward: number; // baseHallabong
  bonus: number; // bonusHallabong
};

// 오늘 날짜 키 (중복 모달 방지)
const todayKey = () => `attendance:${new Date().toISOString().slice(0, 10)}`;

export function useCheckIn() {
  const [state, setState] = useState<CheckInState>({
    shouldOpen: false,
    day: 0,
    reward: 0,
    bonus: 0,
  });
  const calledRef = useRef(false);

  const run = useCallback(async () => {
    if (calledRef.current) return;
    if (localStorage.getItem(todayKey())) return;
    calledRef.current = true;

    try {
      const { data } = await attendanceApi.check();
      // 새 스키마 매핑
      const day = Number(data.days ?? 0);
      const base = Number(data.baseHallabong ?? 0);
      const bonus = Number(data.bonusHallabong ?? 0);

      const gotReward = base + bonus > 0;

      setState({
        shouldOpen: gotReward,
        day,
        reward: base,
        bonus,
      });

      localStorage.setItem(todayKey(), "1");
    } catch {}
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  const claim = useCallback(() => {
    window.dispatchEvent(new CustomEvent("me:refresh"));
  }, []);

  return { state, claim };
}
