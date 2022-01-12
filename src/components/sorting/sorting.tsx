import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SortKey, OrderKey} from '../../const';
import {selectSorting, selectOrder} from '../../store/action';
// import {fetchFilterUserAction} from '../../store/api-actions';
// import {getUserStrings, getUserType, getMaxUserPrice, getMinUserPrice} from '../../store/user-data/selectors';
// import {getFilterTypeInfo, getFilterPriceInfo} from '../../utils/filter';

function Sorting():JSX.Element {
  const dispatch = useDispatch();

  const [actualSort, setActualSort] = useState<string>('');
  const [actualOrder, setActualOrder] = useState<string>('');

  // useEffect(() => {
  //   dispatch(fetchSortingProductCardsAction(`?_${Params.Sort}=${sort}${order && `&_${Params.Order}=${order}`}`));
  // }, [sort, order, dispatch]);

  const handlerSortingTypeChange = (type: string): void => {
    if (actualOrder === '') {
      setActualOrder(OrderKey.Asc);
      dispatch(selectOrder(OrderKey.Asc));
    }
    setActualSort(type);
    dispatch(selectSorting(type));
  };

  const handlerOrderChange = (order: string): void => {
    if (actualSort === '') {
      setActualSort(SortKey.Price);
      dispatch(selectSorting(SortKey.Price));
    }
    setActualOrder(order);
    dispatch(selectOrder(order));
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(actualSort === SortKey.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={(actualSort === SortKey.Price) ? -1 : 0}
          onClick={()=> handlerSortingTypeChange(SortKey.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(actualSort === SortKey.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={(actualSort === SortKey.Rating) ? -1 : 0}
          onClick={()=> handlerSortingTypeChange(SortKey.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(actualOrder === OrderKey.Asc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={(actualOrder === OrderKey.Asc) ? -1 : 0}
          onClick={()=> handlerOrderChange(OrderKey.Asc)}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(actualOrder === OrderKey.Desc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={(actualOrder === OrderKey.Desc) ? -1 : 0}
          onClick={()=> handlerOrderChange(OrderKey.Desc)}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
