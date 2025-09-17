import styled from "@emotion/styled";
import BottomNavigation from "../../components/commons/Navigation/BottomNavigation";
import CommunityContent from "../../components/community/CommunityContent";
import FloatingButton from "../../components/commons/Buttons/FloatingButton";
import NotiHeader from "src/components/commons/Header/NotiHeader";
import PostsListTop from "src/components/community/PostsList/PostListTop";
import { useNotification } from "src/features/my-page/useNotification";
import BannerSlider from "src/components/community/PostsList/BannerSlider";
import { useEffect, useState } from "react";
import PostSearch from "src/components/community/PostsList/PostSearch";

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

  const [bannerImg, setBannerImg] = useState<string[]>([]);

  useEffect(() => {
    // 크롤링 API 호출
  }, []);

  return (
    <>
      <NotiHeader
        title="커뮤니티"
        notiEnabled={notiEnabled}
        onToggleNoti={toggleNoti}
      />
      <ContentArea>
        <PostSearch />
        <PostsListTop />
        <BannerSlider images={bannerImg} />
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
