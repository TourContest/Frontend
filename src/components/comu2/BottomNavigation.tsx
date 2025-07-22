import React from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 184px;
  background-color: ${theme.colors.bg[0]};
  border-top: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadow.shadow1.x}px ${theme.shadow.shadow1.y}px ${theme.shadow.shadow1.blur}px ${theme.shadow.shadow1.color};
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
`;

const NavItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 375px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 80px;
  height: 60px;
  justify-content: center;
  cursor: pointer;
`;

const NavIcon = styled.div<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[400]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavText = styled.span<{ active?: boolean }>`
  font-family: 'Pretendard', sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[400]};
  letter-spacing: -0.13px;
`;

const HomeIndicator = styled.div`
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.div`
  width: 134px;
  height: 5px;
  background-color: ${theme.colors.base[100]};
  border-radius: 2.5px;
  opacity: 0.3;
`;

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: '홈' },
    { path: '/search', label: '검색' },
    { path: '/community', label: '주간제주' },
    { path: '/mypage', label: '마이페이지' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <BottomNavContainer>
      <NavContent>
        <NavItems>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavItem key={item.path} onClick={() => handleNavClick(item.path)}>
                <NavIcon active={isActive} />
                <NavText active={isActive}>{item.label}</NavText>
              </NavItem>
            );
          })}
        </NavItems>
      </NavContent>
      <HomeIndicator>
        <Indicator />
      </HomeIndicator>
    </BottomNavContainer>
  );
};

export default BottomNavigation; 