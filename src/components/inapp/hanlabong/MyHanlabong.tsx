import { MyHanlabongWrapper, MyHanlabongBox, Bar, ChargeBtn } from "../style";
import { FaChevronRight } from "react-icons/fa";
import Hanlabong from '../../../assets/hanlabong.svg';
import { useSessionMe } from "src/features/my-page/useSessionMe";

type Props = { onChargeClick?: () => void };

const MyHanlabong = ({ onChargeClick }: Props) => {
    const { data } = useSessionMe();

    const hallabong = data?.hallabong;
    const display = hallabong != null ? hallabong.toLocaleString('ko-KR') : '-';

    return (
        <MyHanlabongWrapper>
            <MyHanlabongBox>
                <span>내 한라봉</span>
                <img src={Hanlabong} />
                <span className="hanlabong">{display}</span>
            </MyHanlabongBox>
            <Bar />
            <ChargeBtn onClick={onChargeClick}>
                한라봉 채우기
                <FaChevronRight size={14} />
            </ChargeBtn>
        </MyHanlabongWrapper>
    )
};

export default MyHanlabong;