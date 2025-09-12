import type { Product } from "../my-page/product/type";
import { FaChevronRight } from "react-icons/fa";
import { CouponName, ProductImgWrapper } from "../my-page/product/style";
import { ProductArea, ProductDetailBox, ProductInformation, ProductsName } from "./style";
import Hanlabong from '../../assets/hanlabong.svg';
import type { ProductCategory } from "src/api/product";

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  JEJU_TICON: "제주티콘",
  GOODS: "굿즈",
};

type ProductDetailProps = { product: Product; fallbackCategory?: ProductCategory };

const ProductDetail = ({ product, fallbackCategory }: ProductDetailProps) => {
    if (!product) return null;

    const label = fallbackCategory ? CATEGORY_LABEL[fallbackCategory] : "상품";

    return (
        <ProductDetailBox>
            <ProductImgWrapper checker>
                <img 
                    src={product.imageUrl ?? ''}
                    loading="lazy"
                    decoding="async"
                />
            </ProductImgWrapper>
            <ProductInformation>
                <ProductArea>
                    <span>{label}</span>
                    <FaChevronRight fill="#B7B7B7" size={12} />
                </ProductArea>
                <ProductsName>
                    <CouponName className="product">{product.name}</CouponName>
                    {typeof product.hallabongCost === 'number' && (
                        <div className="price">
                            <span>{product.hallabongCost}</span>
                            <img src={Hanlabong} />
                        </div>
                    )}
                </ProductsName>
            </ProductInformation>
        </ProductDetailBox>
    )
};

export default ProductDetail;