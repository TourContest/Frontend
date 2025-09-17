import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";
import trophyUrl from "src/assets/noneTrophy.svg?url";
import stampUrl from "src/assets/Stamp.svg?url";

const G100 = T.ColorGrayScale100;
const G0 = T.ColorBase0;
const P400 = T.ColorPrimary400;

export const Card = styled.div`
  position: relative;
  width: 335px;
  margin: 0 auto;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  padding: 10px;
  background-color: ${T.ColorBase0};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Media = styled.div`
  position: relative;
  display: block;
  margin: 0 auto;
  width: 318px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export const Image = styled.img`
  position: absolute;
  inset: -0.5px;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  radius: 8px;
  object-fit: cover;
  display: block;
`;

export const Dim = styled.div`
  position: absolute;
  width: calc(100% + 1px);
  height: 100;
  inset: 10px auto;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.28);
`;

export const StampImg = styled.svg`
  position: relative;
  display: block;
  margin: 20px auto;
  z-index: 1;
  width: 140px;
  height: 140px;
  background-image: url(${stampUrl});
`;

export const Category = styled.div<{ tone: "primary" | "neutral" }>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 10px 12px;
  border-bottom-right-radius: 12px;
  color: ${G0};
  font-weight: 500;
  font-size: 16px;
  background: ${({ tone }) =>
    tone === "primary" ? P400 : T.ColorGrayScale600};
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.16);
`;

export const Trophy = styled.div`
  position: absolute;
  right: 12px;
  top: 12px;
  width: 24px;
  height: 24px;
  background-image: url(${trophyUrl});
  background-repeat: no-repeat;
  background-size: contain;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.22));
`;

export const BottomLeft = styled.div`
  position: absolute;
  left: 16px;
  bottom: 16px;
  color: ${G0};
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
`;

export const Status = styled.div`
  margin-top: 2px;
  font-size: 16px;
  font-weight: 600;
  color: ${G100};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
`;

export const DateText = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  color: ${G100};
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
`;
