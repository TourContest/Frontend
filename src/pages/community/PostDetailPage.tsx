import styled from '@emotion/styled';
import ImgSlider from 'src/components/community/PostDetail/ImgSlider';
import BackHeader from 'src/components/commons/Header/BackHeader';
import PostBox from 'src/components/community/PostDetail/PostBox';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';
import { useParams } from 'react-router-dom';
import { mapPostDetail } from 'src/components/community/PostDetail/types'; // API 연동시 지우기
import CommentList from 'src/components/community/Comment/CommnentList';
import { dummyComments } from 'src/components/community/Comment/dummyComment';
import CommentInput from 'src/components/community/Comment/CommnetInput';
import { useState } from 'react';
import CommentPopup from 'src/components/popup/CommnetPopup';

const ContentWrapper = styled.div``;

const PostDetailPage:React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = useSelector((state: RootState) => 
    state.community.posts.find((p) => p.id === Number(id))
  );

  if (!post) return <div>포스트를 찾을 수 없습니다.</div>;

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleSubmit = (text: string) => {
    console.log('댓글 등록', text)
    setComment('');
    setOpen(false);
  }

  // Post → PostDetail (뮤테이션시 삭제)
  const detailPost = mapPostDetail(post);

  return (
    <>
      {/* TODO: 햄버거버튼 → 신고하기 기능 넣기(UI 없지만 List에서 재탕하기) */}
      <BackHeader />
      <ContentWrapper>
        {/* 이미지 슬라이더 */}
        <ImgSlider images={detailPost.imageUrls ?? []}/>
        {/* Detail */}
        <PostBox post={detailPost}/>
      </ContentWrapper>
      {/* 이하 기존 댓글, 입력창 등은 그대로 유지 */}
      <CommentList data={dummyComments}/>
      <CommentInput 
        value={comment}
        onChange={setComment}
        onSubmit={handleSubmit}
        onFocus={() => setOpen(true)}
      />

      {/* 댓글 팝업 */}
      <CommentPopup 
        open={open}
        onClose={() => setOpen(false)}
        comments={dummyComments.content} // 서버데이터로 바꾸기
        onSubmit={handleSubmit} // API 연동
      />
    </>
  );
};

export default PostDetailPage; 