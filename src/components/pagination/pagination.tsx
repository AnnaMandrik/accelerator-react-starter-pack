import {useSelector, useDispatch} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {AppRoute, STEP_OF_COUNT, DEFAULT_PAGE} from '../../const';
import {getPagesCount} from '../../store/main-data/selectors';
import {getUserActualPage, getIsFilterChecked, getUserActualPageCount, getUserFirstPage, getUserLastPage} from '../../store/user-data/selectors';
import {selectActualPage, nextFirstPage, nextLastPage, prevFirstPage, prevLastPage} from '../../store/action';
import browserHistory from '../../browser-history';


function Pagination(): JSX.Element {
  const isFilter = useSelector(getIsFilterChecked);
  const pagesCount = useSelector(getPagesCount);
  const actualPageCount = useSelector(getUserActualPageCount);
  const firstPage = useSelector(getUserFirstPage);
  const lastPage = useSelector(getUserLastPage);
  const actualPage = useSelector(getUserActualPage);

  const dispatch = useDispatch();

  const pageCountDefault = isFilter ? actualPageCount : pagesCount;
  const pagination = Array(pageCountDefault).fill(true).map((_, i) => i + 1);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);


  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          (actualPage !== DEFAULT_PAGE) &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              href="##"
              onClick={(evt) => {
                evt.preventDefault();
                const currentPage = actualPage - 1;

                if (currentPage % STEP_OF_COUNT === 0) {
                  dispatch(prevFirstPage());
                  dispatch(prevLastPage());
                }

                dispatch(selectActualPage(currentPage));
                browserHistory.push(AppRoute.Page.replace(':page', `page_${currentPage}/?${searchParams.toString()}`));
              }}
            >
              Назад
            </a>
          </li>
        }
        {
          pagination.slice(firstPage, lastPage).map((page) => {
            const key = `${page}-page`;

            return (
              <li key={key} className={`pagination__page${(page === actualPage) ? ' pagination__page--active' : ''}`}>
                <a
                  href="##"
                  className= "link pagination__page-link"
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(selectActualPage(page));
                    browserHistory.push(AppRoute.Page.replace(':page', `page_${page}/?${searchParams.toString()}`));
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })
        }
        {
          (actualPage !== actualPageCount) &&

          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href="##"
              onClick={(evt) => {
                evt.preventDefault();
                const currentPage = actualPage + 1;

                if (currentPage % STEP_OF_COUNT === 1) {
                  dispatch(nextFirstPage());
                  dispatch(nextLastPage());
                }

                dispatch(selectActualPage(currentPage));
                browserHistory.push(AppRoute.Page.replace(':page', `page_${currentPage}/?${searchParams.toString()}`));
              }}
            >
              Далее
            </a>
          </li>
        }
      </ul>
    </div>
  );
}

export default Pagination;
