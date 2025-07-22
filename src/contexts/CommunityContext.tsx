import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

interface CommunityState {
  selectedFilter: string;
  searchQuery: string;
  isModalOpen: boolean;
}

type CommunityAction =
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'TOGGLE_MODAL' };

const initialState: CommunityState = {
  selectedFilter: '전체',
  searchQuery: '',
  isModalOpen: false,
};

const communityReducer = (state: CommunityState, action: CommunityAction): CommunityState => {
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

interface CommunityContextType {
  state: CommunityState;
  dispatch: React.Dispatch<CommunityAction>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(communityReducer, initialState);

  return (
    <CommunityContext.Provider value={{ state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}; 