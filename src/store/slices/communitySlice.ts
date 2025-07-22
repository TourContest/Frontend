import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

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

interface CommunityState {
  posts: Post[];
  activeTab: 'latest' | 'popular';
  currentPage: number;
  totalPages: number;
  postsPerPage: number;
  loading: boolean;
  error: string | null;
}

// 더 많은 게시글 데이터 생성
const generatePosts = (): Post[] => {
  const locations = ['서귀포', '제주시', '애월', '한림', '성산', '구좌', '조천', '우도'];
  const contents = [
    '이 기분 오래오래 간직하고 싶다.사진보다 눈으로 보는 게 더 예쁨 자꾸만 마음이 느긋해지는 느낌 아무 말 없이도 충격',
    '제주의 바다를 보면서 마음이 평온해졌어요. 파도 소리와 함께하는 시간이 정말 소중했습니다.',
    '오늘은 제주에서 특별한 경험을 했어요. 현지인들과 함께하는 시간이 정말 즐거웠습니다.',
    '제주의 맛집을 찾아다니는 재미가 있네요. 현지 음식의 맛이 정말 특별합니다.',
    '제주의 숲길을 걸으면서 자연의 아름다움을 느꼈어요. 신선한 공기와 함께하는 산책이 최고입니다.',
    '오늘은 제주에서 일몰을 봤어요. 하늘과 바다가 만나는 지점에서의 일몰이 정말 아름다웠습니다.',
    '제주의 전통 문화를 체험했어요. 현지의 문화를 직접 느낄 수 있어서 정말 의미있는 시간이었습니다.',
    '제주의 해변에서 수영을 했어요. 맑은 물과 함께하는 수영이 정말 상쾌했습니다.',
    '제주의 산을 등반했어요. 정상에서 바라본 풍경이 정말 장관이었습니다.',
    '제주의 카페에서 커피를 마시면서 여유로운 시간을 보냈어요. 분위기가 정말 좋았습니다.'
  ];

  return Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    username: `닉네임은${(index % 8) + 1}자까지`,
    date: `2024.${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}.${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    location: locations[index % locations.length],
    content: contents[index % contents.length],
    images: Array.from({ length: (index % 3) + 1 }, (_, imgIndex) => 
      `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDEzMCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiBmaWxsPSIjRjBGMDBGMCIvPgo8dGV4dCB4PSI2NSIgeT0iNjUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI0NDQ0NDQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIC${imgIndex + 1}8L3RleHQ+Cjwvc3ZnPgo=`
    ),
    hasReport: index % 10 === 0, // 10개마다 하나씩 신고 가능
    likes: Math.floor(Math.random() * 100) + 1,
    comments: Math.floor(Math.random() * 20) + 1
  }));
};

const initialState: CommunityState = {
  posts: generatePosts(),
  activeTab: 'latest',
  currentPage: 1,
  totalPages: 10,
  postsPerPage: 3,
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'latest' | 'popular'>) => {
      state.activeTab = action.payload;
      state.currentPage = 1; // 탭 변경 시 첫 페이지로 이동
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPostsPerPage: (state, action: PayloadAction<number>) => {
      state.postsPerPage = action.payload;
      state.totalPages = Math.ceil(state.posts.length / action.payload);
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
      state.totalPages = Math.ceil(state.posts.length / state.postsPerPage);
    },
    removePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
      state.totalPages = Math.ceil(state.posts.length / state.postsPerPage);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { 
  setActiveTab, 
  setCurrentPage, 
  setPostsPerPage,
  addPost, 
  removePost, 
  setLoading, 
  setError 
} = communitySlice.actions;

// Selectors
export const selectCurrentPagePosts = createSelector(
  [
    (state: { community: CommunityState }) => state.community.posts,
    (state: { community: CommunityState }) => state.community.currentPage,
    (state: { community: CommunityState }) => state.community.postsPerPage,
    (state: { community: CommunityState }) => state.community.activeTab,
  ],
  (posts, currentPage, postsPerPage, activeTab) => {
    let orderedPosts = [...posts];
    if (activeTab === 'latest') {
      orderedPosts.sort((a, b) => b.id - a.id);
    } else if (activeTab === 'popular') {
      orderedPosts.sort((a, b) => a.id - b.id);
    }
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return orderedPosts.slice(startIndex, endIndex);
  }
);

export default communitySlice.reducer; 