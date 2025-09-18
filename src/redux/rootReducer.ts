import { combineReducers } from "redux";
import { challengeReducer } from "./challenge/reducer";
import { communityReducer } from './community/reducer';

export const rootReducer = combineReducers({
  challenge: challengeReducer,
  community: communityReducer,
});

export type RootState = ReturnType<typeof rootReducer>;