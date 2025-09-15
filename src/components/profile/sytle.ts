import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";

const P50 = T.ColorPrimary50;
const P100 = T.ColorPrimary100;
const P200 = T.ColorPrimary200;
const P400 = T.ColorPrimary400;

const G100 = T.ColorGrayScale100;
const G400 = T.ColorGrayScale400;
const G500 = T.ColorGrayScale500;
const G600 = T.ColorGrayScale600;
const G800 = T.ColorGrayScale800;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.45);
  display: grid;
  place-items: end;
`;

export const Sheet = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  height: 100%;
  background: ${T.ColorBase0};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  overflow-y: auto;
`;

export const HeaderGrad = styled.div`
  padding: calc(env(safe-area-inset-top, 0px) + 12px) 20px 10px;
  background: linear-gradient(180deg, ${P50} 0%, ${T.ColorBase0} 85%);
  position: relative;
`;

export const AppTitle = styled.h1`
  text-align: center;
  color: ${G800};
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0px;
  margin: 4px 0 14px;
`;

export const Capsule = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 50px;
  border-radius: 24px;
  background: ${T.ColorBase0};
  border: 0.5px solid ${P200};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  overflow: hidden;
`;

export const CapsuleLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: ${P400};
  font-weight: 500;
  font-size: 16px;
`;

export const Emoji = styled.image`
  width: 24px;
  height: 24px;
  background: url("src/assets/hanlabong.svg") no-repeat center/contain;
`;
export const Mono = styled.span`
  color: ${G600};
  font-weight: 500;
  font-size: 14px;
`;

export const CapsuleDivider = styled.div`
  width: 1px;
  height: 60%;
  background: ${P100};
`;

export const CapsuleRight = styled.button`
  border: 0;
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  color: ${P400};
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`;

export const ChevronSmall = styled.svg`
  width: 24px;
  height: 24px;
  stroke: ${P400};
  fill: none;
  stroke-width: 2;
`;

export const Hero = styled.div`
  margin: 20px auto 8px;
  width: 100%;
  height: 213px;
  position: relative;
  display: grid;
  place-items: center;
`;

export const Avatar = styled.img`
  width: 141px;
  height: 185px;
  object-fit: contain;
  z-index: 2;
`;

export const FootShadow = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  height: 42px;
  border-radius: 999px;
  background: radial-gradient(
    50% 65% at 50% 50%,
    rgba(255, 139, 76, 0.32) 0%,
    rgba(255, 139, 76, 0.22) 45%,
    rgba(255, 139, 76, 0) 80%
  );
  filter: blur(1px);
  z-index: 1;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px 6px;
`;

export const Name = styled.h2`
  color: ${G800};
  font-size: 24px;
  font-weight: 600;
`;

export const EditBtn = styled.button`
  border: none;
  width: 32px;
  height: 32px;
  background: url("src/assets/pen.svg") no-repeat center/contain;
  cursor: pointer;
  color: ${G400};
  line-height: 1;
`;

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 6px 20px 0;
`;

export const StatCard = styled.div`
  background: ${G100};
  border-radius: 12px;
  padding: 16px 20px;
`;

export const StatLabel = styled.div`
  color: ${G600};
  font-size: 16px;
  margin-bottom: 6px;
`;

export const StatValue = styled.div``;

export const Walk = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-left: 4px;
  color: ${G500};
`;

export const Emph = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

export const RankText = styled.div`
  color: ${G800};
  font-size: 20px;
  font-weight: 600;
`;

export const List = styled.div`
  width: 100%;
  height: 136px;
  padding: 0 20px;
  margin: 30px auto;
  display: grid;
  gap: 8px;
`;

export const ListItem = styled.div`
  background: ${G100};
  border-radius: 16px;
  padding: 14px 14px;
  display: grid;
  grid-template-columns: 40px 1fr 20px;
  align-items: center;
`;

export const TrophyIcon = styled.image`
  width: 32px;
  height: 32px;
  background: url("src/assets/trophy.svg") no-repeat center/contain;
`;

export const StoreIcon = styled.image`
  width: 32px;
  height: 32px;
  background: url("src/assets/store.svg") no-repeat center/contain;
`;

export const ListText = styled.div`
  color: ${G800};
  font-size: 16px;
  font-weight: 500;
`;

export const ChevronRight = styled.svg`
  width: 24px;
  height: 24px;
  justify-self: end;
  stroke: ${G400};
  fill: none;
  stroke-width: 2;
`;

export const BackBtn = styled.button`
  position: absolute;
  left: 8px;
  top: calc(env(safe-area-inset-top, 0px) + 4px);
  width: 44px;
  height: 44px; /* 터치 타깃 44px */
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 12px;
  -webkit-tap-highlight-color: transparent;

  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 2px solid ${P200};
    outline-offset: 2px;
    border-radius: 12px;
  }
`;

export const BackIcon = styled.svg`
  width: 22px;
  height: 22px;
  stroke: ${G800};
  fill: none;
  stroke-width: 2.2;
`;
