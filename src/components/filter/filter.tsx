import {ChangeEvent, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {selectType, selectStrings, selectActualPage, selectFirstPage, selectLastPage} from '../../store/action';
import {getUserType, getUserStrings} from '../../store/user-data/selectors';
import FilterPrice from '../filter-price/filter-price';
import {DEFAULT_PAGE, CountOfPages, AppRoute} from '../../const';
import browserHistory from '../../browser-history';
import {GuitarsType, StringCount} from '../../const';
import useUncheck from '../../hooks/use-uncheck/use-uncheck';
import useDisable from '../../hooks/use-disable/use-disable';
import {GuitarType, StringType} from '../../types/guitar';


// const allTypes = (factTypes: string[], type: string): string[] => {
//   if (factTypes.includes(type)) {
//     return factTypes.filter((factType) => factType !== type);
//   }

//   return [...factTypes, type];
// };


function Filter(): JSX.Element {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const userType = useSelector(getUserType);
  const userStrings = useSelector(getUserStrings);

  // const [types, setTypes] = useState<boolean[]>(new Array(TYPES_QUANTITY).fill(false));
  // const [strings, setStrings] = useState<boolean[]>(new Array(STRINGS_QUANTITY).fill(false));
  // const [availableStrings, setAvailableStrings] = useState<number[]>(STRINGS);
  // const [availableTypes, setAvailableTypes] = useState<string[]>(TYPE_NAMES);

  const dispatch = useDispatch();
  const setUnchecked = useUncheck();
  const checkIsDisable = useDisable();

  // useEffect(() => {
  //   if (!types.some((type) => type)) {
  //     setAvailableStrings(STRINGS);
  //     return;
  //   }

  //   const guitarsHasStrings: number[] = [];

  //   types.forEach((isAvailable, index): void => {
  //     if (isAvailable) {
  //       guitarsHasStrings.push(...FILTER_OF_TYPES_STRINGS[index].stringsCount);
  //     }
  //   });

  //   setAvailableStrings(guitarsHasStrings);
  // }, [types]);

  // useEffect(() => {
  //   if (!strings.some((string) => string)) {
  //     setAvailableTypes(TYPE_NAMES);
  //     return;
  //   }

  //   const stringsHasGuitars: string[] = [];

  //   strings.forEach((isAvailable, index): void => {
  //     if (isAvailable) {
  //       FILTER_OF_TYPES_STRINGS.forEach((guitar, guitarIndex): void => {
  //         if (guitar.stringsCount.includes(STRINGS[index])) {
  //           stringsHasGuitars.push(FILTER_OF_TYPES_STRINGS[guitarIndex].name);
  //         }
  //       });
  //     }
  //   });

  //   setAvailableTypes(stringsHasGuitars);
  // }, [strings]);

  const getQueryTypes = (items: string[]) => {
    searchParams.delete('type');
    items.map((item: string) => searchParams.append('type', item));

    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };

  const getQueryStrings = (items: string[]) => {
    searchParams.delete('stringCount');
    items.map((item: string) => searchParams.append('stringCount', item));

    browserHistory.push(AppRoute.Page.replace(':page', `page_${DEFAULT_PAGE}/?${searchParams.toString()}`));
  };


  // const handlePagesChange = () => {
  //   dispatch(selectFirstPage(CountOfPages.First));
  //   dispatch(selectLastPage(CountOfPages.Last));
  //   dispatch(selectActualPage(DEFAULT_PAGE));
  // };


  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentType = evt.target.value;
    const actualTypes = userType.includes(currentType)
      ? userType.filter((value) => value !== currentType)
      : [...userType, currentType];
    const actualCounts = setUnchecked(actualTypes);
    dispatch(selectType(actualTypes));
    dispatch(selectStrings(actualCounts));
    dispatch(selectFirstPage(CountOfPages.First));
    dispatch(selectLastPage(CountOfPages.Last));
    dispatch(selectActualPage(DEFAULT_PAGE));
    getQueryTypes(actualTypes);
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    const actualCounts = userStrings.includes(stringCount)
      ? userStrings.filter((value) => value !== stringCount)
      : [...userStrings, stringCount];
    const actualTypes = setUnchecked(actualCounts);
    dispatch(selectStrings(actualCounts));
    dispatch(selectType(actualTypes));
    dispatch(selectFirstPage(CountOfPages.First));
    dispatch(selectLastPage(CountOfPages.Last));
    dispatch(selectActualPage(DEFAULT_PAGE));
    getQueryStrings(actualCounts);
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
              <div key={id} className='form-checkbox catalog-filter__block-item'>
                <input
                  checked={userType.includes(id)}
                  className='visually-hidden'
                  type='checkbox'
                  id={id}
                  name={id}
                  value={id}
                  onChange={handleTypeChange}
                  data-testid='id'
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
              <div key={id} className='form-checkbox catalog-filter__block-item'>
                <input
                  className='visually-hidden'
                  type='checkbox'
                  id={id}
                  name={id}
                  value={stringCount}
                  checked={userStrings.includes(stringCount)&&!checkIsDisable(stringCount)}
                  disabled={checkIsDisable(stringCount)}
                  onChange={handleStringCountChange}
                  data-testid = 'id'
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
