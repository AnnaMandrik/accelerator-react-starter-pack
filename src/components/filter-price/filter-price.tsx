import {useSelector, useDispatch} from 'react-redux';
import {useRef, ChangeEvent} from 'react';
import { useLocation } from 'react-router-dom';
import {getDefaultMinPrice, getDefaultMaxPrice} from '../../store/main-data/selectors';
import {getMaxUserPrice, getMinUserPrice} from '../../store/user-data/selectors';
import {FilterOfPrices, DIGIT_ZERO, DEFAULT_PAGE, CountOfPages, AppRoute} from '../../const';
import {selectMaxPrice, selectMinPrice, selectActualPage, selectFirstPage, selectLastPage} from '../../store/action';
import browserHistory from '../../browser-history';
import {getItems} from '../../utils';


function FilterPrice(): JSX.Element {
  const minDefaultPrice = useSelector(getDefaultMinPrice);
  const maxDefaultPrice = useSelector(getDefaultMaxPrice);
  const maxUserPrice = useSelector(getMaxUserPrice);
  const minUserPrice = useSelector(getMinUserPrice);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const minDefaultPriceRef = useRef(null);
  const maxDefaultPriceRef = useRef(null);

  const dispatch = useDispatch();

  const min = Number(minUserPrice);
  const max = Number(maxUserPrice);


  const handleInputMinBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    if (+price === min && +price < minDefaultPrice) {
      price = minDefaultPrice.toString();
    }
    if (+price === max && +price > maxDefaultPrice) {
      price = maxDefaultPrice.toString();
    }
    if (+price === DIGIT_ZERO) {
      price = minDefaultPrice.toString();
    }

    dispatch(selectMinPrice(price));
    dispatch(selectFirstPage(CountOfPages.First));
    dispatch(selectLastPage(CountOfPages.Last));
    dispatch(selectActualPage(DEFAULT_PAGE));
    const actualItemsOnPage = getItems(DEFAULT_PAGE);

    searchParams.has('price_gte')
      ? searchParams.set('_start', String(actualItemsOnPage.firstItem))
      : searchParams.append('_start', String(actualItemsOnPage.firstItem));
    searchParams.has('_end')
      ? searchParams.set('_end', String(actualItemsOnPage.lastItem))
      : searchParams.append('_end', String(actualItemsOnPage.lastItem));

    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };


  const handleInputMaxBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    let price = evt.target.value;
    if (+price === max && +price < minDefaultPrice) {
      price = minDefaultPrice.toString();
    }
    if (+price === max && +price > maxDefaultPrice) {
      price = maxDefaultPrice.toString();
    }
    if (+price === DIGIT_ZERO) {
      price = maxDefaultPrice.toString();
    }

    dispatch(selectMaxPrice(price));
  };


  const handlerMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = evt.target.value;
    dispatch(selectMinPrice(price));
  };

  const handlerMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const price = evt.target.value;
    dispatch(selectMaxPrice(price));
  };

  // const handlerEmptyPlaceChange = (evt: FormEvent<HTMLInputElement>) => {
  //   if (evt.currentTarget.value === '') {
  //     dispatch(selectMinPrice(evt.currentTarget.value));
  //     dispatch(selectMaxPrice(evt.currentTarget.value));
  //     return;
  //   }
  //   const min = Number(minUserPrice);
  //   const max = Number(maxUserPrice);

  //   switch (evt.currentTarget.name) {
  //     case FilterOfPrices.PRICE_MIN.name: {
  //       if (min < minDefaultPrice || min === DIGIT_ZERO) {
  //         dispatch(selectMinPrice(String(minDefaultPrice)));
  //       }

  //       if (min > maxDefaultPrice) {
  //         dispatch(selectMaxPrice(String(maxDefaultPrice)));
  //       }
  //       searchParams.has('price_gte')
  //         ? searchParams.set('price_gte', (String(minDefaultPrice)))
  //         : searchParams.append('price_gte', (String(minDefaultPrice)));
  //       break;
  //     }
  //     case FilterOfPrices.PRICE_MAX.name: {
  //       if (max > maxDefaultPrice || max === DIGIT_ZERO) {
  //         dispatch(selectMaxPrice(String(maxDefaultPrice)));
  //       }

  //       searchParams.has('price_lte')
  //         ? searchParams.set('price_lte', (String(maxDefaultPrice)))
  //         : searchParams.append('price_lte', (String(maxDefaultPrice)));
  //       break;
  //     }
  //     default:
  //       break;
  //   }

  //   dispatch(selectFirstPage(CountOfPages.First));
  //   dispatch(selectLastPage(CountOfPages.Last));
  //   dispatch(selectActualPage(DEFAULT_PAGE));
  //   const actualItemsOnPage = getItems(DEFAULT_PAGE);

  //   searchParams.has('price_gte')
  //     ? searchParams.set('_start', String(actualItemsOnPage.firstItem))
  //     : searchParams.append('_start', String(actualItemsOnPage.firstItem));
  //   searchParams.has('_end')
  //     ? searchParams.set('_end', String(actualItemsOnPage.lastItem))
  //     : searchParams.append('_end', String(actualItemsOnPage.lastItem));

  //   browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  // };

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
            onBlur={handleInputMinBlur}
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
            onBlur={handleInputMaxBlur}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
