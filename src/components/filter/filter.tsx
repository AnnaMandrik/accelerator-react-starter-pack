import {ChangeEvent, memo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FilterPrice from '../filter-price/filter-price';
import {GuitarsType, StringCount} from '../../const';
import useUncheck from '../../hooks/use-uncheck/use-uncheck';
import useDisable from '../../hooks/use-disable/use-disable';
import {GuitarType, StringType} from '../../types/guitar';
import { getUserFilter } from '../../store/user-data/selectors';
import { FilterState } from '../../types/state';
import { fetchFilterUserAction } from '../../store/api-actions';
import { allItems } from '../../utils';


type FilterProps = {
  page: number
}

function Filter({page}: FilterProps): JSX.Element {
  const filter = useSelector(getUserFilter);
  const {types, strings} = filter;
  const dispatch = useDispatch();
  const setUnchecked = useUncheck(filter);
  const checkIsDisable = useDisable(filter);


  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentType = evt.target.value;
    const actualTypes = allItems(types, currentType);
    const actualCounts = setUnchecked(actualTypes);
    const actualFilter = { ...filter, types: actualTypes, strings: actualCounts} as FilterState;
    dispatch(fetchFilterUserAction(actualFilter, page));
  };

  const handleStringCountChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const stringCount = evt.target.value;
    const actualCounts = allItems(strings, stringCount);
    const actualFilter = { ...filter, strings: actualCounts};
    dispatch(fetchFilterUserAction(actualFilter, page));
  };


  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <FilterPrice page={page} />
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        {
          [...GuitarsType.keys()].map((key) => {
            const { id, title } = GuitarsType.get(key) as GuitarType;

            return (
              <div key={id} className="form-checkbox catalog-filter__block-item">
                <input
                  checked={types.includes(id)}
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
                  checked={strings.includes(stringCount)&&!checkIsDisable(stringCount)}
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
