import { ProductItem } from "./ProductItem";
import { GridWrapper} from "./style";
import type { OwnedProduct, ProductListProps } from "./type";

export const ProductList: React.FC<ProductListProps> = (props) => {
    if (props.mode === 'shop') {
        const { products, onClickItem } = props; // porducts: Product[]
        return (
            <GridWrapper role="list">
                {products.map((p, idx) => (
                    <li key={`shop:${String(p.productId)}:${idx}`} role="listitem">
                        <ProductItem
                            id={p.productId}
                            imageUrl={p.imageUrl}
                            name={p.name}
                            hallabongCost={p.hallabongCost}
                            onClick={onClickItem ? () => onClickItem(p.productId) : undefined}
                            />
                    </li>
                ))}
            </GridWrapper>
        );
    }
    
    const { products, onClickItem } = props;
    return (
        <GridWrapper role="list">
            {(products as OwnedProduct[]).map((c, idx) => (
                <li key={`owned:${String(c.exchangeId)}:${idx}}`} role="listitem">
                    <ProductItem 
                        id={c.exchangeId}
                        imageUrl={c.imageUrl}
                        name={c.name}
                        onClick={onClickItem ? () => onClickItem(c.exchangeId) : undefined}
                    />
                </li>
            ))}
        </GridWrapper>
    )
    
    // return(
    //     <GridWrapper role="list">
    //         {products.map((item) => {
    //             if (mode === 'shop') {
    //                 const p = item as Product;
    //                 return (
    //                     <li key={p.id} role="listitem">
    //                         <ProductItem
    //                             id={p.id}
    //                             imageUrl={p.imageUrl}
    //                             name={p.name}
    //                             hallabongCost={p.hallabongCost}
    //                             onClick={onClickItem}
    //                         />
    //                     </li>
    //                 ) 
    //             } else {
    //                 const c = item as OwnedProduct;
    //                 const exchangeId = (c as any).exchangeId ?? (c as any).id;
    //                 return(
    //                     <li key={c.id} role="listitem">
    //                         <ProductItem
    //                             id={c.id}
    //                             imageUrl={c.imageUrl}
    //                             name={c.name}
    //                             onClick={onClickItem}
    //                         />
    //                     </li>          
    //                 )
    //             }
    //         })}
    //     </GridWrapper>
    // )
};