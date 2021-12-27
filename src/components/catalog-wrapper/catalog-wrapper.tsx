import Filter from '../filter/filter';
import Sorting from '../sorting/sorting';
import ProductCardsList from '../product-cards-list/product-cards-list';
import Pagination from '../pagination/pagination';
import {GUITARS} from '../../mocks';

function CatalogWrapper(): JSX.Element {
  return (
    <div className="catalog">
      <Filter />
      <Sorting />
      <ProductCardsList productsList={GUITARS} />
      <Pagination />
    </div>
  );
}

export default CatalogWrapper;
