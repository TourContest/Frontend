import BottomButton from "src/components/commons/Buttons/BottomButton";
import { useMemo, useState } from "react";
import { Bar, CouponDetailWrapper } from "../style";
import { AvailablePlace, CouponAlert, CouponBox, CouponInformation, CouponName, ProductImgWrapper } from "./style";
import type { CouponDetailProps } from "./type";
import { useSessionMe } from "src/features/my-page/useSessionMe";
import { useAcceptToggle } from "src/features/my-page/useAcceptToggle";

export const CouponDetail: React.FC<CouponDetailProps> = ({ coupon }) => {
    const { data: me } = useSessionMe();
    const exchangeId = coupon.exchangeId;
    const [accepted, setAccepted] = useState<boolean>(coupon.accepted);
    const { mutateAsync, isPending } = useAcceptToggle();

    const disabled = useMemo(() => accepted || isPending, [accepted, isPending]);

    const onAccept = async () => {
        if (!exchangeId) {
            console.error('[accept-toggle] exchangeId 없음', coupon);
            return;
        }

        try {
            await mutateAsync({ exchangeId: coupon.exchangeId, userId: me?.userId ?? '' });
            setAccepted(true);
        } catch(err) {
            console.error('[accept-toggle ERR]: ', err)
        }
    }

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
                    type="button"
                    size ='large'
                    disabled={disabled ||isPending || !exchangeId}
                    form="login-form"
                    onClick={onAccept}
                    style={{ width: "100%" }}
                >
                    {accepted ? '수령완료' : (isPending ? '처리중' : '수령하기')}
                </BottomButton>
            </CouponBox>
        </CouponDetailWrapper>
    )
};