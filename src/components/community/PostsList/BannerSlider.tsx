import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Indicator from './BannerIndicator';
import type { BannerSliderProps } from "../types";

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

export default function BannerSlider({ items }: BannerSliderProps ) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [items, current]);

  if (!items.length) return null; // 데이터 없으면 아무것도 안 그림
  
  return (
    <div style={{ padding: "0 20px"}}>
      <Wrapper>
          {items.map((items, idx) => {
              const isActive = idx === current;
              const isPrev = idx === prev;
              return (
                <a
                  key={items.id}
                  href={items.detailUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Banner src={items.image_url} active={isActive} fadingOut={isPrev} />
                </a>
              )
      })}
        <Indicator current={current + 1} total={items.length} />
      </Wrapper>
    </div>
  );
}
