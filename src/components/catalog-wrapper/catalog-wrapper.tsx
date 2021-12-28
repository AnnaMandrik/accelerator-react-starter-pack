import {useSelector} from 'react-redux';
import Filter from '../filter/filter';
import Sorting from '../sorting/sorting';
import ProductCardsList from '../product-cards-list/product-cards-list';
import Pagination from '../pagination/pagination';
import {getGuitars} from '../../store/main-data/selectors';
//import {GUITARS} from '../../mocks';

function CatalogWrapper(): JSX.Element {
  const guitarsList = useSelector(getGuitars);
  return (
    <div className="catalog">
      <Filter />
      <Sorting />
      <ProductCardsList productsList={guitarsList} />
      <Pagination />
    </div>
  );
}

export default CatalogWrapper;
