import React from "react";
import styled from "@emotion/styled";
import { theme } from "../../../styles/theme";
import { NavLink } from "react-router-dom";
import Home from "../../../assets/home.svg";
import HomeActive from "../../../assets/Home_active.svg";
import Challenge from "../../../assets/Challenge_gray.svg";
import ChallengeActive from "../../../assets/Challenge.svg";
import Community from "../../../assets/Social_gray.svg";
import CommunityActive from "../../../assets/Social.svg";
import MyPage from "../../../assets/MyPage.svg";
import MyPageActive from "../../../assets/myPage_active.svg";

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${theme.colors.bg[0]};
  border-top: 1px solid ${theme.colors.gray[200]};
  box-shadow: 0 3px 16px 0 rgba(210, 210, 210, 0.4);
  z-index: 1000;
`;

const BottomNavBox = styled.div`
  max-width: 720px;
  margin: 4px auto;
  display: flex;
  justify-content: space-around;
  gap: 12px;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  color: ${theme.colors.gray[400]};

  font-size: 13px;
  line-height: 1.3;
  letter-spacing: -0.13;
  text-align: center;

  &.active {
    color: ${theme.colors.primary[400]};
    font-weight: 600;
  }
`;

const Icon = styled.img<{ active?: boolean }>`
  width: 32px;
  height: 32px;
  margin-bottom: 4px;
`;

const BottomNavigation: React.FC = () => {
  return (
    <BottomNavContainer>
      <BottomNavBox>
        <NavItem to="/main">
          {({ isActive }) => (
            <>
              <Icon src={isActive ? HomeActive : Home} alt="홈" />
              <div>홈</div>
            </>
          )}
        </NavItem>

        <NavItem to="/challenge">
          {({ isActive }) => (
            <>
              <Icon src={isActive ? ChallengeActive : Challenge} alt="검색" />
              <div>챌린지</div>
            </>
          )}
        </NavItem>

        <NavItem to="/community">
          {({ isActive }) => (
            <>
              <Icon
                src={isActive ? CommunityActive : Community}
                alt="커뮤니티"
              />
              <div>주간제주</div>
            </>
          )}
        </NavItem>

        <NavItem to="/mypage">
          {({ isActive }) => (
            <>
              <Icon src={isActive ? MyPageActive : MyPage} alt="마이페이지" />
              <div>마이페이지</div>
            </>
          )}
        </NavItem>
      </BottomNavBox>
    </BottomNavContainer>
  );
};

export default BottomNavigation;
