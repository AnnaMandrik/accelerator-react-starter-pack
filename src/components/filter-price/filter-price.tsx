import {useSelector, useDispatch} from 'react-redux';
import {useRef, useEffect, FormEvent} from 'react';
import {getDefaultMinPrice, getDefaultMaxPrice} from '../../store/main-data/selectors';
import {getMaxUserPrice, getMinUserPrice, getUserSorting, getUserOrder} from '../../store/user-data/selectors';
import {FilterOfPrices, DIGIT_ZERO} from '../../const';
import {getFilterPriceInfo, getSortingOrderInfo} from '../../utils';
import {fetchFilterUserAction} from '../../store/api-actions';
import {selectMaxPrice, selectMinPrice} from '../../store/action';

function FilterPrice(): JSX.Element {
  const minDefaultPrice = useSelector(getDefaultMinPrice);
  const maxDefaultPrice = useSelector(getDefaultMaxPrice);
  const maxUserPrice = useSelector(getMaxUserPrice);
  const minUserPrice = useSelector(getMinUserPrice);
  const userSorting = useSelector(getUserSorting);
  const userOrder = useSelector(getUserOrder);


  // const [, setPriceMin] = useState<string>('');
  // const [, setPriceMax] = useState<string>('');

  const minDefaultPriceRef = useRef(null);
  const maxDefaultPriceRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilterUserAction(getFilterPriceInfo(minUserPrice, maxUserPrice, getSortingOrderInfo(userSorting, userOrder))));
  }, [dispatch,minUserPrice, maxUserPrice, userSorting, userOrder]);

  const handlerMinPriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const priceValue = evt.currentTarget.value;
    dispatch(selectMinPrice(priceValue));
  };

  const handlerMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const priceValue = evt.currentTarget.value;
    dispatch(selectMaxPrice(priceValue));
  };

  const handlerEmptyPlaceChange = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      return;
    }
    const min = Number(minUserPrice);
    const max = Number(maxUserPrice);

    switch (evt.currentTarget.name) {
      case FilterOfPrices.PRICE_MIN.name:
        if (min < minDefaultPrice || min === DIGIT_ZERO) {
          dispatch(selectMinPrice(String(minDefaultPrice)));
        }

        if (min > maxDefaultPrice) {
          dispatch(selectMaxPrice(String(maxDefaultPrice)));
        }
        break;
      case FilterOfPrices.PRICE_MAX.name:
        if (max > maxDefaultPrice || max === DIGIT_ZERO) {
          dispatch(selectMaxPrice(String(maxDefaultPrice)));
        }

        if (max < maxDefaultPrice) {
          dispatch(selectMaxPrice(String(minDefaultPrice)));
        }
        break;
      default:
        break;
    }
  };

  //   switch (evt.currentTarget.id) {
  //     case FilterOfPrices.PRICE_MIN.id: {
  //       let priceOfUser = Number(evt.currentTarget.value);

  //       if (priceOfUser < minDefaultPrice) {
  //         priceOfUser = minDefaultPrice;
  //       }

  //       // if (priceOfUser > maxDefaultPrice) {
  //       //   priceOfUser = maxDefaultPrice;
  //       // }

  //       if (priceOfUser < DIGIT_ZERO) {
  //         priceOfUser = minDefaultPrice;
  //       }
  //       setPriceMin(String(priceOfUser));
  //       dispatch(selectMinPrice(String(priceOfUser)));
  //       break;
  //     }
  //     case FilterOfPrices.PRICE_MAX.id: {
  //       let priceOfUser = Number(evt.currentTarget.value);

  //       if (priceOfUser > maxDefaultPrice) {
  //         priceOfUser = maxDefaultPrice;
  //       }

  //       // if (priceOfUser < minDefaultPrice) {
  //       //   priceOfUser = minDefaultPrice;
  //       // }

  //       if (priceOfUser < DIGIT_ZERO) {
  //         priceOfUser = maxDefaultPrice;
  //       }

  //       setPriceMax(String(priceOfUser));
  //       dispatch(selectMaxPrice(String(priceOfUser)));
  //       break;
  //     }
  //     default:
  //       break;
  //   }
  //  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={minDefaultPrice.toString()}
            id={FilterOfPrices.PRICE_MIN.id}
            name={FilterOfPrices.PRICE_MIN.name}
            ref={minDefaultPriceRef}
            onChange={handlerMinPriceChange}
            value={minUserPrice}
            onBlur={handlerEmptyPlaceChange}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxDefaultPrice.toString()}
            id={FilterOfPrices.PRICE_MAX.id}
            name={FilterOfPrices.PRICE_MAX.name}
            ref={maxDefaultPriceRef}
            onChange={handlerMaxPriceChange}
            value={maxUserPrice}
            onBlur={handlerEmptyPlaceChange}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
