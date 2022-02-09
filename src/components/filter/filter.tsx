import {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {selectType, selectStrings, selectActualPage, selectFirstPage, selectLastPage} from '../../store/action';
import {getUserType, getUserStrings} from '../../store/user-data/selectors';
import FilterPrice from '../filter-price/filter-price';
import {TYPE_NAMES, AppRoute, DEFAULT_PAGE, CountOfPages, STRINGS, TYPES_QUANTITY, STRINGS_QUANTITY, FILTER_OF_TYPES_STRINGS} from '../../const';
import browserHistory from '../../browser-history';


const allTypes = (factTypes: string[], type: string): string[] => {
  if (factTypes.includes(type)) {
    return factTypes.filter((factType) => factType !== type);
  }

  return [...factTypes, type];
};


function Filter(): JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userType = useSelector(getUserType);
  const userStrings = useSelector(getUserStrings);

  const [types, setTypes] = useState<boolean[]>(new Array(TYPES_QUANTITY).fill(false));
  const [strings, setStrings] = useState<boolean[]>(new Array(STRINGS_QUANTITY).fill(false));
  const [availableStrings, setAvailableStrings] = useState<number[]>(STRINGS);
  const [availableTypes, setAvailableTypes] = useState<string[]>(TYPE_NAMES);

  const dispatch = useDispatch();


  useEffect(() => {
    if (!types.some((type) => type)) {
      setAvailableStrings(STRINGS);
      return;
    }

    const guitarsHasStrings: number[] = [];

    types.forEach((isAvailable, index): void => {
      if (isAvailable) {
        guitarsHasStrings.push(...FILTER_OF_TYPES_STRINGS[index].stringsCount);
      }
    });

    setAvailableStrings(guitarsHasStrings);
  }, [types]);

  useEffect(() => {
    if (!strings.some((string) => string)) {
      setAvailableTypes(TYPE_NAMES);
      return;
    }

    const stringsHasGuitars: string[] = [];

    strings.forEach((isAvailable, index): void => {
      if (isAvailable) {
        FILTER_OF_TYPES_STRINGS.forEach((guitar, guitarIndex): void => {
          if (guitar.stringsCount.includes(STRINGS[index])) {
            stringsHasGuitars.push(FILTER_OF_TYPES_STRINGS[guitarIndex].name);
          }
        });
      }
    });

    setAvailableTypes(stringsHasGuitars);
  }, [strings]);

  const handleTypeChange = (items: string[]) => {
    searchParams.delete('type');
    items.map((item: string) => searchParams.append('type', item));

    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };

  const handleStringCountChange = (items: string[]) => {
    searchParams.delete('stringCount');
    items.map((item: string) => searchParams.append('stringCount', item));

    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };


  const handlePagesChange = () => {
    dispatch(selectFirstPage(CountOfPages.First));
    dispatch(selectLastPage(CountOfPages.Last));
    dispatch(selectActualPage(DEFAULT_PAGE));
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          FILTER_OF_TYPES_STRINGS.map((guitar, index) => {
            const key = `type-${guitar.name}`;
            const {name, type} = guitar;
            const isChecked = userType.includes(name);
            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={name}
                  name={name}
                  checked={isChecked}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    handlePagesChange();
                    const value = target.checked;
                    setTypes([...types.slice(0, index), value, ...types.slice(index + 1)]);
                    dispatch(selectType(allTypes(userType, name)));
                    handleTypeChange((allTypes(userType, name)));
                  }}
                  disabled={!availableTypes.includes(name)}
                  data-testid={name}
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
            const key = `string-${countOfString}`;

            return (
              <div key={key} className="form-checkbox catalog-filter__block-item">
                <input
                  className="visually-hidden"
                  type="checkbox"
                  id={`${countOfString}-strings`}
                  name={`${countOfString}-strings`}
                  checked={userStrings.includes(String(countOfString))}
                  onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                    const value = target.checked;
                    handlePagesChange();
                    setStrings([...strings.slice(0, index), value, ...strings.slice(index + 1)]);
                    dispatch(selectStrings(allTypes(userStrings, String(countOfString))));
                    handleStringCountChange(allTypes(userStrings, String(countOfString)));
                  }}
                  disabled={!availableStrings.includes(countOfString)}
                  data-testid={countOfString}
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
