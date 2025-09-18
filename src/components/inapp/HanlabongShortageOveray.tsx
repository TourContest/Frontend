import { IoClose } from "react-icons/io5";
import { Back, CloseBtn, ShortageImgBox } from "./style";
import type { ShortageProps } from "./type";
import { MenuBox, MenuRow, MenuWrapper } from "../my-page/menu/style";
import Shortage from '../../assets/hanlabong-shortage.svg';
import Hanlabong from '../../assets/hanlabong.svg';
import Challenge from '../../assets/Challenge_ic.svg';
import Post from '../../assets/Edit.svg';

const HanlabongShortageOverlay: React.FC<ShortageProps> = ({
    open, onClose, onConvertPoint, onJoinChallenge, onWritePost,
}) => {
    if(!open) return null;

    return (
        <Back>
            <CloseBtn onClick={onClose}>
                <IoClose size={32} fill="#b7b7b7"/>
            </CloseBtn>
            <ShortageImgBox>
                <img src={Shortage}  />
                <div>
                    <h4>한라봉이 부족해요.</h4>
                    <span>한라봉을 받을 수 있는 방법을 알려드릴게요!</span>
                </div>
            </ShortageImgBox>
            <MenuWrapper style={{ margin: '0' }}>
                <MenuRow onClick={onConvertPoint}>
                    <MenuBox>
                        <img src={Hanlabong} style={{ width: '28.5px' }}/>
                        포인트 전환하기
                    </MenuBox>
                </MenuRow>
                <MenuRow onClick={onJoinChallenge}>
                    <MenuBox>
                        <img src={Challenge} />
                        챌린지 참여하기
                    </MenuBox>
                </MenuRow>
                <MenuRow onClick={onWritePost}>
                    <MenuBox>
                        <img src={Post} />
                        글 쓰러가기
                    </MenuBox>
                </MenuRow>
            </MenuWrapper>
        </Back>
    )
};

export default HanlabongShortageOverlay;