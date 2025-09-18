import type { RootState } from "../rootReducer";

export const selectCommunity = (state: RootState) => state.community;

export const selectPosts = (state: RootState) => state.community.posts;
export const selectActiveTab = (state: RootState) => state.community.activeTab;
export const selectLoading = (state: RootState) => state.community.loading;
export const selectTotalPages = (state: RootState) => state.community.totalPages;
export const selectCurrentPage = (state: RootState) => state.community.currentPage;
