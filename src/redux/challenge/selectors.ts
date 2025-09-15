import type { RootState } from "../rootReducer";

export const selectReady = (s: RootState) => s.challenge.ready;
export const selectDoing = (s: RootState) => s.challenge.doing;
export const selectDone = (s: RootState) => s.challenge.done;
