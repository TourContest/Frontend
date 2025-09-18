// import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
// import { communityReducer, initialState } from 'src/reducer/CommunityReducer';
// import type { CommunityAction, CommunityState } from 'src/types/CommunityTypes';

// interface CommunityContextType {
//   state: CommunityState;
//   dispatch: React.Dispatch<CommunityAction>;
// }

// const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

// export const CommunityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(communityReducer, initialState);

//   return (
//     <CommunityContext.Provider value={{ state, dispatch }}>
//       {children}
//     </CommunityContext.Provider>
//   );
// };

// export const useCommunity = () => {
//   const context = useContext(CommunityContext);
//   if (context === undefined) {
//     throw new Error('useCommunity CommunityProvider가 있는 곳 에서만 사용이 가능합니다.');
//   }
//   return context;
// }; 