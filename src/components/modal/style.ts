// components/checkin/style.ts
import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";

// 편의 매핑 (이름만 짧게)
const P200 = T.ColorPrimary200;
const P100 = T.ColorPrimary100;

// P300, P400 은 위 아래로 그라데이션 테두리 해야됨.
const P300 = "#FFC852"; // 선택 됐을 때 테두리 색깔
const P400 = T.ColorPrimary400; // 선택 됐을 때 테두리 색깔

const G100 = T.ColorGrayScale100;
const G300 = T.ColorGrayScale300;
const G400 = T.ColorGrayScale400;
const G600 = T.ColorGrayScale600;
const G800 = T.ColorGrayScale800;

const BASE_WHITE = T.ColorBase0; // #FFFFFF

const FEATHER_DEG = 30;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  /* 스크림은 토큰에 없어서 임시값 사용 */
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 335px;
  height: 425px;
  border-radius: 20px;
  background: ${BASE_WHITE};
  padding: 18px 16px 16px;
`;

export const Title = styled.h3`
  text-align: center;
  color: ${G800};
  margin-top: 15px;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.6px;
`;

export const Desc = styled.p`
  margin: 10px 0 14px;
  color: ${G600};
  text-align: center;
  font-weight: 400;
  letter-spacing: -0.8px;
`;

export const StampBoard = styled.div`
  position: relative;
  width: 100%;
  height: 52%;
  margin-left: -10px; /* 트랙이 왼쪽으로 10px 이동했으므로 보정 */
  padding: 10px 25px;
  overflow: hidden;
`;

export const TrackSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  stroke: ${P200};
  stroke-width: 11;
  fill: none;
  opacity: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke; /* 스케일 시 두께 유지 */
  shape-rendering: geometricPrecision; /* 안티앨리어싱 품질 */
`;

export const Row = styled.div<{ reversed?: boolean }>`
  display: flex;
  flex-direction: ${({ reversed }) => (reversed ? "row-reverse" : "row")};
  justify-content: flex-start; /* ← space-between 제거 */
  gap: 8px; /* 연결 느낌 살리기 위한 고정 간격 */
  margin-top: 8px;
  padding: 5px 5px;
  position: relative;
  z-index: 1; /* 트랙 위에 나오도록 */
`;

// 기존 border 지우고 ::before 가 테두리를 그리게 한다.
export const Stamp = styled.div<{ active?: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ active }) => (active ? P100 : G100)};
  display: grid;
  place-items: center;
  position: relative;

  border: ${({ active }) => (active ? "none" : `2px dotted ${G300}`)};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    pointer-events: none;

    /* 위쪽은 P300, 아래쪽은 P400.
       180deg 주변에 FEATHER_DEG 만큼의 보간 구간을 둬서 자연스럽게 전환 */
    background: ${({ active }) =>
      active
        ? `conic-gradient(
             from -90deg,
             ${P300} 0deg,
             ${P300} ${180 - FEATHER_DEG / 2}deg,
             ${P400} ${180 + FEATHER_DEG / 2}deg,
             ${P400} 360deg
           )`
        : "none"};

    -webkit-mask: ${({ active }) =>
      active
        ? "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))"
        : "none"};
    mask: ${({ active }) =>
      active
        ? "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))"
        : "none"};
  }
`;

export const FruitIcon = styled.span<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  background-image: ${({ active }) =>
    active
      ? 'url("src/assets/hanlabong.svg")'
      : 'url("src/assets/hanlabong-dis.svg")'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const StampLabel = styled.div<{ active?: boolean }>`
  margin-top: 6px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  lien-height: 130%;
  letter-spacing: 0%;
  color: ${({ active }) => (active ? P400 : G400)};
`;

export const Footer = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: center;
`;

export const PrimaryBtn = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 30px;
  font-family: ${T.ColorBody1Medium.fontFamily};
  border: 0;
  border-radius: 10px;
  background: ${P400};
  color: ${BASE_WHITE};
`;
