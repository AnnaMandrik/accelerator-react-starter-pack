import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchSortingProductCardsAction} from '../../store/api-actions';
import {Params, SortKey, OrderKey} from '../../const';

function Sorting():JSX.Element {
  const dispatch = useDispatch();

  const [sort, setSort] = useState<string>('');
  const [order, setOrder] = useState<string>('');

  useEffect(() => {
    dispatch(fetchSortingProductCardsAction(`?_${Params.Sort}=${sort}${order && `&_${Params.Order}=${order}`}`));
  }, [sort, order]);


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className={`catalog-sort__type-button${(sort === SortKey.Price) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по цене"
          tabIndex={(sort === SortKey.Price) ? -1 : 0}
          onClick={()=> setSort(SortKey.Price)}
        >
          по цене
        </button>
        <button
          className={`catalog-sort__type-button${(sort === SortKey.Rating) ? ' catalog-sort__type-button--active' : ''}`}
          aria-label="по популярности"
          tabIndex={(sort === SortKey.Rating) ? -1 : 0}
          onClick={()=> setSort(SortKey.Rating)}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--up${(order === OrderKey.Asc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По возрастанию"
          tabIndex={(order === OrderKey.Asc) ? -1 : 0}
          onClick={()=> {
            if (sort === '') {
              setSort(SortKey.Price);
            }
            setOrder(OrderKey.Asc);
          }}
        >
        </button>
        <button
          className={`catalog-sort__order-button catalog-sort__order-button--down${(order === OrderKey.Desc) ? ' catalog-sort__order-button--active' : ''}`}
          aria-label="По убыванию"
          tabIndex={(order === OrderKey.Desc) ? -1 : 0}
          onClick={()=> {
            if (sort === '') {
              setSort(SortKey.Price);
            }
            setOrder(OrderKey.Desc);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sorting;
