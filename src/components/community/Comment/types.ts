// 단일 댓글 타입
export type SpotComment = {
  id: number;
  contentId: number;         // 게시글 ID (= spotId)
  parentReplyId?: number;    // 부모 댓글 ID (없으면 최상위 댓글)
  depth: number;             // 0 = 댓글, 1 이상 = 대댓글
  text: string;              // 내용
  nickname: string;          // 작성자 닉네임
  profileImageUrl: string;   // 프로필 이미지
  isDeleted: boolean;        // 삭제 여부
  createdAt: string;
  updatedAt: string;
  relativeTime: string;      // "5분 전" 같은 상대시간
}

// 전체 응답 타입
export interface CommentRes {
    content: SpotComment[];     // 댓글 리스트
    totalElements: number;      // 총 댓글 개수
    hasNext: boolean;           // 다음 페이지 여부
}
