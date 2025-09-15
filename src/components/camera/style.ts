import styled from "@emotion/styled";
import * as T from "src/styles/tokens.js";

export const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  overflow: hidden;
  background: #000; /* 프리뷰가 못 채운 부분만 어둡게 */
`;

/* 프리뷰 레이어: 화면을 꽉 채우고 뒤에 깔림 */
export const Preview = styled.div`
  position: absolute;
  inset: 0;
`;

/* 웹에서 쓰는 <video> 스타일 */
export const Video = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* ← 검은 띠 제거 */
  object-position: center;
  display: block;
  backface-visibility: hidden;
  transform: translateZ(0);
  /* 비디오 없을 때 체크보드 대체 배경 */
  background: repeating-conic-gradient(#d9dce0 0 25%, #cfd2d6 0 50%) 50% / 40px
    40px;
`;

/* 네이티브(시스템 카메라)일 때의 자리 표시자 */
export const NativePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-conic-gradient(#d9dce0 0 25%, #cfd2d6 0 50%) 50% / 40px
    40px;
`;

/* 상단 오버레이 바 */
export const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: calc(env(safe-area-inset-top) + 8px) 12px 12px;
  display: grid;
  grid-template-columns: 56px 1fr 56px;
  align-items: center;
  color: ${T.ColorBase0};
  /* 투명 그라데이션 */
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0));
`;

export const BackBtn = styled.button`
  width: 56px;
  height: 32px;
  background: none;
  border: 0;
  color: ${T.ColorBase0};
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  &::before {
    content: "‹";
  }
`;

export const Title = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${T.ColorBase0};
`;

/* 하단 오버레이 바 */
export const BottomBar = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 16px calc(env(safe-area-inset-bottom) + 20px);
  display: grid;
  grid-template-columns: 72px 1fr 96px;
  align-items: center;
  /* 위로 사라지는 그라데이션 */
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0));
`;

export const RotateBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 0;
  background: url("src/assets/rotate.svg") no-repeat center;
  color: ${T.ColorBase0};
  cursor: pointer;
`;

export const Shutter = styled.button`
  justify-self: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 6px solid rgba(255, 255, 255, 0.65);
  background: ${T.ColorBase0};
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const NextBtn = styled.button<{ disabled?: boolean }>`
  justify-self: end;
  min-width: 60px;
  height: 48px;
  padding: 8 12px;
  border-radius: 10px;
  border: 0;
  font-weight: 700;
  /* 비주얼은 항상 동일 */
  background: rgba(75, 69, 69, 0.6);
  color: ${T.ColorBase0};
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    pointer-events: none;
    opacity: 1;
  }
`;
