import {ChangeEvent, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {selectType, selectStrings, selectActualPage, selectFirstPage, selectLastPage} from '../../store/action';
import {getUserType, getUserStrings} from '../../store/user-data/selectors';
import FilterPrice from '../filter-price/filter-price';
import {DEFAULT_PAGE, CountOfPages, GuitarsType, StringCount, AppRoute} from '../../const';
import browserHistory from '../../browser-history';
import useUncheck from '../../hooks/use-uncheck/use-uncheck';
import useDisable from '../../hooks/use-disable/use-disable';
import {GuitarType, StringType} from '../../types/guitar';


const allItems = (factItems: string[], item: string): string[] => {
  if (factItems.includes(item)) {
    return factItems.filter((value) => value !== item);
  }
  return [...factItems, item];
};


function Filter(): JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userType = useSelector(getUserType);
  const userString = useSelector(getUserStrings);

  const dispatch = useDispatch();
  const setUnchecked = useUncheck(userType);
  const checkIsDisable = useDisable(userString);


  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentType = evt.target.value;
    const actualTypes = allItems(userType, currentType);
    const actualCounts = setUnchecked(actualTypes);
    dispatch(selectType(actualTypes));
    dispatch(selectStrings(actualCounts));
    handlePagesChange();
    searchParams.delete('type');
    actualTypes.map((item) => searchParams.append('type', item));
    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    const actualCounts = allItems(userString, stringCount);
    dispatch(selectStrings(actualCounts));
    handlePagesChange();
    searchParams.delete('stringCount');
    actualCounts.map((item) => searchParams.append('stringCount', item));
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
          [...GuitarsType.keys()].map((key) => {
            const { id, title } = GuitarsType.get(key) as GuitarType;

            return (
              <div key={id} className="form-checkbox catalog-filter__block-item">
                <input
                  checked={userType.includes(id)}
                  className='visually-hidden'
                  type='checkbox'
                  id={id}
                  name={id}
                  value={id}
                  onChange={handleTypeChange}
                  data-testid={id}
                />
                <label htmlFor={id}>{title}</label>
              </div>
            );
          })
        }
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        {
          [...StringCount.keys()].map((key) => {
            const { id, stringCount } = StringCount.get(key) as StringType;
            return (
              <div key={id} className="form-checkbox catalog-filter__block-item">
                <input
                  className='visually-hidden'
                  type='checkbox'
                  id={id}
                  name={id}
                  value={stringCount}
                  checked={userString.includes(stringCount)&&!checkIsDisable(stringCount)}
                  disabled={checkIsDisable(stringCount)}
                  onChange={handleStringCountChange}
                  data-testid={id}
                />
                <label htmlFor={id}>{stringCount}</label>
              </div>
            );
          })
        }
      </fieldset>
    </form>
  );
}

export default memo(Filter);
