import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";

const G0 = T.ColorBase0;
const G50 = T.ColorBg50;
const G400 = T.ColorGrayScale400;
const G600 = T.ColorGrayScale600;
const G800 = T.ColorGrayScale800;

const P400 = T.ColorPrimary400;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  width: 335px;
  border-radius: 20px;
  background: ${G0};
  padding: 22px 18px 18px;
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
`;

export const Title = styled.h3`
  margin: 0 6px 2px;
  text-align: center;
  white-space: pre-line;
  word-break: keep-all;
  color: ${G800};
  font-size: 20px;
  font-weight: 600;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: ${G600};
  font-size: 16px;
`;

export const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

export const CancelBtn = styled.button`
  height: 48px;
  border-radius: 12px;
  border: 0;
  background: ${G50};
  color: ${G400};
  font-weight: 700;
  cursor: pointer;
`;

export const ConfirmBtn = styled.button`
  height: 48px;
  border-radius: 12px;
  border: 0;
  background: ${P400};
  color: ${G0};
  font-weight: 700;
  cursor: pointer;
  &:hover {
    filter: brightness(1.02);
  }
  &:active {
    transform: translateY(1px);
  }
`;
