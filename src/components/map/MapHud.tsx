import {
  Wrap,
  Metrics,
  Small,
  Big,
  ProfileCard,
  Thumb,
  Right,
  LevelPill,
  Name,
  Sub,
  Chevron,
} from "./mapStyle";
import * as T from "src/styles/tokens.js";

type User = {
  rankLabel: string;
  name: string;
  avatarUrl: string;
};

type Props = {
  kmText: string; // 0.00 km
  stepsText: string; // 10,000 걸음
  user: User;
  onProfileClick?: () => void;
};

export default function MapHud({
  kmText,
  stepsText,
  user,
  onProfileClick,
}: Props) {
  return (
    <Wrap>
      <Metrics>
        <Small>{kmText}</Small>
        <Big>{stepsText}</Big>
      </Metrics>

      <ProfileCard
        onClick={onProfileClick}
        role="button"
        aria-label="프로필 카드"
      >
        <Thumb>
          <img src={user.avatarUrl} alt="" />
        </Thumb>

        <Right>
          <LevelPill>{`${user.rankLabel}`}</LevelPill>
          <Name>{user.name}</Name>
          <Chevron viewBox="0 0 24 24" aria-hidden>
            <path
              d="M9 6l6 6-6 6"
              fill="none"
              stroke={T.ColorGrayScale400}
              strokeWidth="2"
            />
          </Chevron>
        </Right>
      </ProfileCard>
    </Wrap>
  );
}
