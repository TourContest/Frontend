import BackHeader from "src/components/commons/Header/BackHeader";
import { EmptyState } from "src/components/my-page/product/EmptyState";
import { ProductList } from "src/components/my-page/product/ProductList";
import { useSessionMe } from "src/features/my-page/useSessionMe";
import { useNavigate } from "react-router-dom";
import { useMyProducts } from "src/features/my-page/useMyProducts";

const MyCouponsPage: React.FC = () => {
   const navigate = useNavigate();
   const { data: me, error: meError } = useSessionMe();
   const enabled = !!me?.userId; // userId가 준비되었을 때만 조회

   const { data: coupons, isLoading, isError } = useMyProducts(me?.userId, enabled);
   
   return (
      <>
         <BackHeader title="내 상품권" />
      
         {/* 로그인 필요 */}
         {!me && !meError && null}

         {me && (
            <>
               {!isLoading && !isError && (!coupons || coupons.length === 0 ) && (
                  <EmptyState />
               )}
               {!isLoading && !isError && coupons && coupons.length > 0 && (
                  <ProductList 
                     mode="owned"
                     products={coupons}
                     onClickItem={(exchangeId) => navigate(`/mypage/mycoupons/${exchangeId}`)}
                  />
               )}
            </>
         )}
      </>
   )
};

export default MyCouponsPage;