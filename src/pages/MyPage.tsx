import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import TopNavigation from '../components/comu2/TopNavigation';
import BottomNavigation from '../components/comu2/BottomNavigation';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${theme.colors.bg[50]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  width: 375px;
  height: 100vh;
  background-color: ${theme.colors.bg[50]};
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const ContentWrapper = styled.div`
  padding-top: 88px;
  padding-bottom: 184px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  text-align: center;
  color: ${theme.colors.gray[600]};
  font-family: 'Pretendard', sans-serif;
  font-size: 18px;
`;

const MyPage: React.FC = () => {
  return (
    <PageWrapper>
      <PageContainer>
        <TopNavigation />
        <ContentWrapper>
          <Content>마이페이지입니다</Content>
        </ContentWrapper>
        <BottomNavigation />
      </PageContainer>
    </PageWrapper>
  );
};

export default MyPage; 