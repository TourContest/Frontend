import styled from '@emotion/styled';
import BottomNavigation from '../../components/commons/Navigation/BottomNavigation';
import CommunityContent from '../../components/community/CommunityContent';
import FloatingButton from '../../components/commons/Buttons/FloatingButton';
import NotiHeader from 'src/components/commons/Header/NotiHeader';
import PostsListTop from 'src/components/community/PostsList/PostListTop';
import { useNotification } from 'src/features/my-page/useNotification';
import BannerSlider from 'src/components/community/PostsList/BannerSlider';
import { useEffect, useState } from 'react';
import PostSearch from 'src/components/community/PostsList/PostSearch';

import { fetchCommunityEventBanners } from 'src/api/community';
import type { CommunityEventBannerDto } from 'src/api/community';
import type { BannerItem } from 'src/components/community/PostsList/types';

const ContentArea = styled.div`
  width: 100%;
  padding-bottom: 66px;
`;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 96px;
  left: calc(100% - 17px); /* 화면 중앙에서 우측으로 17px */
  transform: translate(-100%);
  z-index: 1000;
  width: 60px;
  height: 60px;
`;

const CommunityPage: React.FC = () => {
  const { notiEnabled, toggleNoti } = useNotification();

    const [bannerItems, setBannerItems] = useState<BannerItem[]>([]);
    const [bannerError, setBannerError] = useState<string | null>(null);
    const [bannerLoading, setBannerLoading] = useState<boolean>(true);

    useEffect(() => {
        let aborted = false;
        (async () => {
            try {
                setBannerLoading(true);
                const data: CommunityEventBannerDto[] = await fetchCommunityEventBanners(); // 오늘 날짜 기준
                if (aborted) return;

                // image_url, detailUrl, title을 매핑
                const mapped: BannerItem[] = data
                    .filter(d => !!d.image_url) // 이미지 없는 항목은 제외
                    .map(d => ({
                        image: d.image_url,
                        href: d.detailUrl,
                        title: d.title,
                    }));

                setBannerItems(mapped);
                setBannerError(null);
            } catch (e: any) {
                console.error(e);
                if (!aborted) setBannerError(e?.message ?? '배너 불러오기 실패');
            } finally {
                if (!aborted) setBannerLoading(false);
            }
        })();
        return () => { aborted = true; };
    }, []);

  return (
    <>
      <NotiHeader title="커뮤니티" notiEnabled={notiEnabled} onToggleNoti={toggleNoti} />
      <ContentArea>
        <PostSearch />
        <PostsListTop />
          {!bannerError && (
              <BannerSlider
                  // items를 넘기면 클릭 가능한 배너로 렌더링
                  items={bannerItems}
              />
          )}
          <CommunityContent />
      </ContentArea>
      <BottomNavigation />
      <FloatingButtonContainer>
        <FloatingButton />
      </FloatingButtonContainer>
    </>
  );
};

export default CommunityPage;