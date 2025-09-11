import { useState } from "react";
import { ProductCard, ProductImgWrapper, ProductName, ProductPrice } from "./style";
import type { ProductItemProps } from "./type";
import Hanlabong from '../../../assets/hanlabong.svg';

export const ProductItem: React.FC<ProductItemProps> = ({ id, imageUrl, name, hallabongCost, onClick }) => {
    const [imgError, setImgError] = useState(false);
    const src: string | undefined = imageUrl ?? undefined;
    const hasImg = !!src && !imgError;

    return (
        <ProductCard onClick={() => onClick?.(id)}>
            <ProductImgWrapper checker={!hasImg}>
                {hasImg && (
                    <img 
                        src={src}
                        alt={name}
                        loading='lazy'
                        decoding='async'
                        onError={() => setImgError(true)}
                        draggable={false}
                    />
                )}
            </ProductImgWrapper>
            <ProductName title={name}>{name}</ProductName>
            {typeof hallabongCost === 'number' && 
                <ProductPrice>
                    <span>{hallabongCost.toLocaleString('ko-KR')}</span>
                    <img src={Hanlabong} />
                </ProductPrice>
            }
        </ProductCard>
    )
}