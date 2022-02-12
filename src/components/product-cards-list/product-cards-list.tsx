import { useSelector } from 'react-redux';
import ProductCard from '../product-card/product-card';
import {Guitars} from '../../types/guitar';
import {ITEMS_PER_PAGE} from '../../const';
import {getIsLoaded} from '../../store/main-data/selectors';
import Spinner from '../spinner/spinner';


type ProductCardsListProps = {
  productsList: Guitars;
}

function ProductCardsList({productsList}: ProductCardsListProps): JSX.Element {

  const isLoaded = useSelector(getIsLoaded);

  if (!isLoaded) {
    return <Spinner/>;
  }

  return (
    <div className="cards catalog__cards" data-testid="load-ok">
      {productsList.slice(0, ITEMS_PER_PAGE).map((guitar) => (
        <ProductCard key={guitar.id} guitar={guitar} /> ))}
    </div>
  );
}

export default ProductCardsList;
