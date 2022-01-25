import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Filter from '../filter/filter';
import Sorting from '../sorting/sorting';
import ErrorPage from '../error-page/error-page';
import ProductCardsList from '../product-cards-list/product-cards-list';
import Pagination from '../pagination/pagination';
import {getGuitars} from '../../store/main-data/selectors';
import {selectOrder, selectSorting, selectStrings, selectType, selectActualPage, selectFirstPage, selectLastPage, selectMinPrice, selectMaxPrice} from '../../store/action';
import {fetchFilterUserAction} from '../../store/api-actions';
import {getUserActualPageCount, collectFilterInfo} from '../../store/user-data/selectors';
import {getItemsPerPage, getItems} from '../../utils';
//import {GUITARS} from '../../mocks';
import Header from '../header/header';
import Footer from '../footer/footer';
import {CountOfPages, STEP_OF_COUNT} from '../../const';
import {getIsLoaded} from '../../store/main-data/selectors';


type CatalogPageProps = {
  actualPage: number,
}

function CatalogPage({actualPage}: CatalogPageProps): JSX.Element {
  const guitarsList = useSelector(getGuitars);
  //const page = useSelector(getUserActualPage);
  const pageCount = useSelector(getUserActualPageCount);
  const filter = useSelector(collectFilterInfo);
  const isLoaded = useSelector(getIsLoaded);

  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const searchAllParams = {
      start: searchParams.get('_start'),
      min: searchParams.get('price_gte'),
      max: searchParams.get('price_lte'),
      types: searchParams.getAll('type'),
      strings: searchParams.getAll('stringCount'),
      sortingType: searchParams.get('sort'),
      sortingOrder: searchParams.get('order'),
    };

    if (searchAllParams.min !== null) {
      dispatch(selectMinPrice(searchAllParams.min));
    }
    if (searchAllParams.max !== null) {
      dispatch(selectMaxPrice(searchAllParams.max));
    }
    if (searchAllParams.types !== null) {
      dispatch(selectType(searchAllParams.types));
    }
    if (searchAllParams.strings !== null) {
      dispatch(selectStrings(searchAllParams.strings));
    }
    if (searchAllParams.sortingType !== null) {
      dispatch(selectSorting(searchAllParams.sortingType));
    }
    if (searchAllParams.sortingOrder !== null) {
      dispatch(selectOrder(searchAllParams.sortingOrder));
    }
    if (searchAllParams.start !== null) {
      let firstPage = CountOfPages.First;
      let lastPage = CountOfPages.Last;

      if (actualPage % STEP_OF_COUNT === 0) {
        firstPage = actualPage - 3;
        lastPage = actualPage;
      }
      if (actualPage % STEP_OF_COUNT === 1) {
        firstPage = actualPage - 1;
        lastPage = actualPage + 2;
      }
      if (actualPage % STEP_OF_COUNT === 2) {
        firstPage = actualPage - 2;
        lastPage = actualPage + 1;
      }

      const actualItemsOnPage = getItems(actualPage);

      searchParams.has('_start')
        ? searchParams.set('_start', String(actualItemsOnPage.firstItem))
        : searchParams.append('_start', String(actualItemsOnPage.firstItem));
      searchParams.has('_end')
        ? searchParams.set('_end', String(actualItemsOnPage.lastItem))
        : searchParams.append('_end', String(actualItemsOnPage.lastItem));

      dispatch(selectFirstPage(firstPage));
      dispatch(selectLastPage(lastPage));
      dispatch(selectActualPage(actualPage));
    }
  });


  useEffect(() => {
    const pageItems = getItemsPerPage(actualPage);
    dispatch(fetchFilterUserAction(pageItems, filter));
  }, [actualPage, pageCount, filter, dispatch]);

  if (isLoaded && (actualPage > pageCount) && (pageCount !== 0)) {
    return <ErrorPage />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a></li>
            <li className="breadcrumbs__item"><a className="link" >Каталог</a></li>
          </ul>
          <div className="catalog">
            <Filter />
            <Sorting />
            <ProductCardsList productsList={guitarsList} />
            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
