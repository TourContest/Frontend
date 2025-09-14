import { useState } from 'react';
import type { Post } from '../types';
import { FiHeart, FiMessageCircle, FiMoreHorizontal } from 'react-icons/fi';

import ReportModal from '../../modal/ReportModal';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionContent, ActionIcon, ActionSection, Avatar, CardContainer, CardContent, ContentSection, Date, ImageContainer, LocationIcon, LocationTag, LocationText, MoreButton, PostImage, PostSection, PostText, ProfileContent, ProfileInfo, ProfileSection, ReportButton, Username } from './style';
import Profile from '../../../assets/default_profile.svg';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showReport, setShowReport] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const handleMoreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowReport(!showReport);
  };

  const handleReportClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowReportModal(true);
    setShowReport(false);
  };

  const handleReportSubmit = (reason: string) => {
    console.log('신고 제출:', { postId: post.id, reason });
    // TODO: API 호출로 신고 처리
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setLiked(prev => !prev);
    // TODO: 좋아요 API 호출 처리
  }

  return (
    <>
      <CardContainer onClick={() => navigate(`/post/${post.id}`)}>
        <CardContent>
          <ProfileSection>
            <ProfileContent>
              <Avatar>
                <img src={Profile} />
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
                  <LocationIcon size={17} />
                  <LocationText>{post.location}</LocationText>
                </LocationTag>
                
                <PostText>
                  {post.content}
                </PostText>
              </ContentSection>

            <ActionSection>
              <ActionButton onClick={handleLike}>
                <ActionContent>
                  <ActionIcon>
                    <FiHeart 
                      size={20} 
                      color={liked ? "#FF8B4C" : "currentColor"}
                      fill={liked ? "#FF8B4C" : "none"}
                    />
                  </ActionIcon>
                  <span>좋아요 {post.likes || 0}</span>
                </ActionContent>
              </ActionButton>
              
              <ActionButton onClick={e => e.stopPropagation()}>
                <ActionContent>
                  <ActionIcon>
                    <FiMessageCircle size={20} />
                  </ActionIcon>
                  <span>댓글 달기 {post.comments || 0}</span>
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