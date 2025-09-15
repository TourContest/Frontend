import { useRef, useState } from "react"; // 앱 패키징시 지우기
import { Slide, SlideImg, SliderWrapper } from "./style";
import type { ImgSliderProps } from "./types";

export default function ImgSlider({ images }: ImgSliderProps) {
    // TODO: 이 아래로 스크롤 기능은 앱 패키징 시 지운다 (웹 용)
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!sliderRef.current) return;
        setIsDragging(true);

        // 마우스 누른 위치 (슬라이더 내부 좌표)
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        // 누른 순간의 scrollLeft 값 저장
        setScrollStart(sliderRef.current.scrollLeft);
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !sliderRef.current) return;
        e.preventDefault();

        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = x - startX; // 누른 지점 대비 얼마나 이동했는지
        sliderRef.current.scrollLeft = scrollStart - walk;
    };

  return (
    <SliderWrapper
        // 마찬가지로 앱 패키징시 이후 지운다. 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
        }}
    >
      {images.map((url, index) => (
        <Slide key={index}>
          <SlideImg src={url} alt={`slide-${index}`} />
        </Slide>
      ))}
    </SliderWrapper>
  );
};
