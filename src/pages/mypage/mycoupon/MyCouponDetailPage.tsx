import { Navigate, useParams } from "react-router-dom";
import { CouponDetail } from "src/components/my-page/product/CouponDetail";
import { useExchangeDetail } from "src/features/my-page/useExchangeDetail";
import BackHeader from "src/components/commons/Header/BackHeader";

const MyCouponDetailPage = () => {
    const { exchangeId } = useParams<{ exchangeId: string }>();
    if (!exchangeId) return <Navigate to='/mypage/mycoupons' replace />

    const { data: coupon } = useExchangeDetail(exchangeId);


    return(
        <>
            <BackHeader title="사용하기" />
            {coupon ? (
                <CouponDetail coupon={coupon} />
            ) : (
                null
            )}
        </>
    );
}

export default MyCouponDetailPage;