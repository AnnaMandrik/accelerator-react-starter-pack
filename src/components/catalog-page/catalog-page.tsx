import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import Filter from '../filter/filter';
import Sorting from '../sorting/sorting';
// import ErrorPage from '../error-page/error-page';
import ProductCardsList from '../product-cards-list/product-cards-list';
import Pagination from '../pagination/pagination';
import {getGuitars} from '../../store/main-data/selectors';
import {selectActualPage} from '../../store/action';
import {fetchFilterUserAction} from '../../store/api-actions';
import {getUserActualPage, getUserActualPageCount, collectFilterInfo} from '../../store/user-data/selectors';
import {getItemsPerPage} from '../../utils';
//import {GUITARS} from '../../mocks';
import Header from '../header/header';
import Footer from '../footer/footer';
import {DEFAULT_PAGE} from '../../const';

type CatalogPageProps = {
  actualPage: number,
}

function CatalogPage({actualPage}: CatalogPageProps): JSX.Element {
  const guitarsList = useSelector(getGuitars);
  const page = useSelector(getUserActualPage);
  const pageCount = useSelector(getUserActualPageCount);
  const filter = useSelector(collectFilterInfo);

  const dispatch = useDispatch();

  const pageItems = getItemsPerPage(page);

  useEffect(() => {
    let usingPage = actualPage;

    if (usingPage > pageCount) {
      usingPage = DEFAULT_PAGE;
    }

    dispatch(selectActualPage(usingPage));
    dispatch(fetchFilterUserAction(pageItems, filter));
  }, [actualPage, pageCount, pageItems, filter, dispatch]);

  // if (page > pageCount) {
  //   return <ErrorPage />;
  // }

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
