import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Indicator from "./BannerIndicator";
import type { BannerSliderProps, BannerItem } from "../types";

// 더미(연동 전/빈 배열일 때 사용)
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

  ${({ active }) => active && `opacity: 1; z-index: 2;`}
  ${({ fadingOut }) => fadingOut && `opacity: 0; z-index: 1;`}
`;

export default function BannerSlider(props: BannerSliderProps) {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);

    // 1) props → 통합된 slides 생성
    const slides: BannerItem[] = (() => {
        if ("items" in props && props.items?.length) return props.items;
        if ("images" in props && props.images?.length) {
            return props.images.map((src) => ({ image: src }));
        }
        // 더미 사용
        return dummyImgs.map((src) => ({ image: src }));
    })();

    // 2) 자동 롤링
    useEffect(() => {
        if (!slides.length) return;
        const timer = setInterval(() => {
            setPrev(current);
            setCurrent((p) => (p === slides.length - 1 ? 0 : p + 1));
        }, 4000);
        return () => clearInterval(timer);
        // current만 의존시 페이드 타이밍이 안정적
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current, slides.length]);

    return (
        <div style={{ padding: "0 20px" }}>
            <Wrapper>
                {slides.map((s, idx) => {
                    const isActive = idx === current;
                    const isPrev = idx === prev;

                    const img = (
                        <Banner
                            key={`img-${idx}`}
                            src={s.image}
                            alt={s.title ?? `banner-${idx}`}
                            active={isActive}
                            fadingOut={isPrev}
                        />
                    );

                    // 클릭 가능: href가 있으면 앵커로 감싼다
                    return s.href ? (
                        <a
                            key={idx}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.title ?? `배너 ${idx + 1}`}
                            style={{ position: "absolute", inset: 0, display: "block" }}
                        >
                            {img}
                        </a>
                    ) : (
                        <div key={idx} style={{ position: "absolute", inset: 0 }}>
                            {img}
                        </div>
                    );
                })}
                <Indicator current={Math.min(current + 1, slides.length)} total={slides.length} />
            </Wrapper>
        </div>
    );
}
