import type { Spot } from "src/reducer/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchLatestPosts, fetchPopularPosts } from "./actions";

export interface CommunityState {
  posts: Spot[];
  activeTab: "latest" | "popular";
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  posts: [],
  activeTab: "latest",
  currentPage: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<"latest" | "popular">) => {
      state.activeTab = action.payload;
      state.currentPage = 0;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updatePostLike: (
      state,
      action: PayloadAction<{ id: number; liked: boolean }>
    ) => {
      const post = state.posts.find((p) => p.id === action.payload.id);
      if (post) {
        post.likedByMe = action.payload.liked;
        if (action.payload.liked) {
          post.likeCount += 1;
        } else {
          post.likeCount = Math.max(0, post.likeCount - 1);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // latest
      .addCase(fetchLatestPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchLatestPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "최신글 불러오기 실패";
      })
      // popular
      .addCase(fetchPopularPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPopularPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "인기글 불러오기 실패";
      });
  },
});

export const { setActiveTab, setCurrentPage, updatePostLike } = communitySlice.actions;
export default communitySlice.reducer;

export const communityReducer = communitySlice.reducer;
