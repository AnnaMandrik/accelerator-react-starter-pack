import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import queryString from 'query-string';
import {useSearchParams} from 'react-router-dom';
import Filter from '../filter/filter';
import Sorting from '../sorting/sorting';
import ProductCardsList from '../product-cards-list/product-cards-list';
import Pagination from '../pagination/pagination';
import {getIsLoaded} from '../../store/main-data/selectors';
import {fetchFilterUserAction, fetchDefaultMinPriceAction, fetchSortedUserAction} from '../../store/api-actions';
import Spinner from '../spinner/spinner';
import { getUserFilter, getUserSorting } from '../../store/user-data/selectors';
import { clearFilter, clearSort } from '../../store/action';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { Helmet } from 'react-helmet-async';
import { HEAD_TITLE } from '../../const';


function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = useSelector(getUserFilter);
  const {types, strings, minPrice, maxPrice} = filter;
  const sort = useSelector(getUserSorting);
  const {sorting, order} = sort;
  const isLoaded = useSelector(getIsLoaded);
  const dispatch = useDispatch();
  const {number} = useParams();
  const page = Number(number);


  useEffect(() => {
    let actualFilter = filter;
    let actualSort = sort;
    const isSearchQuery = true;
    const typesSearch = searchParams.getAll('type') || [];
    const strigsSearch = searchParams.getAll('stringCount') || [];
    const minPriceSearch = searchParams.get('price_gte') || '';
    const maxPriceSearch = searchParams.get('price_lte') || '';
    const sortingSearch = searchParams.get('_sort') || '';
    const orderSearch = searchParams.get('_order') || '';
    if (typesSearch.length !== 0) {
      actualFilter = { ...actualFilter, types: typesSearch };
    }
    if (strigsSearch.length !== 0) {
      actualFilter = { ...actualFilter, strings: strigsSearch };
    }
    if (minPriceSearch !== '') {
      actualFilter = { ...actualFilter, minPrice: minPriceSearch };
    }
    if (maxPriceSearch !== '') {
      actualFilter = { ...actualFilter, maxPrice: maxPriceSearch };
    }
    if (maxPriceSearch === '') {
      actualFilter = { ...actualFilter, maxPrice: '' };
    }
    if (sortingSearch !== '') {
      actualSort = { ...actualSort, sorting: sortingSearch };
    }
    if (orderSearch !== '') {
      actualSort = { ...actualSort, order: orderSearch };
    }
    dispatch(fetchDefaultMinPriceAction());
    dispatch(fetchFilterUserAction(actualFilter, page, isSearchQuery));
    dispatch(fetchSortedUserAction(page, actualSort));

    return ()=>{
      dispatch(clearFilter());
      dispatch(clearSort());
    };
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);


  useEffect(() => {
    const params = queryString.stringify(
      {
        'type': types,
        'stringCount': strings,
        'price_gte': minPrice,
        'price_lte': maxPrice,
        _sort: sorting,
        _order: order,
      },
      { skipEmptyString: true, skipNull: true },
    );
    setSearchParams(params);
  }, [types, strings, minPrice, setSearchParams, maxPrice, sorting, order]);


  if (!isLoaded) {
    return <Spinner/>;
  }


  return (
    <>
      <Helmet title={HEAD_TITLE} />
      <div className="container">
        <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
        <Breadcrumbs />
        <div className="catalog">
          <Filter page={page} />
          <Sorting />
          <ProductCardsList />
          <Pagination page={page} />
        </div>
      </div>
    </>
  );
}

export default CatalogPage;
