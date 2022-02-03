import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import browserHistory from '../../browser-history';
import {SortKey, OrderKey} from '../../const';
import {selectSorting, selectOrder} from '../../store/action';
import {getUserOrder, getUserSorting} from '../../store/user-data/selectors';
import './sorting.css';

function Sorting():JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sort = useSelector(getUserSorting);
  const order = useSelector(getUserOrder);

  const dispatch = useDispatch();

  const [actualSort, setActualSort] = useState<string>(sort);
  const [actualOrder, setActualOrder] = useState<string>(order);

  useEffect(() => {
    setActualSort(sort);
    setActualOrder(order);
  }, [sort, order]);

  const handleSortingTypeChange = (sortType: string): void => {
    if (actualOrder === '') {
      setActualOrder(OrderKey.Asc);
      dispatch(selectOrder(OrderKey.Asc));
    }
    setActualSort(sortType);
    dispatch(selectSorting(sortType));
    searchParams.set('sort', sortType);

    browserHistory.push(`${location.pathname}?${searchParams.toString()}`);
  };

  const handleOrderChange = (orderType: string): void => {
    if (actualSort === '') {
      setActualSort(SortKey.Price);
      dispatch(selectSorting(SortKey.Price));
    }
    setActualOrder(orderType);
    dispatch(selectOrder(orderType));
    searchParams.set('order', orderType);

    browserHistory.push(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(actualSort === SortKey.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={(actualSort === SortKey.Price) ? -1 : 0}
          onClick={()=> handleSortingTypeChange(SortKey.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(actualSort === SortKey.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={(actualSort === SortKey.Rating) ? -1 : 0}
          onClick={()=> handleSortingTypeChange(SortKey.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(actualOrder === OrderKey.Asc) ?
            ' catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={(actualOrder === OrderKey.Asc) ? -1 : 0}
          onClick={()=> handleOrderChange(OrderKey.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(actualOrder === OrderKey.Desc) ?
            ' catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={(actualOrder === OrderKey.Desc) ? -1 : 0}
          onClick={()=> handleOrderChange(OrderKey.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
