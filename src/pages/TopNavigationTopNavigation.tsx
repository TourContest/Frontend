import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { FiChevronLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TopNavigationContainer = styled.div`
  width: 100%;
  max-width: 375px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.base[100]};
  font-family: 'Pretendard', 'SF SD Text', sans-serif;
  background: ${({ theme }) => theme.colors.bg[0]};
`;
const StatusSafeArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;
const Time = styled.div`
  width: auto;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 10px;
  margin-left: 14px;
`;
const Status = styled.div`
  width: 95px;
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 4px;
`;
const Battery = styled.div`
  width: 25px;
  position: relative;
  height: 12px;
`;
const Bar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Navigation = styled.div`
  width: 100%;
  position: relative;
  height: 44px;
`;
const TopNavigationIcon = styled.div`
  position: absolute;
  top: 10px;
  left: 14px;
  width: 24px;
  height: 24px;
  overflow: hidden;
`;
const Filler = styled.div`
  position: absolute;
  top: 10px;
  left: 191.5px;
  width: 0px;
  height: 24px;
`;
const Icons = styled.div`
  position: absolute;
  top: 6px;
  right: 14px;
  width: 32px;
  height: 32px;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const NormalIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const BackButton = styled.button`
  margin-top: 2px;
  margin-left: 14px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  z-index: 2;
`;

const TopNavigationTopNavigation: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <TopNavigationContainer>
      <StatusSafeArea>
        <Container>
          <Time>
            <div>9:41</div>
          </Time>
          <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
            <FiChevronLeft size={24} />
          </BackButton>
          <Status>
            <Content>
              <img style={{ width: 18, height: 12 }} alt="" src="Celluar.png" />
              <img style={{ width: 16, height: 12 }} alt="" src="Wi-Fi.png" />
              <Battery>
                <div style={{ position: 'relative', width: 24.3, height: 11.3 }}>
                  <img style={{ position: 'absolute', top: 3.67, left: 23, width: 1.3, height: 4, opacity: 0.5 }} alt="" src="Cap.svg" />
                  <div style={{ position: 'absolute', top: 0, left: 0, borderRadius: 3, border: '1px solid #000', width: 22, height: 11.3, opacity: 0.4 }} />
                  <div style={{ position: 'absolute', top: 2, left: 2, borderRadius: 1.33, backgroundColor: '#000', width: 18, height: 7.3 }} />
                </div>
              </Battery>
            </Content>
          </Status>
        </Container>
      </StatusSafeArea>
      <Bar>
        <Navigation>
          <Filler />
          <Icons>
            <SocialIcon alt="" src="Social.svg" />
            <NormalIcon alt="" src="Normal.svg" />
          </Icons>
        </Navigation>
      </Bar>
    </TopNavigationContainer>
  );
};

export default TopNavigationTopNavigation; 