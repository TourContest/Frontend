import styled from '@emotion/styled';
import BottomButton from "../commons/Buttons/BottomButton";
import { IoClose } from "react-icons/io5";
import { Overlay } from './style';
import type { ShortageProps } from '../inapp/type';

const Modal = styled.div`
    padding: 11px 20px 20px 20px;
    border-radius: 20px;
    background: #fff;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
    line-height: 1.4;
    min-width: 290px;
    margin-bottom: 20px;

    h2 { font-size: 24px; font-weight: 600;  color: ${({ theme }) => theme.colors.gray[800]} }
    span { color: ${({ theme }) => theme.colors.gray[600]} };
`;

const CloseBtn = styled.div`
    margin-bottom: 15px;
    display: flex;
    align-items: flex-end;
`;


export default function ShortageModal ({ open, onClose, onConvertPoint, onJoinChallenge, onWritePost }: ShortageProps) {
    if(!open) return null;

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseBtn onClick={onClose}>
                    <IoClose size={24} fill='#b7b7b7'/>
                </CloseBtn>
                <TextBox>
                    <h2>한라봉이 부족하다면?</h2>
                    <span>한라봉을 받기 위한 방법을 알려드릴게요!</span>
                </TextBox>
                <div>
                    <BottomButton size='large' onClick={onConvertPoint}>포인트 전환</BottomButton>
                    <BottomButton size='large' onClick={onJoinChallenge}>챌린지</BottomButton>
                    <BottomButton size='large' onClick={onWritePost}>글쓰러가기</BottomButton>
                </div>
            </Modal>
        </Overlay>
    )
};