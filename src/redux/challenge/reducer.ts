import type { ChallengeState, ChallengeCardData } from "../../reducer/types";
import type { ChallengeActions } from "./actions";
import {
  CHALLENGE_COMPLETE,
  CHALLENGE_SET_INITIAL,
  CHALLENGE_START,
  CHALLENGE_SET_READY,
  CHALLENGE_SET_DOING,
  CHALLENGE_SET_DONE,
  CHALLENGE_APPEND_DONE,
} from "./actions";

const initialState: ChallengeState = { ready: [], doing: [], done: [] };

const today = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${dd}`;
};

export function challengeReducer(
  state: ChallengeState = initialState,
  action: ChallengeActions
): ChallengeState {
  switch (action.type) {
    case CHALLENGE_SET_INITIAL:
      return { ...state, ...action.payload };

    case CHALLENGE_SET_READY: {
      return { ...state, ready: action.payload };
    }

    case CHALLENGE_SET_DOING: {
      return { ...state, doing: action.payload };
    }
    case CHALLENGE_SET_DONE:
      return { ...state, done: action.payload };

    case CHALLENGE_APPEND_DONE: {
      const seen = new Set(state.done.map((v) => v.id));
      const merged = [...state.done];
      for (const item of action.payload)
        if (!seen.has(item.id)) merged.push(item);
      return { ...state, done: merged };
    }

    case CHALLENGE_START: {
      const id = action.payload.id as string;
      const i = state.ready.findIndex((c: any) => c.id === id);
      if (i === -1) return state;

      const picked = state.ready[i];
      const moved = { ...picked, statusLabel: "진행중" as const };

      return {
        ...state,
        ready: [...state.ready.slice(0, i), ...state.ready.slice(i + 1)],
        doing: [moved, ...state.doing],
      };
    }

    case CHALLENGE_COMPLETE: {
      const id = action.payload.id;

      // ready/doing 어디서 오든 잡아서 완료로 이동
      const fromReady = state.ready.find((c) => c.id === id);
      const fromDoing = state.doing.find((c) => c.id === id);
      const src = fromReady ?? fromDoing;
      if (!src) return state;

      const moved: ChallengeCardData = {
        ...src,
        statusLabel: "완료",
        dateText: action.payload.dateText ?? today(),
      };

      return {
        ...state,
        ready: state.ready.filter((c) => c.id !== id),
        doing: state.doing.filter((c) => c.id !== id),
        done: [moved, ...state.done],
      };
    }

    default:
      return state;
  }
}
