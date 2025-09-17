import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Indicator from './BannerIndicator';
import type { BannerSliderProps } from "../types";

// 더미 API 연동 후 지우기
const dummyImgs = [
    "https://picsum.photos/id/1018/600/200",
    "https://picsum.photos/id/1015/600/200",
    "https://picsum.photos/id/1019/600/200",
    "https://picsum.photos/id/1020/600/200",
    "https://picsum.photos/id/1021/600/200",
];

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 136px;
    border-radius: 8px;
    overflow: hidden;
`;

const Banner = styled.img<{ active?: boolean; fadingOut?: boolean }>`
    position: absolute; 
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 1s ease-in-out;

    ${({ active }) => active && active && `opacity: 1; z-index: 2;`}
    ${({ fadingOut }) => fadingOut && fadingOut && `opacity: 0; z-index: 1;`}
`;

export default function BannerSlider({ images = [] }: BannerSliderProps ) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  // api 연동 후 변경
  const displayImgs = images.length ? images : dummyImgs;

  useEffect(() => {
    if(!displayImgs.length) return;
    // if(!images.length) return;

    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((prev) =>
        prev === displayImgs.length - 1 ? 0 : prev + 1
        // prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 3초마다 자동 변경

    return () => clearInterval(timer); // cleanup
  }, [displayImgs, current]);
  // }, [images, current]);

  // if (!images.length) return <Wrapper />

  return (
    <div style={{ padding: "0 20px"}}>
      <Wrapper>
          {displayImgs.map((src, idx) => {
          // {images.map((src, idx) => {
              const isActive = idx === current;
              const isPrev = idx === prev;
              return <Banner key={idx} src={src} active={isActive} fadingOut={isPrev} />
      })}
        <Indicator current={current + 1} total={displayImgs.length} />
        {/* <Indicator current={current + 1} total={images.length} /> */}
      </Wrapper>
    </div>
  );
}
