import { useSelector } from 'react-redux';
import ProductCard from '../product-card/product-card';
import {ITEMS_PER_PAGE} from '../../const';
import {getIsLoaded, getGuitars} from '../../store/main-data/selectors';
import Spinner from '../spinner/spinner';


function ProductCardsList(): JSX.Element {
  const allProductsList = useSelector(getGuitars);
  const isLoaded = useSelector(getIsLoaded);

  if (!isLoaded) {
    return <Spinner/>;
  }

  return (
    <div className="cards catalog__cards" data-testid="load-ok">
      {allProductsList.slice(0, ITEMS_PER_PAGE).map((product) => (
        <ProductCard key={product.id} guitar={product} /> ))}
    </div>
  );
}

export default ProductCardsList;
