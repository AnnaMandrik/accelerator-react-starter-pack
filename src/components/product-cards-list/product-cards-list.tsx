import ProductCard from '../product-card/product-card';
import {Guitars} from '../../types/guitar';

type ProductCardsListProps = {
  productsList: Guitars;
}

function ProductCardsList({productsList}: ProductCardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {productsList.slice(0,9).map((guitar) => (
        <ProductCard key={guitar.id} guitar={guitar} /> ))}
    </div>
  );
}

export default ProductCardsList;
