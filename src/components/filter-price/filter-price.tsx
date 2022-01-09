import { useSelector } from 'react-redux';
import { useRef, useState, FormEvent } from 'react';
import {getMinPrice, getMaxPrice} from '../../store/main-data/selectors';
import {FilterOfPrices} from '../../const';

function FilterPrice(): JSX.Element {
  const minPrice = useSelector(getMinPrice);
  const maxPrice = useSelector(getMaxPrice);

  const [userMinPrice, setUserMinPrice] = useState<string>('');
  const [userMaxPrice, setUserMaxPrice] = useState<string>('');

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  const handlerMinPriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const priceValue = evt.currentTarget.value;
    setUserMinPrice(priceValue);
  };

  const handlerMaxPriceChange = (evt: FormEvent<HTMLInputElement>) => {
    const priceValue = evt.currentTarget.value;
    setUserMaxPrice(priceValue);
  };

  const handlerEmptyPlaceChange = (evt: FormEvent<HTMLInputElement>) => {
    if (evt.currentTarget.value === '') {
      return;
    }
    const min = Number(userMinPrice);
    const max = Number(userMaxPrice);

    switch (evt.currentTarget.name) {
      case FilterOfPrices.PRICE_MIN.name:
        if (min < minPrice) {
          setUserMinPrice(String(minPrice));
        }

        if (min > maxPrice) {
          setUserMinPrice(String(maxPrice));
        }
        break;
      case FilterOfPrices.PRICE_MAX.name:
        if (max > maxPrice) {
          setUserMaxPrice(String(maxPrice));
        }

        if (max < maxPrice) {
          setUserMaxPrice(String(minPrice));
        }
        break;
      default:
        break;
    }

    // switch (evt.currentTarget.id) {
    //   case FilterOfPrices.PRICE_MIN.id: {
    //     let priceValueOfUser = Number(evt.currentTarget.value);

    //     if (priceValueOfUser < minPrice) {
    //       priceValueOfUser = minPrice;
    //     }

    //     if (priceValueOfUser > maxPrice) {
    //       priceValueOfUser = maxPrice;
    //     }

    //     if (userMaxPrice !== '') {
    //       const maxValueOfUser = Number(userMaxPrice);

    //       if (priceValueOfUser > maxValueOfUser) {
    //         priceValueOfUser = maxValueOfUser;
    //       }
    //     }
    //     setUserMinPrice(String());
    //     break;
    //   }
    //   case FilterOfPrices.PRICE_MAX.id: {
    //     let priceValueOfUser = Number(evt.currentTarget.value);

    //     if (priceValueOfUser > maxPrice) {
    //       priceValueOfUser = maxPrice;
    //     }

    //     if (priceValueOfUser < minPrice) {
    //       priceValueOfUser = minPrice;
    //     }
    //     if (userMinPrice !== '') {
    //       const minValueOfUser = Number(userMinPrice);

    //       if (priceValueOfUser < minValueOfUser) {
    //         priceValueOfUser = minValueOfUser;
    //       }
    //     }
    //     setUserMaxPrice(String());
    //     break;
    //   }
    //   default:
    //     break;
    // }
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            type="number"
            placeholder={minPrice.toString()}
            id={FilterOfPrices.PRICE_MIN.id}
            name={FilterOfPrices.PRICE_MIN.name}
            ref={minPriceRef}
            onChange={handlerMinPriceChange}
            value={userMinPrice}
            onBlur={handlerEmptyPlaceChange}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            type="number"
            placeholder={maxPrice.toString()}
            id={FilterOfPrices.PRICE_MAX.id}
            name={FilterOfPrices.PRICE_MAX.name}
            ref={maxPriceRef}
            onChange={handlerMaxPriceChange}
            value={userMaxPrice}
            onBlur={handlerEmptyPlaceChange}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
