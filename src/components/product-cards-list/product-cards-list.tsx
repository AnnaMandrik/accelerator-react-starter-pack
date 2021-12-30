import ProductCard from '../product-card/product-card';
import {Guitars} from '../../types/guitar';
import {ITEMS_PER_PAGE} from '../../const';

type ProductCardsListProps = {
  productsList: Guitars;
}

function ProductCardsList({productsList}: ProductCardsListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {productsList.slice(0, ITEMS_PER_PAGE).map((guitar) => (
        <ProductCard key={guitar.id} guitar={guitar} /> ))}
    </div>
  );
}

export default ProductCardsList;
