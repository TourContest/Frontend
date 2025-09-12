import BackHeader from "src/components/commons/Header/BackHeader";
import MyHanlabong02 from "src/components/inapp/hanlabong/MyHanlabong02";
import ProductDetail from "src/components/inapp/ProductDetail";
import BottomButton from "src/components/commons/Buttons/BottomButton";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ButtonWrapper } from "src/components/auth/login/login.style";
import { InappWrapper } from "src/components/inapp/style";
import { HanlabongBanner } from "src/components/inapp/HanlabongBanner";
import { useProduct } from "src/features/product/useProduct";
import type { ProductCategory } from "src/api/product";
import { useSessionMe } from "src/features/my-page/useSessionMe";
import { useExchangeProduct } from "src/features/product/useExchangeProduct";
import { useState } from "react";
import { Payment } from "src/components/inapp/Payment";
import HanlabongShortageOverlay from "src/components/inapp/HanlabongShortageOveray";
import ShortageModal from "src/components/modal/ShortageModal";
import ChargePopup from "src/components/popup/ChargePopup";
import ErrorToast from "src/components/commons/Toast";

type AreaState = { category?: ProductCategory}

const ProductShopPage = () => {
    const { productId } = useParams<{ productId: string }>();
    if (!productId) return <Navigate to="/inapp/shop" replace/>; // 파라미터 없으면 조치
    
    const navigate = useNavigate();

    // 이동시 navigate(..., { state })로 저장된 상태값 꺼내기
    const { state } = useLocation();
    const fallbackCategory = (state as AreaState)?.category;

    const { data: product, isLoading } = useProduct(productId);
    const { data: me } = useSessionMe();
    const exchange = useExchangeProduct();

    // 에러 토스트 (중복 구매)
    const [toast, setToast] = useState({ visible: false, message: ''});
    const showToast = (msg: string) => setToast({ visible: true, message: msg });
    // 예시 A) me 안에 플래그가 있는 경우
    const hasJejuTicon = (me as any)?.jejuTiconOwned === true 
    // 예시 B) me에 보유 목록이 있는 경우
    || Array.isArray((me as any)?.ownedProducts) && (me as any).ownedProducts.some((p: any) => p?.category === "JEJU_TICON");

    // detail(기본) → payment
    const [step, setStep] = useState<'detail' | 'payment'>('detail');

    // 부족
    const [shortage, setShortage] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);

    const handleConvert = () => {
        setShortage(false);
        setOpenModal(false);
        setOpenPopup(true);
    };
    

    const handleBuyClick = async () => {
        if(!product || !me?.userId) return;

         if (fallbackCategory === 'JEJU_TICON' && hasJejuTicon) {
            showToast('이미 보유 중인 제주 티콘이라 구매할 수 없어요.');
            return;
        }

        if (step === 'detail') {
            setStep('payment');
            return;
        };

        try {
            await exchange.mutateAsync({ productId: product.productId, userId: me.userId });
            // 성공 후 이동 처리
            navigate('/mypage');
        } catch(error: any) {
            // 에러 오버레이
            const errorCode = error?.response?.data?.errorCode;
            const message = error?.response?.data?.message;

            if (errorCode === "INSUFFICIENT_HALLABONG") setShortage(true);
        }
    }

    return(
        <>
            <BackHeader title='상품소개'/>
            <InappWrapper>
                <div style={{ maxWidth: '720px', margin: '0 auto' }}>    

                    {product && step === 'detail' && 
                        <>
                            <MyHanlabong02 />
                            <ProductDetail product={product} fallbackCategory={fallbackCategory} />
                        </>
                    }

                    {product && step === 'payment' && (
                        <Payment product={product} fallbackCategory={fallbackCategory} />
                    )}

                    <HanlabongBanner openModal={() => setOpenModal(true)}/>
                </div>
            </InappWrapper>
            <ButtonWrapper>
                <BottomButton onClick={handleBuyClick}>
                    구매하기
                </BottomButton>
            </ButtonWrapper>


            <ShortageModal 
                open={openModal}
                onClose={() => setOpenModal(false)}
                onConvertPoint={handleConvert}
                onJoinChallenge={() => {setOpenModal(false); navigate('/challenge')}}
                onWritePost={() => {setOpenModal(false); navigate('/Community')}}
            />

            <HanlabongShortageOverlay 
                open={shortage}
                onClose={() => setShortage(false)}
                onConvertPoint={handleConvert}
                onJoinChallenge={() => {setShortage(false); navigate('/challenge')}}
                onWritePost={() => {setShortage(false); navigate('/Community')}}
            />

            <ChargePopup 
                open={openPopup}
                onClose={() => setOpenPopup(false)}
            />
        </>
    )
};

export default ProductShopPage;