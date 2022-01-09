import { ChangeEvent, useEffect, useState } from 'react';
import FilterPrice from '../filter-price/filter-price';
import {STRINGS, TYPES_QUANTITY, STRINGS_QUANTITY, FILTER_OF_TYPES_STRINGS} from '../../const';

function Filter(): JSX.Element {
  const [types, setTypes] = useState<boolean[]>(new Array(TYPES_QUANTITY).fill(false));
  const [strings, setStrings] = useState<boolean[]>(new Array(STRINGS_QUANTITY).fill(false));
  const [availableStrings, setAvailableStrings] = useState<number[]>(STRINGS);

  useEffect(() => {
    if (!types.some((type) => type)) {
      setAvailableStrings(STRINGS);
      return;
    }

    const guitarsHadStrings: number[] = [];

    types.forEach((isAvailable, index): void => {
      if (isAvailable) {
        guitarsHadStrings.push(...FILTER_OF_TYPES_STRINGS[index].stringsCount);
      }
    });

    setAvailableStrings(guitarsHadStrings);
  }, [types]);

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          FILTER_OF_TYPES_STRINGS.map((guitar, index) => {
            const key = `${index}-${guitar.name}`;
            const {name, type} = guitar;

            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={types[index]}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    setTypes([...types.slice(0, index), value, ...types.slice(index + 1)]);
                  }}
                />
                <label htmlFor={name}>{type}</label>
              </div>
            );
          })
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          STRINGS.map((countOfString, index) => {
            const key = `${index}-${countOfString}`;

            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={`${countOfString}-strings`}
                  name={`${countOfString}-strings`}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    setStrings([...strings.slice(0, index), value, ...strings.slice(index + 1)]);
                  }}
                  disabled={!availableStrings.includes(countOfString)}
                />
                <label htmlFor={`${countOfString}-strings`}>{countOfString}</label>
              </div>
            );
          })
        }
      </fieldset>
    </form>
  );
}

export default Filter;
