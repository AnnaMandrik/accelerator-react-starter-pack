import {useSelector, useDispatch} from 'react-redux';
import {FormEvent, useState, useRef} from 'react';
import {getUserSearching} from '../../store/user-data/selectors';
import {fetchSearchingProductsUserAction} from '../../store/api-actions';

function HeaderSearch(): JSX.Element {
  const [searchString, setSearchString] = useState<string>('');

  const searchRef = useRef<HTMLInputElement | null>(null);
  const guitarsList = useSelector(getUserSearching);
  const dispatch = useDispatch();

  const handleSearchChange = (evt: FormEvent<HTMLInputElement>) => {
    setSearchString(evt.currentTarget.value);
    dispatch(fetchSearchingProductsUserAction(evt.currentTarget.value));
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          value={searchString}
          onChange={handleSearchChange}
          ref={searchRef}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul style={{zIndex: 1}} className={`form-search__select-list ${!searchString ? 'hidden' : ''}`}>
        {
          (!searchString && guitarsList.length !== 0)
            ? ''
            : guitarsList.map((guitar) => {
              const key = `${guitar.id}-${guitar.name}`;
              return (
                <li className="form-search__select-item" tabIndex={0} key={key}>{guitar.name}</li>
              );})
        }
      </ul>
    </div>
  );
}

export default HeaderSearch;
