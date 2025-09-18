import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'src/utils/formDate';

import ReportModal from '../../modal/ReportModal';

import type { Spot } from 'src/reducer/types';
import { communityApi } from 'src/api/community';
import { updatePostLike } from 'src/redux/community/reducer';

import { FiHeart, 
  // FiMessageCircle, 
FiMoreHorizontal } from 'react-icons/fi';
import { ActionButton, ActionContent, ActionIcon, ActionSection, Avatar, CardContainer, CardContent, ContentSection, Date, ImageContainer, LocationIcon, LocationTag, LocationText, MoreButton, PostImage, PostSection, PostText, ProfileContent, ProfileInfo, ProfileSection, ReportButton, Username } from './style';

interface PostCardProps {
  post: Spot;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showReport, setShowReport] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const dispatch = useDispatch();
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

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    try {
      if (post.likedByMe) {
        await communityApi.unlikeSpot(post.id);
        dispatch(updatePostLike({ id: post.id, liked: false }));
      } else {
        await communityApi.likeSpot(post.id);
        dispatch(updatePostLike({ id: post.id, liked: true }));
      }
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
    }
  }

  return (
    <>
      <CardContainer onClick={() => navigate(`/post/${post.id}`)}>
        <CardContent>
          <ProfileSection>
            <ProfileContent>
              <Avatar>
                <img src={post.userProfile} />
              </Avatar>
              <ProfileInfo>
                <Username>{post.userNickname}</Username>
                <Date>{formatDate(post.createdAt)}</Date>
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
            <ImageContainer>
              {post.imageUrls.map((image, index) => (
                <PostImage key={index} image={image} />
              ))}
            </ImageContainer>
              <ContentSection>
                <LocationTag>
                  <LocationIcon size={17} />
                  <LocationText>{post.name}</LocationText>
                </LocationTag>
                
                <PostText>
                  {post.description}
                </PostText>
              </ContentSection>

            <ActionSection>
              <ActionButton onClick={handleLike}>
                <ActionContent>
                  <ActionIcon>
                    <FiHeart 
                      size={20} 
                      color={post.likedByMe ? "#FF8B4C" : "currentColor"}
                      fill={post.likedByMe ? "#FF8B4C" : "none"}
                    />
                  </ActionIcon>
                  <span>좋아요 {post.likeCount || 0}</span>
                </ActionContent>
              </ActionButton>
              
              {/* <ActionButton onClick={e => e.stopPropagation()}>
                <ActionContent>
                  <ActionIcon>
                    <FiMessageCircle size={20} />
                  </ActionIcon>
                  <span>댓글 달기 {post.comments || 0}</span>
                </ActionContent>
              </ActionButton> */}
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