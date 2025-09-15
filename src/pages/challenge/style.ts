// src/features/challenge/style.ts
import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";

const P400 = T.ColorPrimary400;

const G50 = T.ColorBg50;
const G200 = T.ColorGrayScale200;
const G400 = T.ColorGrayScale400;
const G500 = T.ColorGrayScale500;
const G800 = T.ColorGrayScale800;

export const Page = styled.div`
  min-height: 100vh;
  background: ${G50};
`;

export const Header = styled.header`
  background: ${T.ColorBase0};
  position: sticky;
  top: 0;
  z-index: 5;
  padding-top: calc(env(safe-area-inset-top, 0px) + 6px);
`;

export const Title = styled.h1`
  text-align: center;
  color: ${G800};
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  padding: 6px 0 8px;
`;

export const Tabs = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid ${G200};
`;

export const Tab = styled.button<{ active?: boolean }>`
  height: 44px;
  background: transparent;
  border: 0;
  font-size: 16px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  color: ${({ active }) => (active ? P400 : G500)};
`;

export const Indicator = styled.i<{ index: 0 | 1 | 2 }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 33.3333%;
  background: ${P400};
  transform: translateX(${({ index }) => index * 100}%);
  transition: transform 0.18s ease-out;
`;

export const Body = styled.main`
  padding: 14px 14px 24px;
  height: 100%;
`;

export const List = styled.ul`
  display: grid;
  gap: 14px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const EmptyWrap = styled.div`
  display: flex;
  margin: 50% auto;
  flex-direction: column;
  align-items: center;
  color: ${G400};
`;

export const EmptyEmoji = styled.svg`
  width: 120px;
  height: 120px;
  background: url("src/assets/trophyColor.svg") no-repeat center/contain;
  margin-bottom: 40px;
`;

export const EmptyText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${G500};
`;
