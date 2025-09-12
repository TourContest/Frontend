import { BannerWrapper, ChargeHanlabong } from "./style";
import { FaChevronRight } from "react-icons/fa";
import BannerImg from '../../assets/hanlabong_banner.svg'

type Props = { openModal?: () => void };

export const HanlabongBanner = ({ openModal }: Props) => {
    return (
        <BannerWrapper role="button" onClick={openModal}>
            <img src={BannerImg} />
            <div>
                <ChargeHanlabong>
                    <div>
                        한라봉이 부족하다면?
                        <FaChevronRight />
                    </div>
                    <span>한라봉 받으러 가기</span>
                </ChargeHanlabong>
            </div>
        </BannerWrapper>
    )
};