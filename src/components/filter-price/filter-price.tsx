import {useSelector, useDispatch} from 'react-redux';
import {useRef, FormEvent, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {getDefaultMinPrice, getDefaultMaxPrice} from '../../store/main-data/selectors';
import {getMaxUserPrice, getMinUserPrice} from '../../store/user-data/selectors';
import {FilterOfPrices, DEFAULT_PAGE, CountOfPages, AppRoute} from '../../const';
import {selectMaxPrice, selectMinPrice, selectActualPage, selectFirstPage, selectLastPage} from '../../store/action';
import browserHistory from '../../browser-history';
import {getCheckingMinPrice, getCheckingMaxPrice} from '../../utils';


function FilterPrice(): JSX.Element {
  const minDefaultPrice = useSelector(getDefaultMinPrice);
  const maxDefaultPrice = useSelector(getDefaultMaxPrice);
  const maxUserPrice = useSelector(getMaxUserPrice);
  const minUserPrice = useSelector(getMinUserPrice);

  const [minPrice, setMinPrice] = useState<string>(minUserPrice);
  const [maxPrice, setMaxPrice] = useState<string>(maxUserPrice);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const minDefaultPriceRef = useRef(null);
  const maxDefaultPriceRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setMinPrice(minUserPrice);
    setMaxPrice(maxUserPrice);
  }, [minUserPrice, maxUserPrice]);


  const handleInputBlur = (evt: FormEvent<HTMLInputElement>) => {
    const userPrice = Number(evt.currentTarget.value);

    switch (evt.currentTarget.id) {
      case FilterOfPrices.PRICE_MIN.id: {
        const checkedMinPrice = getCheckingMinPrice(userPrice, minDefaultPrice, maxDefaultPrice, maxPrice);
        setMinPrice(checkedMinPrice);
        dispatch(selectMinPrice(checkedMinPrice));

        // searchParams.has('price_gte')
        //   ? searchParams.set('price_gte', checkedMinPrice)
        //   : searchParams.append('price_gte', checkedMinPrice);
        break;
      }
      case FilterOfPrices.PRICE_MAX.id: {
        const checkedMaxPrice = getCheckingMaxPrice(userPrice, minDefaultPrice, maxDefaultPrice, minPrice);
        setMaxPrice(checkedMaxPrice);
        dispatch(selectMaxPrice(checkedMaxPrice));

        // searchParams.has('price_lte')
        //   ? searchParams.set('price_lte', checkedMaxPrice)
        //   : searchParams.append('price_lte', checkedMaxPrice);
        break;
      }
      default:
        break;
    }

    dispatch(selectFirstPage(CountOfPages.First));
    dispatch(selectLastPage(CountOfPages.Last));
    dispatch(selectActualPage(DEFAULT_PAGE));
    //const actualItemsOnPage = getItems(DEFAULT_PAGE);

    // searchParams.has('price_gte')
    //   ? searchParams.set('_start', String(actualItemsOnPage.firstItem))
    //   : searchParams.append('_start', String(actualItemsOnPage.firstItem));
    // searchParams.has('_end')
    //   ? searchParams.set('_end', String(actualItemsOnPage.lastItem))
    //   : searchParams.append('_end', String(actualItemsOnPage.lastItem));

    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
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
            ref={minDefaultPriceRef}
            onChange={(evt) => setMinPrice(evt.currentTarget.value)}
            value={minPrice}
            onBlur={handleInputBlur}
            data-testid="min-price"
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
            onChange={(evt) => setMaxPrice(evt.currentTarget.value)}
            value={maxPrice}
            onBlur={handleInputBlur}
            data-testid="max-price"
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
