import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useState } from 'react';

const ChipContainer = styled.div<{ selected: boolean }>`
  position: relative;
  border-radius: 10px;
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  box-sizing: border-box;
  text-align: left;
  font-size: 14px;
  color: ${({ selected, theme }) => selected ? '#fff' : theme.colors.gray[700]};
  font-family: Pretendard;
  background: ${({ selected, theme }) => selected ? theme.colors.primary[400] : theme.colors.gray[200]};
  cursor: pointer;
  font-weight: 500;
`;

const ButtonsChipHealing: FunctionComponent = () => {
  const [selected, setSelected] = useState(false);
  return (
    <ChipContainer selected={selected} onClick={() => setSelected(!selected)}>
      힐링
    </ChipContainer>
  );
};

export default ButtonsChipHealing; 