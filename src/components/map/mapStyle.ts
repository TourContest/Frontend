import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";

export const Wrap = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 94px; /* 탭바 높이 고려 */
  display: grid;
  gap: 12px;
  pointer-events: none; /* 전체는 터치 막고 */
  z-index: 7; /* 말풍선(6)보다 위 */
`;

export const Metrics = styled.div`
  pointer-events: none;
  color: ${T.ColorBase0};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
`;

export const Small = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0px;
  margin-bottom: 2px;
`;

export const Big = styled.div`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0px;
  line-height: 140%;
`;

export const Card = styled.div`
  pointer-events: auto; /* 카드만 터치 가능 */
  background: ${T.ColorBase0};
  border-radius: 12px;
  box-shadow: 0 3px 16px 0 ${T.ColorEffectShadow1.color};
`;

export const ProfileCard = styled(Card)`
  display: grid;
  grid-template-columns: 68px 1fr;
  align-items: center;
  column-gap: 10px;
  padding: 12px 14px;
  position: relative;
`;

export const Thumb = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background: ${T.ColorGrayScale100};
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 94%;
    height: 94%;
    object-fit: contain;
  }
`;

export const Right = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-auto-rows: min-content;
  column-gap: 8px;
  row-gap: 6px;
`;

export const LevelPill = styled.div`
  grid-column: 1;
  grid-row: 1;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  background: ${T.ColorPrimary100};
  color: ${T.ColorPrimary400};
  font-size: 13px;
  font-weight: 600;
  width: fit-content;
`;

export const Name = styled.div`
  grid-column: 1 / span 2;
  grid-row: 2;
  color: ${T.ColorGrayScale800};
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0px;
  line-height: 140%;
`;

export const Sub = styled.div`
  grid-column: 1 / span 2;
  grid-row: 3;
  color: ${T.ColorGrayScale500};
  font-size: 14px;
  letter-spacing: -0.2px;
`;

export const Chevron = styled.svg`
  grid-column: 3;
  grid-row: 1;
  width: 22px;
  height: 22px;
  align-self: center;
  justify-self: end;
`;
