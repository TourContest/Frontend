import type { FunctionComponent } from 'react';
import styled from '@emotion/styled';

interface ButtonsChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const ChipContainer = styled.div<{ selected: boolean }>`
  position: relative;
  border-radius: 10px;
  width: fit-content;
  min-width: 56px;
  max-width: 90px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  margin-bottom: 8px;
  box-sizing: border-box;
  text-align: center;
  font-size: 14px;
  color: ${({ selected, theme }) => selected ? '#fff' : theme.colors.gray[700]};
  font-family: Pretendard, 'SF SD Text', sans-serif;
  background: ${({ selected, theme }) => selected ? theme.colors.primary[400] : theme.colors.gray[200]};
  cursor: pointer;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
`;

const ButtonsChip: FunctionComponent<ButtonsChipProps> = ({ label, selected = false, onClick }) => {
  return (
    <ChipContainer selected={selected} onClick={onClick}>
      {label}
    </ChipContainer>
  );
};

export default ButtonsChip; 