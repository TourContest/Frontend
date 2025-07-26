import React from 'react';
import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { theme } from '../styles/theme';
import TopNavigation from '../components/comu2/TopNavigation';
import BottomNavigation from '../components/comu2/BottomNavigation';
import CommunityContent from '../components/comu2/CommunityContent';
import Pagination from '../components/commons/Pagination';
import FloatingButton from '../components/commons/FloatingButton';
import type { RootState } from '../store';
import { setCurrentPage } from '../store/slices/communitySlice';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.bg[50]};
  position: relative;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 36px;
  margin-top: 88px; /* TopNavigation 높이 */
  margin-bottom: 90px; /* BottomNavigation 높이 */
`;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 120px; /* BottomNavigation 위 30px (BottomNavigation 높이 90px + 30px) */
  left: calc(50% + 100px); /* 화면 중앙에서 우측으로 17px */
  z-index: 1000;
  width: 60px;
  height: 60px;
`;

const CommunityPage: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state: RootState) => state.community);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <PageContainer>
      <TopNavigation />
      <ContentArea>
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <CommunityContent />
      </ContentArea>
      <BottomNavigation />
      <FloatingButtonContainer>
        <FloatingButton />
      </FloatingButtonContainer>
    </PageContainer>
  );
};

export default CommunityPage; 