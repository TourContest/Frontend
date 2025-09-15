import { useCallback, useEffect, useState } from "react";
import {
  attendanceApi,
  type AttendanceCheckRes,
} from "../../api/attendanceApi";

export function useAttendanceCheck(enabled = true) {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(0);
  const [reward, setReward] = useState(0);
  const [bonus, setBonus] = useState(0);

  const run = useCallback(async () => {
    if (!enabled) return;

    const key = `attendance:${new Date().toISOString().slice(0, 10)}`; // YYYY-MM-DD
    if (localStorage.getItem(key)) return; // 오늘 이미 처리

    try {
      const res = await attendanceApi.check();
      const d: AttendanceCheckRes = res.data;

      const dayVal = Number(d?.days ?? 0);
      const base = Number(d?.baseHallabong ?? 0);
      const extra = Number(d?.bonusHallabong ?? 0);

      setDay(dayVal);
      setReward(base);
      setBonus(extra);

      // 보상 있을 때만 모달 오픈 (필요 없으면 true 로 고정)
      const gotReward = base + extra > 0;
      setOpen(gotReward);

      // 중복 호출/오픈 방지
      localStorage.setItem(key, "1");
    } catch {
      // 실패는 조용히 패스
    }
  }, [enabled]);

  useEffect(() => {
    run();
  }, [run]);

  return { open, day, reward, bonus, setOpen };
}
