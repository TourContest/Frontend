import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FiHeart, FiMessageCircle, FiMapPin, FiMoreHorizontal, FiUser } from 'react-icons/fi';
import { theme } from '../../../styles/theme';
import ReportModal from '../../community/modals/ReportModal';
import { useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  width: 347px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 12px 14px 0px;
  background-color: ${theme.colors.bg[0]};
  border-radius: 12px;
  box-shadow: ${theme.shadow.shadow1.x}px ${theme.shadow.shadow1.y}px ${theme.shadow.shadow1.blur}px ${theme.shadow.shadow1.spread}px ${theme.shadow.shadow1.color};
  cursor: pointer;
`;

const CardContent = styled.div`
  width: 315px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const ProfileSection = styled.div`
  width: 315px;
  height: 41px;
  position: relative;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 9px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AvatarIcon = styled(FiUser)`
  width: 24px;
  height: 24px;
  color: ${theme.colors.gray[400]};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  width: 111px;
`;

const Username = styled.div`
  font-family: ${theme.typography.body1.fontFamily};
  font-weight: ${theme.typography.body1.fontWeight};
  font-size: ${theme.typography.body1.fontSize};
  line-height: ${theme.typography.body1.lineHeight};
  color: ${theme.colors.gray[800]};
`;

const Date = styled.div`
  font-family: ${theme.typography.caption1.fontFamily};
  font-weight: ${theme.typography.caption1.fontWeight};
  font-size: ${theme.typography.caption1.fontSize};
  line-height: ${theme.typography.caption1.lineHeight};
  color: ${theme.colors.gray[400]};
`;

const MoreButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[400]};
`;

const ReportButton = styled.button`
  width: 100px;
  height: 37px;
  border: none;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border-radius: 12px;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.1);
  font-family: ${theme.typography.caption1.fontFamily};
  font-weight: ${theme.typography.caption1.fontWeight};
  font-size: ${theme.typography.caption1.fontSize};
  color: ${theme.colors.gray[600]};
  cursor: pointer;
  position: absolute;
  top: 6px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
  gap: 18px;
  width: 100%;
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  gap: 19px;
  width: 100%;
`;

const ImageContainer = styled.div<{ imageCount: number }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  
  ${props => {
    if (props.imageCount === 1) {
      return `
        justify-content: stretch;
        align-items: stretch;
        gap: 5px;
      `;
    } else if (props.imageCount === 2) {
      return `
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
      `;
    } else {
      return `
        justify-content: flex-start;
        align-items: center;
        gap: 8px;
      `;
    }
  }}
`;

const PostImage = styled.div<{ imageCount: number; index: number }>`
  background-color: ${theme.colors.gray[100]};
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 6px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiBmaWxsPSIjRjBGMUYxIi8+Cjx0ZXh0IHg9IjY1IiB5PSI2NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+7ZmU6rWQ8L3RleHQ+Cjwvc3ZnPgo=');
  background-size: cover;
  background-position: center;
  
  ${props => {
    if (props.imageCount === 1) {
      return `
        width: 100%;
        height: 130px;
      `;
    } else if (props.imageCount === 2) {
      return `
        width: 165px;
        height: 130px;
      `;
    } else {
      return `
        width: 130px;
        height: 130px;
      `;
    }
  }}
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 315px;
`;

const LocationTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 6px 7px;
  background-color: ${theme.colors.gray[100]};
  border-radius: 50px;
  height: 26px;
  width: fit-content;
`;

const LocationIcon = styled(FiMapPin)`
  width: 20px;
  height: 20px;
  color: ${theme.colors.gray[400]};
`;

const LocationText = styled.span`
  font-family: ${theme.typography.caption1.fontFamily};
  font-weight: ${theme.typography.caption1.fontWeight};
  font-size: ${theme.typography.caption1.fontSize};
  line-height: ${theme.typography.caption1.lineHeight};
  color: ${theme.colors.gray[500]};
`;

const PostText = styled.div`
  width: 309px;
  font-family: ${theme.typography.body4.fontFamily};
  font-weight: ${theme.typography.body4.fontWeight};
  font-size: ${theme.typography.body4.fontSize};
  line-height: ${theme.typography.body4.lineHeight};
  color: ${theme.colors.gray[600]};
  text-align: left;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  padding: 8px 0px;
  border-top: 0.5px solid ${theme.colors.gray[200]};
  width: 100%;
`;

const ActionButton = styled.button`
  width: 147px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ActionContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const ActionIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[300]};
  font-size: 16px;
`;

const ActionText = styled.span`
  font-family: ${theme.typography.caption1.fontFamily};
  font-weight: ${theme.typography.caption1.fontWeight};
  font-size: ${theme.typography.caption1.fontSize};
  line-height: ${theme.typography.caption1.lineHeight};
  color: ${theme.colors.gray[500]};
`;

export interface Post {
  id: number;
  username: string;
  date: string;
  location: string;
  content: string;
  images: string[];
  hasReport: boolean;
  likes?: number;
  comments?: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showReport, setShowReport] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const navigate = useNavigate();

  const handleMoreClick = () => {
    setShowReport(!showReport);
  };

  const handleReportClick = () => {
    setShowReportModal(true);
    setShowReport(false);
  };

  const handleReportSubmit = (reason: string) => {
    console.log('신고 제출:', { postId: post.id, reason });
    // TODO: API 호출로 신고 처리
  };

  return (
    <>
      <CardContainer onClick={() => navigate(`/post/${post.id}`)}>
        <CardContent>
          <ProfileSection>
            <ProfileContent>
              <Avatar>
                <AvatarIcon />
              </Avatar>
              <ProfileInfo>
                <Username>{post.username}</Username>
                <Date>{post.date}</Date>
              </ProfileInfo>
            </ProfileContent>
            
            <MoreButton onClick={handleMoreClick}>
              <FiMoreHorizontal size={20} />
            </MoreButton>
            
            {showReport && (
              <ReportButton onClick={handleReportClick}>
                신고하기
              </ReportButton>
            )}
          </ProfileSection>

          <PostSection>
            <ImageSection>
              <ImageContainer imageCount={post.images.length}>
                {post.images.map((image, index) => (
                  <PostImage 
                    key={index} 
                    imageCount={post.images.length} 
                    index={index}
                  />
                ))}
              </ImageContainer>
              
              <ContentSection>
                <LocationTag>
                  <LocationIcon />
                  <LocationText>{post.location}</LocationText>
                </LocationTag>
                
                <PostText>
                  {post.content}
                </PostText>
              </ContentSection>
            </ImageSection>

            <ActionSection>
              <ActionButton onClick={e => e.stopPropagation()}>
                <ActionContent>
                  <ActionIcon>
                    <FiHeart size={20} />
                  </ActionIcon>
                  <ActionText>좋아요 {post.likes || 0}</ActionText>
                </ActionContent>
              </ActionButton>
              
              <ActionButton onClick={e => e.stopPropagation()}>
                <ActionContent>
                  <ActionIcon>
                    <FiMessageCircle size={20} />
                  </ActionIcon>
                  <ActionText>댓글 달기 {post.comments || 0}</ActionText>
                </ActionContent>
              </ActionButton>
            </ActionSection>
          </PostSection>
        </CardContent>
      </CardContainer>

      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />
    </>
  );
};

export default PostCard; 