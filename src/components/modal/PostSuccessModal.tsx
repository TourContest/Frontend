import styled from '@emotion/styled';
import { Overlay } from "./style";
import { theme } from 'src/styles/theme';
import BottomButton from '../commons/Buttons/BottomButton';
import { useNavigate } from 'react-router-dom';

const Modal = styled.div`
    border-radius: 20px;
    background: #fff;
    line-height: 1.4;
    width: calc(100% - 20px);
    max-width: 345px;
`;

const TextBox = styled.div`
    padding: 42px 20px 17px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
`;

const Title = styled.div`
    font-size: 20px;
    color: ${theme.colors.gray[800]};
    font-weight: 600;
`;

const Subtitle = styled.div`color: ${theme.colors.gray[600]};`;

const ButtonBox = styled.div`
    display: flex;
    gap: 10px;
    padding: 20px;
`;

type PostSuccessModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function PostSuccessModal({ open, onClose }: PostSuccessModalProps) {
    const navigate = useNavigate();

    if(!open) return null;

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
        if(e.target === e. currentTarget) onClose();
    };

    return (
        <Overlay onClick={handleClick}>
            <Modal>
                <TextBox>
                    <Title>성공적으로 글을 작성했어요!</Title>
                    <Subtitle>작성된 글을 보러가시겠어요?</Subtitle>
                </TextBox>
                <ButtonBox>
                    <BottomButton size='small' onClick={onClose}>취소</BottomButton>
                    <BottomButton 
                        size='small'
                        style={{
                            background: '#FF8B4C', color: "#fff"
                        }}
                        onClick={() => navigate('/community')}
                    >확인</BottomButton>
                </ButtonBox>
            </Modal>
        </Overlay>
    )
};