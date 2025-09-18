export type PostDetailProps = {
    id: number;                 // 고유 ID
    name: string;               // 게시글/스팟 이름 (API: name)
    description: string;        // 설명
    latitude: number;           // 위도
    longitude: number;          // 경도
    likeCount: number;          // 좋아요 개수
    likedByMe: boolean;         // 내가 좋아요 눌렀는지 여부
    imageUrls: string[];        // 이미지 URL 리스트
    userId: number;             // 작성자 ID
    userNickname: string;       // 작성자 닉네임
    userProfile: string;        // 작성자 프로필 이미지
    type: "POST" | "SPOT" | "CHALLENGE";
    challengeOngoing: boolean;  // 챌린지 진행 여부
    createdAt: string;          // 생성일시
    commentCount: number;       // 댓글 개수
    bookmarkedByMe: boolean;    // 내가 북마크했는지 여부
    themeId: number;            // 테마 ID
    themeName: string;          // 테마 이름
    tags: string[];             // 태그 리스트
    updatedAt: string;          // 수정일시
};

export type ImgSliderProps ={
    images:string[];
}