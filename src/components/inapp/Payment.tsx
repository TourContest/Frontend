import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { PaymentBox, PaymentImgWrapper, PaymentProductBox, PaymentProductInfo, ProductArea, RowBar } from "./style";
import { useSessionMe } from "src/features/my-page/useSessionMe";
// import { useQueryClient } from "@tanstack/react-query";
import type { PaymentProps02 } from "./type";
import { CATEGORY_LABEL } from "./ProductDetail";
import AutoHanlabongField from "./AutoHanlabongFiled";
import Hanlabong from "../../assets/hanlabong.svg";


export const Payment: React.FC<PaymentProps02> = ({ product, fallbackCategory }) => {
    const { data: me } = useSessionMe();
    const available = me?.hallabong ?? 0;
    const label = fallbackCategory ? CATEGORY_LABEL[fallbackCategory] : "상품";

    const safePrice = product.hallabongCost ?? 0;
    // const priceMissing = product.hallabongCost === null;

    const [_, setPreview] = useState({ applied: 0, cashToPay: 0, shortage: 0 });

    // const qc = useQueryClient();

    return (
        <>
            <PaymentBox>
                <ProductArea>
                    <span>상품정보</span>
                    <FaChevronRight fill="#B7B7B7" size={12} />
                </ProductArea>
                <PaymentProductBox>
                    <PaymentImgWrapper>
                        <img 
                            src={product.imageUrl ?? ''}
                            loading="lazy"
                            decoding="async"
                        />
                    </PaymentImgWrapper>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <PaymentProductInfo>
                            <span>{label}</span>
                            <h4>{product.name}</h4>
                        </PaymentProductInfo>
                        <div>
                            <span className="price">{product.hallabongCost}</span>
                            <img src={Hanlabong} style={{ width: "20px" }}/>
                        </div>
                    </div>
                </PaymentProductBox>
            </PaymentBox>
            <RowBar />
            <PaymentBox>
                <h4>보유 한라봉</h4>
                <AutoHanlabongField 
                    price={safePrice}
                    available={available}
                    onPreviewChange={setPreview}
                />
            </PaymentBox>
        </>
    )
};