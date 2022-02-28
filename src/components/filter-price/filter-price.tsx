import {useSelector, useDispatch} from 'react-redux';
import {ChangeEvent, memo, useEffect, useState} from 'react';
import {getDefaultMinPrice, getDefaultMaxPrice} from '../../store/main-data/selectors';
import {FilterOfPrices} from '../../const';
import { getUserFilter } from '../../store/user-data/selectors';
import { fetchFilterUserAction } from '../../store/api-actions';


type FilterPriceProps = {
  page: number
}

function FilterPrice({page}: FilterPriceProps): JSX.Element {
  const minDefaultPrice = useSelector(getDefaultMinPrice);
  const maxDefaultPrice = useSelector(getDefaultMaxPrice);
  const filter = useSelector(getUserFilter);
  const {minPrice, maxPrice} = filter;

  const [actualMinPrice, setActualMinPrice] = useState(minPrice);
  const [actualMaxPrice, setActualMaxPrice] = useState(maxPrice);

  const dispatch = useDispatch();

  useEffect(() => {
    setActualMinPrice(minPrice);
    setActualMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);


  const handleMinInputBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let actualFilter = filter;
    let userPrice = evt.target.value;

    if (userPrice === '') {
      setActualMinPrice(userPrice);
      actualFilter = {...actualFilter, minPrice: userPrice};
      dispatch(fetchFilterUserAction(actualFilter, page));
      return;
    }
    if (+userPrice < minDefaultPrice) {
      userPrice = minDefaultPrice.toString();
    }
    if (+userPrice > maxDefaultPrice) {
      userPrice = maxDefaultPrice.toString();
    }
    if (+userPrice > +actualMinPrice&&actualMaxPrice!=='') {
      userPrice = actualMaxPrice;
    }
    setActualMinPrice(userPrice);
    actualFilter = {...actualFilter, minPrice: userPrice};
    dispatch(fetchFilterUserAction(actualFilter, page));
  };

  const handleMaxInputBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let actualFilter = filter;
    let userPrice = evt.target.value;
    if (userPrice === '') {
      setActualMaxPrice(userPrice);
      actualFilter = {...actualFilter, maxPrice: userPrice};
      dispatch(fetchFilterUserAction(actualFilter, page));
      return;
    }
    if (+userPrice > maxDefaultPrice) {
      userPrice = maxDefaultPrice.toString();
    }
    if (+userPrice < minDefaultPrice) {
      userPrice = minDefaultPrice.toString();
    }
    if (+userPrice < +actualMinPrice&&actualMaxPrice!=='') {
      userPrice = actualMinPrice;
    }
    setActualMaxPrice(userPrice);
    actualFilter = {...actualFilter, maxPrice: userPrice};
    dispatch(fetchFilterUserAction(actualFilter, page));
  };

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
            onChange={(evt) => setActualMinPrice(evt.currentTarget.value)}
            value={actualMinPrice}
            onBlur={handleMinInputBlur}
            data-testid = 'priceMin'
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxDefaultPrice.toString()}
            id={FilterOfPrices.PRICE_MAX.id}
            name={FilterOfPrices.PRICE_MAX.name}
            onChange={(evt) => setActualMaxPrice(evt.currentTarget.value)}
            value={actualMaxPrice}
            onBlur={handleMaxInputBlur}
            data-testid = 'priceMax'
          />
        </div>
      </div>
    </fieldset>
  );
}

export default memo(FilterPrice);
