export type StatusLabel = "진행전" | "진행중" | "완료";

export interface ChallengeCardData {
  id: string;
  title: string;
  categoryLabel: string;
  statusLabel: StatusLabel;
  dateText: string;
  imageUrl: string;
  categoryTone?: "primary" | "neutral";
}

export interface ChallengeState {
  ready: ChallengeCardData[];
  doing: ChallengeCardData[];
  done: ChallengeCardData[];
}
