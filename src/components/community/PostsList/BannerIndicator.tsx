import styled from "@emotion/styled";

type Props = {
  current: number; // 현재 인덱스 (1부터 시작)
  total: number;   // 전체 개수
};

export default function Indicator({ current, total }: Props) {
  return (
    <Wrapper>
      <Dots>
        {Array.from({ length: total }, (_, i) => (
          <Dot key={i} active={i + 1 === current} />
        ))}
      </Dots>
      <Counter>{current} / {total}</Counter>
    </Wrapper>
  );
}

// 스타일
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 136px;
  border-radius: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  z-index: 3;
`;

const Dots = styled.div`
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ active }) => (active ? "orange" : "gray")};
  transition: background 0.3s;
`;

const Counter = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: gray;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  z-index: 3;
`;
