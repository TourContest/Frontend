export const CHALLENGE_SET_INITIAL = "challenge/SET_INITIAL" as const;
export const CHALLENGE_START = "challenge/START" as const;
export const CHALLENGE_COMPLETE = "challenge/COMPLETE" as const;
export const CHALLENGE_SET_READY = "challenge/SET_READY" as const;
export const CHALLENGE_SET_DOING = "challenge/SET_DOING" as const;
export const CHALLENGE_SET_DONE = "challenge/SET_DONE" as const;
export const CHALLENGE_APPEND_DONE = "challenge/APPEND_DONE" as const;

export const setInitialChallenges = (
  payload: Partial<import("../../reducer/types").ChallengeState>
) => ({
  type: CHALLENGE_SET_INITIAL,
  payload,
});

export const startChallenge = (id: string) => ({
  type: CHALLENGE_START,
  payload: { id },
});

export const completeChallenge = (id: string, dateText?: string) => ({
  type: CHALLENGE_COMPLETE,
  payload: { id, dateText },
});

export const setReadyChallenges = (
  list: import("../../reducer/types").ChallengeCardData[]
) => ({
  type: CHALLENGE_SET_READY,
  payload: list,
});

export const setDoingChallenges = (
  list: import("../../reducer/types").ChallengeCardData[]
) => ({
  type: CHALLENGE_SET_DOING,
  payload: list,
});

export const setDoneChallenges = (
  list: import("../../reducer/types").ChallengeCardData[]
) => ({
  type: CHALLENGE_SET_DONE,
  payload: list,
});
export const appendDoneChallenges = (
  list: import("../../reducer/types").ChallengeCardData[]
) => ({
  type: CHALLENGE_APPEND_DONE,
  payload: list,
});

export type ChallengeActions =
  | ReturnType<typeof setInitialChallenges>
  | ReturnType<typeof startChallenge>
  | ReturnType<typeof completeChallenge>
  | ReturnType<typeof setReadyChallenges>
  | ReturnType<typeof setDoingChallenges>
  | ReturnType<typeof setDoneChallenges>
  | ReturnType<typeof appendDoneChallenges>;
