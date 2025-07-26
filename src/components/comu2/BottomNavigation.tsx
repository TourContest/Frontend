import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import Frame66 from '../commons/Frame66/Frame66';

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 375px;
  height: 90px;
  background-color: ${theme.colors.bg[0]};
  border-top: 1px solid ${theme.colors.gray[200]};
  box-shadow: ${theme.shadow.shadow1.x}px ${theme.shadow.shadow1.y}px ${theme.shadow.shadow1.blur}px ${theme.shadow.shadow1.color};
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomNavigation: React.FC = () => {
  return (
    <BottomNavContainer>
      <Frame66 />
    </BottomNavContainer>
  );
};

export default BottomNavigation; 