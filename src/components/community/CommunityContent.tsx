// src/components/community/CommunityContent.tsx
import SpotCard from 'src/components/community/spots/SpotCard';
import { theme } from '../../styles/theme';
import type { RootState } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTab } from '../../store/slices/communitySlice';
import { ContentContainer, PostsContainer, TabButton, TabContainer } from './style';
import { useEffect, useState } from 'react';
import {
  fetchLatestSpots,
  fetchMostViewedSpots,
  type Page,
  type SpotDto,
} from 'src/api/spot.ts';

const CommunityContent: React.FC = () => {
  const dispatch = useDispatch();
  const { activeTab, loading } = useSelector((state: RootState) => state.community);

  // 최신순(생성일 DESC)
  const [spots, setSpots] = useState<SpotDto[]>([]);
  const [spotsPage, setSpotsPage] = useState(0);
  const [spotsLast, setSpotsLast] = useState(false);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [spotsError, setSpotsError] = useState<string | null>(null);

  // 인기순(조회수 DESC)
  const [popular, setPopular] = useState<SpotDto[]>([]);
  const [popularPage, setPopularPage] = useState(0);
  const [popularLast, setPopularLast] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);
  const [popularError, setPopularError] = useState<string | null>(null);

  const handleTabChange = (tab: 'latest' | 'popular') => {
    dispatch(setActiveTab(tab));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // 최신순 최초/탭 전환 시 로드
  useEffect(() => {
    if (activeTab !== 'latest') return;
    let aborted = false;

    (async () => {
      try {
        setSpotsLoading(true);
        setSpotsError(null);
        const data: Page<SpotDto> = await fetchLatestSpots(0, 20);
        if (aborted) return;
        setSpots(data.content);
        setSpotsPage(0);
        setSpotsLast(data.last);
      } catch (e: any) {
        if (!aborted) setSpotsError(e?.message ?? '스팟 불러오기 실패');
        console.error(e);
      } finally {
        if (!aborted) setSpotsLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [activeTab]);

  // 인기순(조회순) 최초/탭 전환 시 로드
  useEffect(() => {
    if (activeTab !== 'popular') return;
    let aborted = false;

    (async () => {
      try {
        setPopularLoading(true);
        setPopularError(null);
        const data: Page<SpotDto> = await fetchMostViewedSpots(0, 20);
        if (aborted) return;
        setPopular(data.content);
        setPopularPage(0);
        setPopularLast(data.last);
      } catch (e: any) {
        if (!aborted) setPopularError(e?.message ?? '스팟 불러오기 실패');
        console.error(e);
      } finally {
        if (!aborted) setPopularLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [activeTab]);

  // 최신순 더보기
  const loadMoreSpots = async () => {
    if (spotsLoading || spotsLast) return;
    setSpotsLoading(true);
    setSpotsError(null);
    try {
      const next = spotsPage + 1;
      const data = await fetchLatestSpots(next, 20);
      setSpots(prev => [...prev, ...data.content]);
      setSpotsPage(next);
      setSpotsLast(data.last);
    } catch (e: any) {
      setSpotsError(e?.message ?? '스팟 더 불러오기 실패');
    } finally {
      setSpotsLoading(false);
    }
  };

  // 인기순 더보기
  const loadMorePopular = async () => {
    if (popularLoading || popularLast) return;
    setPopularLoading(true);
    setPopularError(null);
    try {
      const next = popularPage + 1;
      const data = await fetchMostViewedSpots(next, 20);
      setPopular(prev => [...prev, ...data.content]);
      setPopularPage(next);
      setPopularLast(data.last);
    } catch (e: any) {
      setPopularError(e?.message ?? '스팟 더 불러오기 실패');
    } finally {
      setPopularLoading(false);
    }
  };

  return (
      <>
        <TabContainer>
          <TabButton active={activeTab === 'latest'} onClick={() => handleTabChange('latest')}>
            최신순
          </TabButton>
          <TabButton active={activeTab === 'popular'} onClick={() => handleTabChange('popular')}>
            인기순
          </TabButton>
        </TabContainer>

        <ContentContainer>
          <PostsContainer>
            {activeTab === 'latest' ? (
                <>
                  {spotsError && <div style={{ color: '#ef4444', padding: '12px 0' }}>{spotsError}</div>}

                  {spots.length > 0 ? (
                      spots.map(s => <SpotCard key={s.id} spot={s} />)
                  ) : spotsLoading ? (
                      <div style={{ color: theme.colors.gray[500], padding: '20px' }}>불러오는 중...</div>
                  ) : (
                      <div style={{ color: theme.colors.gray[500], padding: '20px' }}>스팟이 없습니다.</div>
                  )}

                  {!spotsLast && (
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 4px' }}>
                        <button
                            onClick={loadMoreSpots}
                            disabled={spotsLoading}
                            style={{
                              border: '1px solid #e5e7eb',
                              background: '#fff',
                              borderRadius: 9999,
                              padding: '6px 12px',
                              fontSize: 13,
                              cursor: spotsLoading ? 'default' : 'pointer',
                            }}
                        >
                          {spotsLoading ? '불러오는 중...' : '더보기'}
                        </button>
                      </div>
                  )}
                </>
            ) : (
                <>
                  {popularError && (
                      <div style={{ color: '#ef4444', padding: '12px 0' }}>{popularError}</div>
                  )}

                  {popular.length > 0 ? (
                      popular.map(s => <SpotCard key={s.id} spot={s} />)
                  ) : popularLoading ? (
                      <div style={{ color: theme.colors.gray[500], padding: '20px' }}>불러오는 중...</div>
                  ) : (
                      <div style={{ color: theme.colors.gray[500], padding: '20px' }}>
                        스팟이 없습니다.
                      </div>
                  )}

                  {!popularLast && (
                      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 4px' }}>
                        <button
                            onClick={loadMorePopular}
                            disabled={popularLoading}
                            style={{
                              border: '1px solid #e5e7eb',
                              background: '#fff',
                              borderRadius: 9999,
                              padding: '6px 12px',
                              fontSize: 13,
                              cursor: popularLoading ? 'default' : 'pointer',
                            }}
                        >
                          {popularLoading ? '불러오는 중...' : '더보기'}
                        </button>
                      </div>
                  )}
                </>
            )}
          </PostsContainer>
        </ContentContainer>
      </>
  );
};

export default CommunityContent;
