import {useSelector, useDispatch} from 'react-redux';
import {FormEvent, useState, useRef, ChangeEvent} from 'react';
import {useHistory} from 'react-router-dom';
import {getUserSearching} from '../../store/user-data/selectors';
import {fetchSearchingProductsUserAction} from '../../store/api-actions';
import {AppRoute} from '../../const';
import {getSortedResult} from '../../utils';


function HeaderSearch(): JSX.Element {
  const [searchString, setSearchString] = useState<string>('');
  const searchRef = useRef<HTMLInputElement | null>(null);
  const guitarsList = useSelector(getUserSearching);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchString(evt.target.value);
    dispatch(fetchSearchingProductsUserAction(evt.target.value));
  };

  const sortedResult = guitarsList && getSortedResult(guitarsList, searchString);

  return (
    <div className="form-search">
      <form className="form-search__form"
        onSubmit={(evt: FormEvent<HTMLFormElement>) => {
          evt.preventDefault();
        }}
      >
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg>
          <span className="visually-hidden">Начать поиск</span>
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
      <ul style={{zIndex: 1}} data-testid="search-suggestion-list"
        className={`form-search__select-list ${!searchString ? 'hidden' : ''}`}
      >
        {
          (!searchString && sortedResult.length)
            ? ''
            : sortedResult.map((guitar) => {
              const key = `${guitar.id}-${guitar.name}`;
              return (
                <li className="form-search__select-item"
                  tabIndex={0}
                  key={key}
                  onClick={() => {
                    history.push(`${AppRoute.Product}${guitar.id}`);
                    setSearchString('');
                  }}
                  onKeyPress={(evt) => {
                    evt.preventDefault();
                    if (evt.key === 'Enter') {
                      history.push(`${AppRoute.Product}${guitar.id}`);
                      setSearchString('');
                    }
                  }}

                >
                  {guitar.name}
                </li>
              );
            })
        }
      </ul>
    </div>
  );
}

export default HeaderSearch;
