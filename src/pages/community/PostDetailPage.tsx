// src/pages/community/PostDetailPage.tsx
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'src/store';

import ImgSlider from 'src/components/community/PostDetail/ImgSlider';
import BackHeader from 'src/components/commons/Header/BackHeader';
import PostBox from 'src/components/community/PostDetail/PostBox';
import { mapPostDetail } from 'src/components/community/PostDetail/types';

import {
    fetchSpotDetail, type SpotDetailDto,
    fetchSpotComments, postSpotComment,
    fetchSpotReplies, postSpotReply,
    putComment, deleteComment,
    likeSpot, unlikeSpot,
    type ReplyDto, type Page
} from 'src/api/spot';

const TitleBar = styled.h1`
    padding: 6px 12px;        /* 위·아래 최소 여백 */
    margin: 0;                /* 기본 마진 제거 */
    text-align: center;       /* 가운데 정렬 */
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;         /* 촘촘하게 */
    color: #111827;
    border-bottom: 1px solid #efefef;
`;

const Spacer = styled.div`
  height: 8px;
`;

const ContentWrapper = styled.div`
  padding-bottom: 100px;
  background: white;
`;

// 인스타 스타일 포스트 섹션
const PostSection = styled.div`
  background: white;
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #efefef;
`;

const ProfileAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  
  &::after {
    content: '';
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f5f5f5;
  }
`;

const PostHeaderInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #262626;
  margin-bottom: 2px;
`;

const PostMeta = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  display: flex;
  gap: 4px;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 16px;
`;

const ActionButton = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
  color: ${props => props.active ? '#ed4956' : '#262626'};
  transition: color 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`;

const LikeCount = styled.div`
  padding: 0 16px 8px;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
`;

const PostContent = styled.div`
  padding: 0 16px 12px;
`;

const PostDescription = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #262626;
  
  .author {
    font-weight: 600;
    margin-right: 8px;
  }
`;

const PostTags = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  color: #00376b;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ThemeBadge = styled.div`
  display: inline-block;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const CommentsSection = styled.div`
  padding: 20px 16px;
  border-top: 1px solid #efefef;
`;

const CommentHeader = styled.div`
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const CommentItem = styled.div`
  margin-bottom: 16px;
`;

const CommentContent = styled.div<{ depth: number }>`
  display: flex;
  padding-left: ${props => props.depth * 40}px;
  margin-bottom: 12px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e5e5;
  margin-right: 12px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentBody = styled.div`
  flex: 1;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  font-size: 13px;
`;

const Nickname = styled.span`
  font-weight: 600;
  color: #333;
`;

const Time = styled.span`
  color: #666;
`;

const CommentText = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: #333;
  margin-bottom: 8px;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #666;
`;

const ActionButton1 = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  
  &:hover {
    color: #333;
  }
`;

const LoadMoreButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 8px 0;
  margin-left: 44px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 16px;
  z-index: 100;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CommentInput = styled.textarea`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 12px 16px;
  resize: none;
  font-size: 14px;
  outline: none;
  max-height: 100px;
  
  &:focus {
    border-color: #1976d2;
  }
`;

const SendButton = styled.button`
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ReplyInput = styled.div`
  margin-left: 44px;
  margin-top: 8px;
  margin-bottom: 12px;
`;

const ReplyInputField = styled.textarea`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  resize: none;
  font-size: 13px;
  outline: none;
  
  &:focus {
    border-color: #1976d2;
  }
`;

const ReplyActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

const ReplyActionButton = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? '#1976d2' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#666'};
  border: none;
  border-radius: 18px;
  padding: 6px 16px;
  font-size: 13px;
  cursor: pointer;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

type DetailVM = {
    id: number;
    title: string;
    nickname: string;
    createdAtStr: string;
    content: string;
    imageUrls: string[];
    likeCount: number;
    likedByMe: boolean;
    viewCount: number;
    type: string;
    tags: string[];
    themeName: string | null;
    commentCount: number;
};

type CommentVM = {
    id: number;
    parentReplyId: number | null;
    depth: number;
    text: string;
    nickname: string;
    profileImageUrl?: string;
    isDeleted: boolean;
    createdAt: string;
    replies: CommentVM[];
    showReplies: boolean;
    repliesLoaded: boolean;
    hasMoreReplies: boolean;
    repliesPage: number;
    replyCount: number;
};

function fmtDate(iso?: string | null) {
    if (!iso) return '';
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
}

function fmtRelativeTime(iso: string): string {
    const now = new Date();
    const date = new Date(iso);
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return fmtDate(iso);
}

function mapDetailToVM(d: SpotDetailDto): DetailVM {
    return {
        id: d.id,
        title: d.name,
        nickname: d.authorNickname ?? '익명',
        createdAtStr: fmtDate(d.createdAt),
        content: d.description ?? '',
        imageUrls: d.imageUrls ?? [],
        likeCount: d.likeCount ?? 0,
        likedByMe: d.likedByMe ?? false,
        viewCount: d.viewCount ?? 0,
        type: d.type,
        tags: d.tags ?? [],
        themeName: d.themeName ?? null,
        commentCount: d.commentCount ?? 0,
    };
}

function mapReplyToComment(r: ReplyDto): CommentVM {
    return {
        id: r.id,
        parentReplyId: r.parentReplyId,
        depth: r.depth,
        text: r.text,
        nickname: r.nickname,
        profileImageUrl: r.profileImageUrl,
        isDeleted: r.isDeleted,
        createdAt: r.createdAt,
        replies: [],
        showReplies: false,
        repliesLoaded: false,
        hasMoreReplies: false,
        repliesPage: 0,
        replyCount: r.replyCount ?? 0,
    };
}

const PostDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const spotId = Number(id);

    const reduxPost = useSelector((state: RootState) =>
        state.community.posts.find((p) => p.id === spotId)
    );

    const [vm, setVM] = useState<DetailVM | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    // 댓글 상태
    const [comments, setComments] = useState<CommentVM[]>([]);
    const [commentsPage, setCommentsPage] = useState(0);
    const [hasMoreComments, setHasMoreComments] = useState(false);
    const [loadingComments, setLoadingComments] = useState(false);

    // 입력 상태
    const [newComment, setNewComment] = useState('');
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');

    // 게시글 상세 정보 로드
    useEffect(() => {
        let aborted = false;
        (async () => {
            try {
                setLoading(true);
                setErr(null);

                if (reduxPost && !aborted) {
                    const m = mapPostDetail(reduxPost);
                    setVM({
                        id: m.id,
                        title: m.title ?? reduxPost.title ?? '',
                        nickname: m.nickname ?? reduxPost.nickname ?? '익명',
                        createdAtStr: m.createdAtStr ?? fmtDate(reduxPost.createdAt),
                        content: m.content ?? '',
                        imageUrls: m.imageUrls ?? [],
                        likeCount: m.likeCount ?? reduxPost.likeCount ?? 0,
                        viewCount: m.viewCount ?? reduxPost.viewCount ?? 0,
                        type: m.type ?? 'POST',
                        tags: m.tags ?? [],
                        themeName: m.themeName ?? null,
                        commentCount: 0,
                    });
                }

                const d = await fetchSpotDetail(spotId);
                if (!aborted) setVM(mapDetailToVM(d));
            } catch (e: unknown) {
                if (!aborted) setErr(e instanceof Error ? e.message : '상세 조회 실패');
            } finally {
                if (!aborted) setLoading(false);
            }
        })();
        return () => { aborted = true; };
    }, [spotId, reduxPost]);

    // 최상위 댓글 로드
    const loadComments = useCallback(async (page = 0, append = false) => {
        try {
            setLoadingComments(true);
            const res = await fetchSpotComments(spotId, page, 20);

            const newComments = (res.content || []).map(mapReplyToComment);

            setComments(prev => append ? [...prev, ...newComments] : newComments);
            setCommentsPage(page);
            setHasMoreComments(res.hasNext);
        } catch (error) {
            console.error('댓글 로드 실패:', error);
        } finally {
            setLoadingComments(false);
        }
    }, [spotId]);

    // 대댓글 로드
    const loadReplies = useCallback(async (parentId: number, page = 0) => {
        try {
            const res = await fetchSpotReplies(spotId, parentId, page, 20);
            const newReplies = (res.content || []).map(mapReplyToComment);

            setComments(prev => prev.map(comment => {
                if (comment.id === parentId) {
                    const merged = page === 0 ? newReplies : [...comment.replies, ...newReplies];
                    return {
                        ...comment,
                        replies: merged,
                        showReplies: true,
                        repliesLoaded: true,
                        hasMoreReplies: res.hasNext,   // ✅
                        repliesPage: page,
                    };
                }
                return comment;
            }));
        } catch (e) {
            console.error('대댓글 로드 실패:', e);
        }
    }, [spotId]);

    // 초기 댓글 로드
    useEffect(() => {
        loadComments(0);
    }, [loadComments]);

    // 최상위 댓글 작성
    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        try {
            await postSpotComment(spotId, newComment.trim());
            setNewComment('');

            setVM(prev => (prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev));

            // 서버 최신 목록으로 다시 로드(선택이지만 보통 유지 권장)
            await loadComments(0);

            // ※ 만약 vm.commentCount가 "대댓글까지 포함한 전체 개수"라면
            // 대댓글 작성 때도 +1 해야 합니다(아래 2) 참고).
        } catch (error) {
            console.error('댓글 작성 실패:', error);
        }
    };

    // 대댓글 작성
    const handleSubmitReply = async (parentId: number) => {
        if (!replyText.trim()) return;

        try {
            await postSpotReply(spotId, parentId, replyText.trim());
            setReplyText('');
            setReplyingTo(null);

            setComments(prev =>
                prev.map(c => (c.id === parentId ? { ...c, replyCount: c.replyCount + 1 } : c))
            );

            // 최신 대댓글 목록으로 다시 로드
            await loadReplies(parentId, 0);

            // (옵션) vm.commentCount가 "전체(대댓글 포함) 개수"라면 여기도 +1
            // setVM(prev => (prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev));
        } catch (error) {
            console.error('대댓글 작성 실패:', error);
        }
    };

    // 댓글 더보기
    const handleLoadMoreComments = () => {
        if (!loadingComments && hasMoreComments) {
            loadComments(commentsPage + 1, true);
        }
    };

    // 좋아요 기능
    const handleLike = async () => {
        if (!vm) return;

        try {
            if (vm.likedByMe) {
                await unlikeSpot(spotId);
            } else {
                await likeSpot(spotId);
            }

            // UI 업데이트
            setVM(prev => prev ? {
                ...prev,
                likedByMe: !prev.likedByMe,
                likeCount: prev.likedByMe ? prev.likeCount - 1 : prev.likeCount + 1,
            } : null);

        } catch (error) {
            console.error('좋아요 처리 실패:', error);
        }
    };

    // 대댓글 토글
    const toggleReplies = (commentId: number) => {
        setComments(prev => prev.map(comment => {
            if (comment.id === commentId) {
                if (!comment.repliesLoaded) {
                    loadReplies(commentId, 0);
                }
                return { ...comment, showReplies: !comment.showReplies };
            }
            return comment;
        }));
    };

    // 댓글 컴포넌트
    const CommentComponent: React.FC<{ comment: CommentVM }> = ({ comment }) => (
        <CommentItem>
            <CommentContent depth={comment.depth}>
                <Avatar>
                    {comment.profileImageUrl ? (
                        <img src={comment.profileImageUrl} alt={comment.nickname} />
                    ) : (
                        <div style={{ background: '#ccc', width: '100%', height: '100%' }} />
                    )}
                </Avatar>
                <CommentBody>
                    <CommentMeta>
                        <Nickname>{comment.nickname}</Nickname>
                        <Time>{fmtRelativeTime(comment.createdAt)}</Time>
                    </CommentMeta>
                    <CommentText>
                        {comment.isDeleted ? '삭제된 댓글입니다.' : comment.text}
                    </CommentText>
                    {!comment.isDeleted && comment.depth === 0 && (
                        <CommentActions>
                            <ActionButton1 onClick={() => setReplyingTo(comment.id)}>
                                답글
                            </ActionButton1>
                        </CommentActions>
                    )}
                </CommentBody>
            </CommentContent>

            {replyingTo === comment.id && (
                <ReplyInput>
                    <ReplyInputField
                        placeholder="답글을 입력하세요..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={2}
                    />
                    <ReplyActions>
                        <ReplyActionButton onClick={() => setReplyingTo(null)}>
                            취소
                        </ReplyActionButton>
                        <ReplyActionButton
                            primary
                            disabled={!replyText.trim()}
                            onClick={() => handleSubmitReply(comment.id)}
                        >
                            답글
                        </ReplyActionButton>
                    </ReplyActions>
                </ReplyInput>
            )}
            {comment.depth === 0 && !comment.showReplies && comment.replyCount > 0 && (
                <LoadMoreButton onClick={() => toggleReplies(comment.id)}>
                    답글 {comment.replyCount.toLocaleString()}개 보기
                </LoadMoreButton>
            )}

            {comment.depth === 0 && comment.showReplies && (
                <>
                    {comment.replies.length > 0 && (
                        <div>
                            {comment.replies.map(reply => (
                                <CommentComponent key={reply.id} comment={reply} />
                            ))}
                        </div>
                    )}

                    {comment.hasMoreReplies ? (
                        <LoadMoreButton onClick={() => loadReplies(comment.id, comment.repliesPage + 1)}>
                            답글 더보기
                        </LoadMoreButton>
                    ) : (
                        comment.replies.length > 0 && (
                            <LoadMoreButton onClick={() => toggleReplies(comment.id)}>
                                답글 숨기기
                            </LoadMoreButton>
                        )
                    )}
                </>
            )}
        </CommentItem>
    );

    if (!id) return <div>잘못된 접근입니다.</div>;
    if (loading || !vm) return <div>불러오는 중...</div>;
    if (err) return <div style={{ color: '#ef4444' }}>{err}</div>;

    return (
        <>
            <BackHeader title={vm.title} variant="inline" />
            <ContentWrapper>
                <PostSection>
                    <PostHeader>
                        <ProfileAvatar />
                        <PostHeaderInfo>
                            <AuthorName>{vm.nickname}</AuthorName>
                            <PostMeta>
                                <span>{vm.createdAtStr}</span>
                                {vm.type && <span>• {vm.type}</span>}
                            </PostMeta>
                        </PostHeaderInfo>
                    </PostHeader>
                    <ImgSlider images={vm.imageUrls} />
                    <PostActions>
                        <ActionButton1 active={vm.likedByMe} onClick={handleLike}>
                            {vm.likedByMe ? '❤️' : '🤍'}
                        </ActionButton1>
                        <ActionButton1>
                            💬
                        </ActionButton1>
                        <ActionButton1>
                            📤
                        </ActionButton1>
                    </PostActions>

                    {vm.likeCount > 0 && (
                        <LikeCount>
                            좋아요 {vm.likeCount.toLocaleString()}개
                        </LikeCount>
                    )}

                    <PostContent>
                        {vm.themeName && (
                            <ThemeBadge>#{vm.themeName}</ThemeBadge>
                        )}

                        <PostDescription>
                            <span className="author">{vm.nickname}</span>
                            {vm.content}
                        </PostDescription>

                        {vm.tags.length > 0 && (
                            <PostTags>
                                {vm.tags.map((tag, index) => (
                                    <Tag key={index}>#{tag}</Tag>
                                ))}
                            </PostTags>
                        )}
                    </PostContent>
                </PostSection>

                <CommentsSection>
                    <CommentHeader>
                        댓글 {vm.commentCount}개
                    </CommentHeader>

                    {comments.map(comment => (
                        <CommentComponent key={comment.id} comment={comment} />
                    ))}

                    {hasMoreComments && (
                        <LoadMoreButton
                            onClick={handleLoadMoreComments}
                            style={{ marginLeft: 0, width: '100%', textAlign: 'center' }}
                        >
                            {loadingComments ? '로딩 중...' : '댓글 더보기'}
                        </LoadMoreButton>
                    )}
                </CommentsSection>
            </ContentWrapper>

            <CommentInputContainer>
                <InputWrapper>
                    <CommentInput
                        placeholder="댓글을 입력하세요..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={1}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmitComment();
                            }
                        }}
                    />
                    <SendButton
                        disabled={!newComment.trim()}
                        onClick={handleSubmitComment}
                    >
                        ➤
                    </SendButton>
                </InputWrapper>
            </CommentInputContainer>
        </>
    );
};

export default PostDetailPage;