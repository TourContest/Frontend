import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { theme } from '../../../styles/theme';
import { FiHome, FiSearch, FiUser } from 'react-icons/fi';
import { FaUsers } from 'react-icons/fa';

const FrameParent = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  font-size: 13px;
  color: ${theme.colors.gray[400]};
  font-family: Pretendard;
`;

const IconsParent = styled.div<{ active?: boolean }>`
  width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[400]};
`;

const IconsContainer = styled.div`
  width: 80px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: ${theme.colors.primary[400]};
`;

const Icons = styled.div`
  width: 32px;
  position: relative;
  height: 32px;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavText = styled.div<{ active?: boolean }>`
  align-self: stretch;
  position: relative;
  letter-spacing: -0.01em;
  line-height: 130%;
  font-weight: ${props => props.active ? 600 : 400};
  color: ${props => props.active ? theme.colors.primary[400] : theme.colors.gray[400]};
`;

const Frame66: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: '홈', icon: FiHome },
    { path: '/search', label: '검색', icon: FiSearch },
    { path: '/community', label: '주간제주', icon: FaUsers },
    { path: '/mypage', label: '마이페이지', icon: FiUser }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <FrameParent>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const IconComponent = item.icon;
        
        if (item.path === '/community') {
          return (
            <IconsContainer key={item.path} onClick={() => handleNavClick(item.path)}>
              <Icons>
                <IconComponent size={24} />
              </Icons>
              <NavText active={isActive}>{item.label}</NavText>
            </IconsContainer>
          );
        }
        
        return (
          <IconsParent key={item.path} active={isActive} onClick={() => handleNavClick(item.path)}>
            <Icons>
              <IconComponent size={24} />
            </Icons>
            <NavText active={isActive}>{item.label}</NavText>
          </IconsParent>
        );
      })}
    </FrameParent>
  );
};

export default Frame66; 