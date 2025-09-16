import type { FunctionComponent } from 'react';
import { Chip, Label, RemoveBtn } from './style';

interface ButtonsChipProps {
  label: string;
  selected?: boolean;         
  onClick?: () => void;       
  removable?: boolean;        
  onRemove?: () => void;      
}

const ButtonsChip: FunctionComponent<ButtonsChipProps> = ({ label, selected = false, onClick, removable, onRemove }) => {
  return (
    <Chip
      type="button"
      aria-pressed={selected}
      data-selected={selected ? 'true' : 'false'}
      onClick={onClick}
    >
      <Label>{label}</Label>

      {removable && (
        <RemoveBtn
          aria-label={`${label} 제거`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          {/* 심플한 X 아이콘 (SVG) */}
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 3l6 6M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </RemoveBtn>
      )}
    </Chip>
  );
};

export default ButtonsChip; 