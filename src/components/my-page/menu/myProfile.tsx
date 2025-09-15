import { FaChevronRight } from "react-icons/fa";
import { GiftBtn, GoToStore, GoToStoreBox, HallabongWrapper, MyProfileBox, MyProfileWrapper, NicknameBox, NicknameWrapper, ProfileImgWrapper } from "./style";
import { useAuth } from "src/context";
import Hanlabong from '../../../assets/hanlabong.svg'
import { useNavigate } from "react-router-dom";
import Default from '../../../assets/default_profile.svg'

const MyProfileWrap = () => {
    const { state } = useAuth();
    const user = state.user;

    const nickname = user?.nickname ?? '게스트';
    const level = user?.moodGrade ?? '00';
    const profile = user?.profile ?? Default;

    const navigate = useNavigate();

    return(
        <MyProfileWrapper>
            <MyProfileBox onClick={() => navigate('/mypage/account/profile')}>
                <ProfileImgWrapper>
                    <img 
                        src={profile}
                        alt={`${nickname} 프로필`}
                        onError={(e) => (e.currentTarget as HTMLImageElement).src = Default}
                    />
                </ProfileImgWrapper>
                <NicknameWrapper>
                    <NicknameBox>
                        <span>{nickname}</span>
                        <FaChevronRight color="#B7B7B7"/>
                    </NicknameBox>
                    <span>LV. {level}</span>
                </NicknameWrapper>
            </MyProfileBox>
            <HallabongWrapper>
                <GoToStoreBox>
                    <img src={Hanlabong} style={{ width: "50px"}} alt="" />
                    <GoToStore onClick={() => navigate('/inapp/shop')}>
                        <div>
                            <h4>상점</h4>
                            <span>한라봉으로 다양한 상품을 구매해요!</span>
                        </div>
                            <FaChevronRight color="#B7B7B7"/>
                    </GoToStore>
                </GoToStoreBox>
                <GiftBtn type="button" onClick={() => navigate('/mypage/mycoupons')}>내 상품권 확인하기</GiftBtn>
            </HallabongWrapper>
        </MyProfileWrapper>
    )
};

export default MyProfileWrap;