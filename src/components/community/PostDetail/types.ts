import type { Post } from "src/store/slices/communitySlice";

export type PostDetailProps ={
    id: number;              // 고유 ID
    name?: string;            // 이름
    latitude?: number;        // 위도
    longitude?: number;       // 경도
    likeCount?: number;       // 좋아요 개수
    likedByMe?: boolean;      // 내가 좋아요 눌렀는지 여부
    imageUrls?: string[];     // 이미지 URL 리스트
    description?: string;     // 설명
    commentCount?: number;    // 댓글 개수
    bookmarkedByMe?: boolean; // 내가 북마크했는지 여부
    themeId?: number;         // 테마 ID
    themeName?: string;       // 테마 이름
    tags?: string[];          // 태그 리스트
    // Date 받아와야함.
};

// UI 확인용... API 활용 시 삭제
export const mapPostDetail = (post: Post): PostDetailProps => ({
    id: post.id,
    name: post.username,                // username → name
    latitude: 0,                        // 없으니 기본값
    longitude: 0,                       // 없으니 기본값
    likeCount: post.likes ?? 0,
    likedByMe: false,                   // 기본값
    imageUrls: post.images,
    description: post.content,
    commentCount: post.comments ?? 0,
    bookmarkedByMe: false,              // 기본값
    themeId: 1,                         // 기본값
    themeName: "기본",                  // 기본값
    tags: []                            // 기본값
});

export type ImgSliderProps ={
    images:string[];
}