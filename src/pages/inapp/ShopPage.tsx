import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductCategory } from "src/api/product";
import BackHeader from "src/components/commons/Header/BackHeader";
import TabMenu from "src/components/commons/TabMenu";
import MyHanlabong from "src/components/inapp/hanlabong/MyHanlabong";
import { InappWrapper } from "src/components/inapp/style";
import { ProductList } from "src/components/my-page/product/ProductList";
import ChargePopup from "src/components/popup/ChargePopup";
import { useProducts } from "src/features/product/useProducts";

const CATEGORIES: ProductCategory[] = ["JEJU_TICON", "GOODS"];

const ShopPage = () => {
    const [category, setCategory] = useState<ProductCategory>("JEJU_TICON");
    const [popup, setPopup] = useState(false);   
    const { products, isLoading, isError, error, refetch } = useProducts(category);

    const navigate = useNavigate();

    const handleClickItem = useCallback(
        (id: number) => navigate(`/inapp/shop/${id}`, { state: { category }}),
        [navigate, category]
    );

    // convert API
    const handleSumbitCharge = () => {
        // API

        setPopup(false);
    }

    return(
        <>
            <BackHeader title="구매하기" />
            <InappWrapper>
                <MyHanlabong onChargeClick={() => setPopup(true)}/>
                <TabMenu 
                    items={[
                        {key: "JEJU_TICON", label: '제주티콘'},
                        {key: "GOODS", label: '굿즈'}
                    ]}
                    value={category}
                    onChange={(k) => setCategory(k as ProductCategory)}
                />
                {!isLoading && !isError && products && products.length > 0 && (
                    <ProductList 
                        mode="shop"
                        products={products}
                        onClickItem={handleClickItem}
                    />
                )}
            </InappWrapper>

            <ChargePopup 
                open={popup}
                onClose={() => setPopup(false)}
                onSubmit={handleSumbitCharge}
            />
        </>
    );
};

export default ShopPage;