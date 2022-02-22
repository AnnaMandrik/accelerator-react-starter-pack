import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import {SortKey, OrderKey} from '../../const';
import { fetchSortedUserAction } from '../../store/api-actions';
import {getUserSorting} from '../../store/user-data/selectors';
import './sorting.css';


function Sorting():JSX.Element {
  const sort = useSelector(getUserSorting);
  const {sorting, order} = sort;

  const dispatch = useDispatch();
  const { number } = useParams();
  const page = Number(number);


  const handleOrderChange = (key: OrderKey) => {
    let actualSort = sort;
    if (sorting === '') {
      actualSort = {...actualSort, sorting: SortKey.Price};
    }
    actualSort = {...actualSort, order: key};
    dispatch(fetchSortedUserAction(page, actualSort));

  };

  const handleSortingTypeChange = (key: SortKey) => {
    const actualSort = {...sort, sorting: key};
    dispatch(fetchSortedUserAction(page, actualSort));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(sorting === SortKey.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={-1}
          onClick={()=> handleSortingTypeChange(SortKey.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(sorting === SortKey.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          onClick={()=> handleSortingTypeChange(SortKey.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(order === OrderKey.Asc) ?
            ' catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={()=> handleOrderChange(OrderKey.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(order === OrderKey.Desc) ?
            ' catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          onClick={()=> handleOrderChange(OrderKey.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default (Sorting);
