import type { CommunityAction, CommunityState } from "src/types/CommunityTypes";

export const initialState: CommunityState = {
  selectedFilter: '전체',
  searchQuery: '',
  isModalOpen: false,
};

export const communityReducer = (state: CommunityState, action: CommunityAction): CommunityState => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, selectedFilter: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_MODAL':
      return { ...state, isModalOpen: !state.isModalOpen };
    default:
      return state;
  }
};