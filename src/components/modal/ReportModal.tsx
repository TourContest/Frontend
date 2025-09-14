import React from 'react';
import styled from '@emotion/styled';
import { FiX } from 'react-icons/fi';
import { theme } from '../../styles/theme';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 335px;
  background-color: ${theme.colors.bg[0]};
  border-radius: 12px;
  padding: 24px;
  box-shadow: ${theme.shadow.shadow1.x}px ${theme.shadow.shadow1.y}px ${theme.shadow.shadow1.blur}px ${theme.shadow.shadow1.spread}px ${theme.shadow.shadow1.color};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-family: ${theme.typography.head4.fontFamily};
  font-weight: ${theme.typography.head4.fontWeight};
  font-size: ${theme.typography.head4.fontSize};
  line-height: ${theme.typography.head4.lineHeight};
  color: ${theme.colors.gray[800]};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${theme.colors.gray[500]};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ReportOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const ReportOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: ${theme.colors.primary[400]};
`;

const OptionText = styled.span`
  font-family: ${theme.typography.body2.fontFamily};
  font-weight: ${theme.typography.body2.fontWeight};
  font-size: ${theme.typography.body2.fontSize};
  line-height: ${theme.typography.body2.lineHeight};
  color: ${theme.colors.gray[800]};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 12px 24px;
  border: 1px solid ${props => props.primary ? theme.colors.primary[400] : theme.colors.gray[300]};
  border-radius: 8px;
  background-color: ${props => props.primary ? theme.colors.primary[400] : theme.colors.bg[0]};
  color: ${props => props.primary ? theme.colors.bg[0] : theme.colors.gray[600]};
  font-family: ${theme.typography.body1.fontFamily};
  font-weight: ${theme.typography.body1.fontWeight};
  font-size: ${theme.typography.body1.fontSize};
  line-height: ${theme.typography.body1.lineHeight};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.primary ? theme.colors.primary[500] : theme.colors.gray[100]};
  }
`;

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [selectedReason, setSelectedReason] = React.useState('');

  const reportReasons = [
    '스팸 또는 광고성 게시물',
    '부적절한 콘텐츠',
    '폭력적이거나 위험한 내용',
    '개인정보 노출',
    '저작권 침해',
    '기타'
  ];

  const handleSubmit = () => {
    if (selectedReason) {
      onSubmit(selectedReason);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>게시글 신고</ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ReportOptions>
          {reportReasons.map((reason) => (
            <ReportOption key={reason}>
              <RadioInput
                type="radio"
                name="reportReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
              <OptionText>{reason}</OptionText>
            </ReportOption>
          ))}
        </ReportOptions>
        
        <ButtonContainer>
          <Button onClick={onClose}>취소</Button>
          <Button primary onClick={handleSubmit} disabled={!selectedReason}>
            신고하기
          </Button>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ReportModal; 