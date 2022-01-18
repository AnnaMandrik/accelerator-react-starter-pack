import {useSelector, useDispatch} from 'react-redux';
import {CountOfPages} from '../../const';
import {getPagesCount} from '../../store/main-data/selectors';
import {getUserActualPage, getIsFilterChecked, getUserActualPageCount, getUserFirstPage, getUserLastPage} from '../../store/user-data/selectors';
import {selectActualPage, nextFirstPage, nextLastPage, prevFirstPage, prevLastPage} from '../../store/action';


function Pagination(): JSX.Element {
  const isFilter = useSelector(getIsFilterChecked);
  const pagesCount = useSelector(getPagesCount);
  const actualPageCount = useSelector(getUserActualPageCount);
  const firstPage = useSelector(getUserFirstPage);
  const lastPage = useSelector(getUserLastPage);
  const actualPage = useSelector(getUserActualPage);

  const pageCountDefault = isFilter ? actualPageCount : pagesCount;
  const pagination = Array(pageCountDefault).fill(true).map((_, i) => i + 1);

  const dispatch = useDispatch();

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          (firstPage !== CountOfPages.First) &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              href="##"
              onClick={(evt) => {
                evt.preventDefault();

                dispatch(prevFirstPage());
                dispatch(prevLastPage());
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
              <li key={key} className="pagination__page">
                <a
                  className={`link pagination__page-link${(page === actualPage) ? 'pagination__page--active' : ''}`}
                  href="##"
                  onClick={() => {
                    dispatch(selectActualPage(page));
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })
        }
        {
          (lastPage < pageCountDefault) &&
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href="##"
              onClick={(evt) => {
                evt.preventDefault();

                dispatch(nextFirstPage());
                dispatch(nextLastPage());
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
