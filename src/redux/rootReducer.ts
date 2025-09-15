import { combineReducers } from "redux";
import { challengeReducer } from "./challenge/reducer";

export const rootReducer = combineReducers({
  challenge: challengeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
