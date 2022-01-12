import {useState} from 'react';
import {useSelector} from 'react-redux';
import {DEFAULT_PAGE, STEP_OF_COUNT, CountOfPages} from '../../const';
import {getPagesCount} from '../../store/main-data/selectors';


function Pagination(): JSX.Element {
  const [first, setFirst] = useState<number>(CountOfPages.First);
  const [last, setLast] = useState<number>(CountOfPages.Last);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);

  const pagesCount = useSelector(getPagesCount);
  const pagination = Array(pagesCount).fill(true).map((_, i) => i + 1);

  const handlerPageChange = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    setFirst((prevFirstPage) => prevFirstPage - STEP_OF_COUNT);
    setLast((prevLastPage) => prevLastPage - STEP_OF_COUNT);
  };

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {
          (first !== CountOfPages.First) &&
          <li className="pagination__page pagination__page--prev" id="prev">
            <a
              className="link pagination__page-link"
              href="1"
              onClick={handlerPageChange}
            >
          Назад
            </a>
          </li>
        }
        {
          pagination.slice(first, last).map((page) => {
            const key = `${page}-page`;

            return (
              <li key={key} className="pagination__page">
                <a
                  className={`link pagination__page-link${(page === currentPage) ? ' pagination__page--active' : ''}`}
                  href="##"
                  onClick={() => {
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </a>
              </li>
            );
          })
        }
        {
          (last < pagesCount) &&
          <li className="pagination__page pagination__page--next" id="next">
            <a
              className="link pagination__page-link"
              href="2"
              onClick={handlerPageChange}
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
