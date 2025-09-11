import BottomButton from "src/components/commons/Buttons/BottomButton";
import { Bar, CouponDetailWrapper } from "../style";
import { AvailablePlace, CouponAlert, CouponBox, CouponInformation, CouponName, ProductImgWrapper } from "./style";
import type { CouponDetailProps } from "./type";

export const CouponDetail: React.FC<CouponDetailProps> = ({ coupon }) => {
    return (
        <CouponDetailWrapper>
            <CouponBox>
                <ProductImgWrapper checker>
                    <img 
                        src={coupon.imageUrl}
                        alt={coupon.name}
                        loading='lazy'
                        decoding='async'
                        draggable={false}
                    />
                </ProductImgWrapper>
                <CouponInformation>
                    <CouponName>{coupon.name}</CouponName>
                    <Bar />
                    <AvailablePlace>
                        <span className="caption">사용처</span>
                        <span className="place">인천광역시 중구 공항로271, 인천국제공항 제 1 여객터미널 교통센터 지하 1층</span>
                    </AvailablePlace>
                    <CouponAlert>
                        해당 버튼은 담당자에게 물품 수령 시 제출하며<br/>
                        1회만 사용 가능하고 재사용은 불가합니다.<br/>
                        ※ 사용 전 내용을 꼭 확인해 주세요. ※
                    </CouponAlert>
                </CouponInformation>
                <BottomButton
                    type="submit"
                    size ='large'
                    // disabled={!isFormValid}
                    form="login-form"
                    // onClick={onSubmit}
                    style={{ width: "100%" }}
                >
                    수령하기
                </BottomButton>
            </CouponBox>
        </CouponDetailWrapper>
    )
};