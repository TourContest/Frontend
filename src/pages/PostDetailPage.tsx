// src/pages/PostDetailPage.tsx
import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import TopNavigation from '../components/comu2/TopNavigation';
import BottomNavigation from '../components/comu2/BottomNavigation';
import { FiUser } from 'react-icons/fi';
import reactLogo from '../assets/react.svg'; // 이미지가 src/assets에 있을 때

const PageWrapper = styled.div`
  padding-top: 88px;      /* TopNavigation 높이 */
  padding-bottom: 150px;  /* BottomNavigation(90) + 댓글 입력창(60) */
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

/* --- 상단 배너/이미지 섹션 --- */
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

/* --- 댓글 영역 --- */
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

/* --- 댓글 입력창 --- */
const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 90px; /* BottomNavigation 높이만큼 위에 배치 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
  background: ${({ theme }) => theme.colors.bg[0]};
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
  z-index: 999;
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

/* ===== 페이지 컴포넌트 ===== */
const PostDetailPage: FunctionComponent = () => (
  <PageWrapper>
    <ContentWrapper>
      <TopNavigation />

      {/* 상단 이미지/텍스트 */}
      <ResourcePhotoContainerParent>
        <ResourcePhotoContainer>
          <ResourcePhoto alt="" src={reactLogo} />
          <ResourcePhoto alt="" src={reactLogo} />
          <ResourcePhoto alt="" src={reactLogo} />
        </ResourcePhotoContainer>

        <ResourcePost>
          <ResourcePostText>
            이 기분 오래오래 간직하고 싶다. 사진보다 눈으로 보는 게 더 예쁨. 자꾸만 마음이 느긋해지는 느낌…
          </ResourcePostText>
        </ResourcePost>
      </ResourcePhotoContainerParent>

      {/* 댓글 */}
      <CommentCountBar>99개의 댓글</CommentCountBar>

      <CommentContainer>
        <CommentRow>
          <Avatar>
            <AvatarIcon>
              <FiUser />
            </AvatarIcon>
          </Avatar>
          <CommentContent>
            <CommentHeader>
              <CommentUser>닉네임은몇자까지</CommentUser>
              <CommentTime>2w</CommentTime>
            </CommentHeader>
            <CommentText>
              댓글내용입력하기. 댓글 내용 최대 몇자까지 가능한가요. 제한 안하나요 많이 달면 콘텐츠창 늘어남
            </CommentText>
            <CommentActions>
              <span>99+</span>
              <span>99+</span>
            </CommentActions>
          </CommentContent>
        </CommentRow>

        {/* 대댓글 예시 */}
        <CommentRow style={{ paddingLeft: 30 }}>
          <Avatar>
            <AvatarIcon>
              <FiUser />
            </AvatarIcon>
          </Avatar>
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
          <CommentInputIcon src="/assets/Normal.svg" alt="" />
        </CommentInputButton>
      </CommentInputContainer>
    </ContentWrapper>

    <BottomNavigation />
  </PageWrapper>
);

export default PostDetailPage;
