import type { OwnedProduct } from "src/api/product";
import { ProductItem } from "./ProductItem";
import { GridWrapper} from "./style";
import type { Product, ProductListProps } from "./type";

export const ProductList: React.FC<ProductListProps> = (props) => {
    const { mode, products, onClickItem } = props;

    return(
        <GridWrapper role="list">
            {products.map((item) => {
                if (mode === 'shop') {
                    const p = item as Product;
                    return (
                        <li key={p.id} role="listitem">
                            <ProductItem
                                id={p.id}
                                imageUrl={p.imageUrl}
                                name={p.name}
                                hallabongCost={p.hallabongCost}
                                onClick={onClickItem}
                            />
                        </li>
                    ) 
                } else {
                    const c = item as OwnedProduct;
                    return(
                        <li key={c.id} role="listitem">
                            <ProductItem
                                id={c.id}
                                imageUrl={c.imageUrl}
                                name={c.name}
                                onClick={onClickItem}
                            />
                        </li>          
                    )
                }
            })}
        </GridWrapper>
    )
};