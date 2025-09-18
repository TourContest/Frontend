import { MyHanlabongWrapper, MyHanlabongBox } from "../style";
import Hanlabong from '../../../assets/hanlabong.svg';
import { useSessionMe } from "src/features/my-page/useSessionMe";

const MyHanlabong02 = () => {
    const { data } = useSessionMe();

    const hallabong = data?.hallabong;
    const display = hallabong != null ? hallabong.toLocaleString('ko-KR') : '-';

    return (
        <MyHanlabongWrapper className="sm">
            <MyHanlabongBox>
                <span>내 한라봉</span>
                <img src={Hanlabong} />
                <span className="hanlabong">{display}</span>
            </MyHanlabongBox>
        </MyHanlabongWrapper>
    )
};

export default MyHanlabong02;