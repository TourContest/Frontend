import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import TopNavigationTopNavigation from './TopNavigationTopNavigation';
import { FiUser, FiMapPin, FiMap, FiChevronLeft } from 'react-icons/fi';

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.bg[0]};
`;
const ContentWrapper = styled.div`
  width: 100%;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
`;
// 1. TopNavigation
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
  height: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const Time = styled.div`
  width: 93px;
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 13px 30.5px;
  font-weight: 600;
  letter-spacing: -0.02em;
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
const Bar = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Navigation = styled.div`
  width: 100%;
  position: relative;
  height: 44px;
`;
const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 14px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;
const TopNavigation: FunctionComponent = () => {
  return (
    <TopNavigationContainer>
      <StatusSafeArea>
        <Container>
          <BackButton onClick={() => window.history.back()} aria-label="뒤로가기">
            <FiChevronLeft size={24} />
          </BackButton>
          <Time>9:41</Time>
          <Status>
            <Content>
              <img style={{ width: 18, height: 12 }} alt="" src="Celluar.png" />
              <img style={{ width: 16, height: 12 }} alt="" src="Wi-Fi.png" />
            </Content>
          </Status>
        </Container>
      </StatusSafeArea>
      <Bar>
        <Navigation>
          {/* 네비 아이콘 등 */}
        </Navigation>
      </Bar>
    </TopNavigationContainer>
  );
};

// 2. Rectangle211 (상단 이미지/배너)
const RectangleDiv = styled.div`
  width: 100%;
  max-width: 375px;
  height: 260px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray[300]};
  margin: 0 auto 24px auto;
  position: relative;
`;

// 3. 게시글 정보
const PostInfoContainer = styled.div`
  width: 100%;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.bg[0]};
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
  color: ${({ theme }) => theme.colors.base[100]};
`;
const PostHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  padding: 20px;
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.gray[200]};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const AvatarIcon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 32px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
const UserName = styled.div`
  font-weight: 500;
  line-height: 140%;
`;
const UserDate = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[400]};
  line-height: 140%;
`;
const PostContent = styled.div`
  width: 330px;
  margin: 0 20px 20px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[700]};
  line-height: 140%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;

// 4. 댓글 개수
const CommentCountBar = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  box-sizing: border-box;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[700]};
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
`;

// 5. 댓글/대댓글
const CommentContainer = styled.div`
  width: 100%;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 30px;
  box-sizing: border-box;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.base[100]};
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
`;
const CommentRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;
const CommentAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`;
const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
const CommentUser = styled.div`
  font-weight: 500;
  line-height: 140%;
`;
const CommentTime = styled.div`
  color: ${({ theme }) => theme.colors.gray[400]};
  font-size: 13px;
`;
const CommentText = styled.div`
  color: ${({ theme }) => theme.colors.gray[700]};
  line-height: 140%;
`;
const CommentActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: 4px;
`;

// 6. 댓글 입력창
const CommentInputContainer = styled.div`
  width: 100%;
  max-width: 375px;
  background: ${({ theme }) => theme.colors.bg[0]};
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;
const CommentInputBox = styled.input`
  flex: 1;
  border: none;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.typography.body1.fontFamily};
  color: ${({ theme }) => theme.colors.base[100]};
  outline: none;
`;
const CommentInputButton = styled.button`
  width: 40px;
  height: 40px;
  margin-left: 8px;
  background: ${({ theme }) => theme.colors.primary[400]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
`;
const CommentInputIcon = styled.img`
  width: 24px;
  height: 24px;
`;

// Frame244 스타일 및 컴포넌트
const ResourcePhotoContainerParent = styled.div`
  width: 100%;
  max-width: 375px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 19px;
  text-align: left;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[500]};
  font-family: Pretendard;
`;
const ResourcePhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`;
const ResourcePhoto = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 6px;
  object-fit: cover;
`;
const ResourceLocalTagParent = styled.div`
  width: 315px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px;
`;
const ResourceLocalTag = styled.div`
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  height: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6px 7px;
  box-sizing: border-box;
`;
const IconsParent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
`;
const Icons = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`;
const TagText = styled.div`
  position: relative;
  line-height: 130%;
  font-weight: 500;
`;
const ResourcePost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[600]};
`;
const ResourcePostText = styled.div`
  width: 309px;
  position: relative;
  line-height: 140%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  flex-shrink: 0;
`;

const PostDetailPage: FunctionComponent = () => (
  <PageWrapper>
    <ContentWrapper>
      <TopNavigationTopNavigation />
      {/* Frame244 영역 시작 */}
      <ResourcePhotoContainerParent>
        <ResourcePhotoContainer>
          <ResourcePhoto alt="" src="/src/assets/react.svg" />
          <ResourcePhoto alt="" src="/src/assets/react.svg" />
          <ResourcePhoto alt="" src="/src/assets/react.svg" />
        </ResourcePhotoContainer>
        {/* 위치 태그 및 텍스트 제거됨 */}
        <ResourcePost>
          <ResourcePostText>
            이 기분 오래오래 간직하고 싶다.사진보다 눈으로 보는 게 더 예쁨 자꾸만 마음이 느긋해지는 느낌 아무 말 없이도 충격
          </ResourcePostText>
        </ResourcePost>
      </ResourcePhotoContainerParent>
      {/* Frame244 영역 끝 */}
      {/* 이하 기존 댓글, 입력창 등은 그대로 유지 */}
      <CommentCountBar>
        99개의 댓글
      </CommentCountBar>
      <CommentContainer>
        <CommentRow>
          <CommentAvatar>
            <AvatarIcon>
              <FiUser />
            </AvatarIcon>
          </CommentAvatar>
          <CommentContent>
            <CommentHeader>
              <CommentUser>닉네임은몇자까지</CommentUser>
              <CommentTime>2w</CommentTime>
            </CommentHeader>
            <CommentText>댓글내용입력하기. 댓글 내용 최대 몇자까지 가능한가요. 제한 안하나요 많이 달면 콘텐츠창 늘어남</CommentText>
            <CommentActions>
              <span>99+</span>
              <span>99+</span>
            </CommentActions>
          </CommentContent>
        </CommentRow>
        {/* 대댓글 예시 */}
        <CommentRow style={{ paddingLeft: 30 }}>
          <CommentAvatar>
            <AvatarIcon>
              <FiUser />
            </AvatarIcon>
          </CommentAvatar>
          <CommentContent>
            <CommentHeader>
              <CommentUser>닉네임은몇자까지</CommentUser>
              <CommentTime>2w</CommentTime>
            </CommentHeader>
            <CommentText>대댓글 내용입니다.</CommentText>
            <CommentActions>
              <span>99+</span>
              <span>99+</span>
            </CommentActions>
          </CommentContent>
        </CommentRow>
      </CommentContainer>
      <CommentInputContainer>
        <CommentInputBox placeholder="댓글을 달아주세요." />
        <CommentInputButton>
          <CommentInputIcon src="Normal.svg" alt="" />
        </CommentInputButton>
      </CommentInputContainer>
    </ContentWrapper>
  </PageWrapper>
);

export default PostDetailPage; 