import styled from '@emotion/styled';
import ImgSlider from 'src/components/community/PostDetail/ImgSlider';
import BackHeader from 'src/components/commons/Header/BackHeader';
import PostBox from 'src/components/community/PostDetail/PostBox';
import { useParams } from 'react-router-dom';
import CommentList from 'src/components/community/Comment/CommnentList';
import CommentInput from 'src/components/community/Comment/CommnetInput';
import { useState } from 'react';
import CommentPopup from 'src/components/popup/CommnetPopup';
import { useSpotDetail } from 'src/features/spot/useSpotDetail';
import { Title } from 'src/components/challenge-card/style';
import { usePostComment, usePostReply } from 'src/features/spot/useComment';
import { useAllComments } from 'src/features/spot/useAllComments';

const ContentWrapper = styled.div``;

const PostDetailPage:React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const spotId = Number(id);

  const { data: post, isLoading, isError } = useSpotDetail(spotId);
  // const { data: commentData } = useComments(spotId);
  const { comments } = useAllComments(spotId);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [replyTarget, setReplyTarget] = useState<number | null>(null);

  const { mutate: postComment } = usePostComment(spotId);
  const { mutate: postReply } = usePostReply();

  const handleSubmit = (text: string) => {
    if(replyTarget) {
      console.log("submit replyTarget:", replyTarget);
      postReply({ spotId, parentReplyId: replyTarget, text });
      setReplyTarget(null);
    } else {
      postComment(text);
    }
    setComment('');
    setOpen(false);
  }

  if (isLoading) return <div>로딩중...</div>;
  if (isError || !post) return <div>포스트를 찾을 수 없습니다.</div>;

  return (
    <>
      {/* TODO: 햄버거버튼 → 신고하기 기능 넣기(UI 없지만 List에서 재탕하기) */}
      <BackHeader />
      <ContentWrapper>
        <Title style={{ paddingLeft: '20px'}}>{post.name}</Title>
        {/* 이미지 슬라이더 */}
        <ImgSlider images={post.imageUrls ?? []}/>
        {/* Detail */}
        <PostBox post={post}/>
      </ContentWrapper>
      {/* 이하 기존 댓글, 입력창 등은 그대로 유지 */}
      <CommentList 
        data={{ content: comments, totalElements: comments.length, hasNext: false }}
        spotId={spotId}
        onReply={(parentId) => {
           console.log("setReplyTarget parentId:", parentId); 
          setReplyTarget(parentId)
          setOpen(true)
        }}
      />
      <CommentInput 
        value={comment}
        onChange={setComment}
        onSubmit={handleSubmit}
        onFocus={() => {
    if (replyTarget === null) { // ✅ 일반 댓글일 때만 팝업 열기
      setOpen(true);
    }
  }}
      />

      <div style={{ height: '100px' }}></div>

      {/* 댓글 팝업 */}
      <CommentPopup 
        open={open}
        onClose={() => {
          setReplyTarget(null);
          setOpen(false)
        }}
        comments={{ content: comments, totalElements: comments.length, hasNext: false }} // 서버데이터로 바꾸기
        spotId={spotId}
      />
    </>
  );
};

export default PostDetailPage; 