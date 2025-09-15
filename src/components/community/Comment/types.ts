// 단일 댓글 타입
export interface SpotComment {
    id: number;                 // 댓글 ID
    contentId: number;          // 관련 컨텐츠 ID
    parentReplyId: number | null; // 부모 댓글 ID (없으면 null 가능)
    depth: number;              // 댓글 깊이 (대댓글 레벨)
    text: string;               // 댓글 내용
    nickname: string;           // 작성자 닉네임
    isDeleted: boolean;         // 삭제 여부
    createdAt: string;          // 생성 시간 (ISO8601)
    updatedAt: string;          // 수정 시간 (ISO8601)
    relativeTime: string;       // 상대 시간 (예: "5분 전")
}

// 전체 응답 타입
export interface CommentRes {
    content: SpotComment[];     // 댓글 리스트
    totalElements: number;      // 총 댓글 개수
    hasNext: boolean;           // 다음 페이지 여부
}
