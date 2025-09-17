import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectReady,
  selectDoing,
  selectDone,
} from "src/redux/challenge/selectors";
import { useLoadUpcoming } from "src/features/challenges/useLoadUpcoming";
import { useLoadOngoing } from "src/features/challenges/useLoadOngoing";
import { useLoadCompleted } from "src/features/challenges/useLoadCompleted";
import * as S from "./style";
import ChallengeCard from "src/components/challenge-card/ChallengeCard";
import BottomNavigation from "src/components/commons/Navigation/BottomNavigation";

type Tab = "pre" | "doing" | "done";

export default function ChallengePage() {
  const { loading: loadingPre, error: errorPre } = useLoadUpcoming();
  const { loading: loadingNow, error: errorNow } = useLoadOngoing();
  const {
    loading: loadingDone,
    error: errorDone,
    sentinelRef,
    hasMore,
  } = useLoadCompleted();
  const navigate = useNavigate();

  const loading = loadingPre || loadingNow || loadingDone;
  const error = errorPre ?? errorNow ?? errorDone;
  const ready = useSelector(selectReady);
  const doing = useSelector(selectDoing);
  const done = useSelector(selectDone);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const initParam =
    ((searchParams.get("tab") ||
      (location.state as any)?.initialTab) as string) || null;

  const initialTab: Tab =
    initParam === "doing" ? "doing" : initParam === "done" ? "done" : "pre";

  const [tab, setTab] = useState<Tab>(initialTab);

  // 탭 변경 시 URL도 동기화 (?tab=doing 등등)
  useEffect(() => {
    const cur = searchParams.get("tab");
    if (cur !== tab) {
      const sp = new URLSearchParams(searchParams);
      sp.set("tab", tab);
      setSearchParams(sp, { replace: true });
    }
  }, [tab, searchParams, setSearchParams]);

  const visible = tab === "pre" ? ready : tab === "doing" ? doing : done;

  const visibleUniq = useMemo(() => {
    const seen = new Set<string>();
    return visible.filter((it) => {
      const key = String(it.id);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [visible]);
  const showEmpty = visible.length === 0;
  const emptyText =
    tab === "done"
      ? "완료된 챌린지가 없어요!"
      : tab === "doing"
        ? "현재 진행중인 챌린지가 없어요!"
        : "추천 챌린지가 없어요!";

  return (
    <S.Page>
      <S.Header>
        <S.Title>챌린지</S.Title>
        <S.Tabs>
          <S.Tab active={tab === "pre"} onClick={() => setTab("pre")}>
            진행전
          </S.Tab>
          <S.Tab active={tab === "doing"} onClick={() => setTab("doing")}>
            진행중
          </S.Tab>
          <S.Tab active={tab === "done"} onClick={() => setTab("done")}>
            완료
          </S.Tab>
          <S.Indicator index={tab === "pre" ? 0 : tab === "doing" ? 1 : 2} />
        </S.Tabs>
      </S.Header>

      <S.Body>
        {loading ? (
          <S.EmptyWrap>
            <S.EmptyText>불러오는 중…</S.EmptyText>
          </S.EmptyWrap>
        ) : error ? (
          <S.EmptyWrap>
            <S.EmptyText>로드 실패: {error}</S.EmptyText>
          </S.EmptyWrap>
        ) : showEmpty ? (
          <S.EmptyWrap>
            <S.EmptyEmoji />
            <S.EmptyText>{emptyText}</S.EmptyText>
          </S.EmptyWrap>
        ) : (
          <>
            <S.List>
              {visibleUniq.map((item) => (
                <li
                  key={item.id}
                  onClick={
                    tab === "pre"
                      ? () =>
                          navigate(`/challenge/upcoming/${item.id}`, {
                            state: { item },
                          })
                      : undefined
                  }
                >
                  <ChallengeCard data={item} />
                </li>
              ))}
            </S.List>

            {/* 완료 탭일 때만 무한 스크롤 센티넬 */}
            {tab === "done" && (
              <div ref={sentinelRef} style={{ height: 1 }} aria-hidden />
            )}
            {tab === "done" && !loadingDone && !hasMore && (
              <S.EmptyWrap>
                <S.EmptyText></S.EmptyText>
              </S.EmptyWrap>
            )}
          </>
        )}
      </S.Body>
      <BottomNavigation />
    </S.Page>
  );
}
