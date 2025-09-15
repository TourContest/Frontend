import { useCallback, useEffect, useRef } from "react";
import { stepsApi } from "src/api/stepsApi";

type Options = {
  /** 이 수치 이상 증가했을 때만 저장 시도 (기본 50걸음) */
  minDelta?: number;
  /** 이 ms 이상 지난 뒤에만 저장 시도 (기본 60초) */
  minIntervalMs?: number;
  /** 저장 성공 시 호출(예: me 재조회 트리거) */
  onSaved?: (sent: number) => void;
  /** 로그인 안 된 상태 등에서 아예 호출하지 않으려면 false */
  enabled?: boolean;
};

/**
 * 누적 steps를 받아 서버로 저장.
 * - minDelta: 직전 전송 대비 최소 증가량
 * - minIntervalMs: 직전 전송 이후 최소 간격
 * - 중복 방지: ref + localStorage 기록
 */
export function useSaveSteps(totalSteps: number, opts: Options = {}) {
  const {
    minDelta = 50,
    minIntervalMs = 60_000,
    onSaved,
    enabled = true,
  } = opts;

  const lastSentRef = useRef<number>(0);
  const lastAtRef = useRef<number>(0);
  const inFlightRef = useRef<boolean>(false);

  // 새 탭/리로드 시에도 중복 전송 줄이기 위해 localStorage와 동기화
  useEffect(() => {
    const ls = Number(localStorage.getItem("steps:lastSent") || "0");
    const la = Number(localStorage.getItem("steps:lastAt") || "0");
    if (ls) lastSentRef.current = ls;
    if (la) lastAtRef.current = la;
  }, []);

  const trySend = useCallback(
    async (count: number) => {
      if (!enabled) return;
      if (inFlightRef.current) return;

      const now = Date.now();
      const since = now - (lastAtRef.current || 0);
      const delta = Math.max(
        0,
        Math.floor(count) - Math.floor(lastSentRef.current)
      );

      if (delta < minDelta) return;
      if (since < minIntervalMs) return;

      inFlightRef.current = true;
      try {
        // 음수/NaN 방지 & 불필요한 소수점 제거
        const safe = Math.max(0, Math.floor(count));
        await stepsApi.save(safe);

        lastSentRef.current = safe;
        lastAtRef.current = now;
        localStorage.setItem("steps:lastSent", String(safe));
        localStorage.setItem("steps:lastAt", String(now));
        onSaved?.(safe);
      } catch {
        // 실패는 조용히 무시(네트워크 일시 오류 등). 다음 기회에 다시 시도됨.
      } finally {
        inFlightRef.current = false;
      }
    },
    [enabled, minDelta, minIntervalMs, onSaved]
  );

  useEffect(() => {
    if (!enabled) return;
    if (!Number.isFinite(totalSteps)) return;
    trySend(totalSteps);
  }, [totalSteps, enabled, trySend]);

  // 필요 시 수동 강제 호출(ex: 화면 내 버튼)
  const flush = useCallback(() => {
    if (!enabled) return;
    trySend(totalSteps);
  }, [enabled, totalSteps, trySend]);

  return { flush };
}
