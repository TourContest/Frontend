import React from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';

const TopNavContainer = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 88px;
  background-color: ${theme.colors.bg[0]};
  z-index: 1000;
  border-bottom: 1px solid ${theme.colors.gray[200]};
`;

const StatusBar = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${theme.colors.bg[0]};
`;

const Time = styled.span`
  font-family: 'SF Pro Display', sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: ${theme.colors.base[100]};
`;

const StatusIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const NavigationBar = styled.div`
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: ${theme.colors.bg[0]};
`;

const Title = styled.h1`
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: ${theme.colors.gray[800]};
  margin: 0;
`;

const BellIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${theme.colors.gray[400]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  
  &::before {
    content: '';
    width: 4px;
    height: 4px;
    background-color: ${theme.colors.primary[400]};
    border-radius: 50%;
    position: absolute;
    top: 3px;
    right: 3px;
  }
`;

const TopNavigation: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return '홈';
      case '/search':
        return '검색';
      case '/community':
        return '커뮤니티';
      case '/mypage':
        return '마이페이지';
      default:
        return '앱';
    }
  };

  const handleBellClick = () => {
    // 알림 기능 구현
    console.log('알림 클릭');
  };

  return (
    <TopNavContainer>
      <StatusBar>
        <Time>9:41</Time>
        <StatusIcons>
          <div style={{ width: 18, height: 12, backgroundColor: '#000' }}></div>
          <div style={{ width: 16, height: 12, backgroundColor: '#000' }}></div>
          <div style={{ width: 25, height: 12, backgroundColor: '#000' }}></div>
        </StatusIcons>
      </StatusBar>
      <NavigationBar>
        <div style={{ width: 24 }}></div>
        <Title>{getPageTitle()}</Title>
        <BellIcon onClick={handleBellClick}></BellIcon>
      </NavigationBar>
    </TopNavContainer>
  );
};

export default TopNavigation; 