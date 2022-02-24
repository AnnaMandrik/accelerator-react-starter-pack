import { memo } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute, DEFAULT_PAGE, ITEMS_PER_PAGE} from '../../const';
import {getPagesCount} from '../../store/main-data/selectors';
import usePage from '../../hooks/use-page/use-page';
import { fetchCatalogPageAction } from '../../store/api-actions';


type PaginationProps = {
  page: number;
};

function Pagination({page}: PaginationProps): JSX.Element | null{
  const pagesCount = useSelector(getPagesCount);
  const dispatch = useDispatch();
  const pages = usePage(page);
  const prevPage = page - 1;
  const nextPage = page + 1;
  const prevPagePath = generatePath(`${AppRoute.Main} ${AppRoute.Catalog}`, {number: prevPage.toString()});
  const nextPagePath = generatePath(`${AppRoute.Main}${AppRoute.Catalog}`, {number: nextPage.toString()});

  if (pagesCount === null) {
    return null;
  }
  const lastPage = Math.ceil(pagesCount /ITEMS_PER_PAGE);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--prev"
          id="prev"
          style={{ visibility: page === DEFAULT_PAGE ? 'hidden' : 'visible' }}
          data-testid = 'back'
        >
          <Link
            to={prevPagePath}
            className="link pagination__page-link"
            onClick={() => {
              dispatch(fetchCatalogPageAction(prevPage));
            }}
          >
              Назад
          </Link>
        </li>
        {
          pages.map((value) => {
            const pagePath = generatePath(`${AppRoute.Catalog}`, {number: value.toString()});
            if (value > lastPage) {
              return null;
            }

            return (
              <li key={value} className={`pagination__page ${value === page ? 'pagination__page--active' : ''}`}>
                <Link
                  to={`/${pagePath}`}
                  className= "link pagination__page-link"
                  onClick={() => {
                    dispatch(fetchCatalogPageAction(value));
                  }}
                  data-testid = 'pagination'
                >
                  {value}
                </Link>
              </li>
            );
          })
        }

        <li className="pagination__page pagination__page--next" id="next"
          style={{ visibility: page >= lastPage ? 'hidden' : 'visible' }}
          data-testid = 'next'
        >
          <Link
            className="link pagination__page-link"
            to={nextPagePath}
            onClick={() => dispatch(fetchCatalogPageAction(nextPage))}
          >
            Далее
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default memo(Pagination);
