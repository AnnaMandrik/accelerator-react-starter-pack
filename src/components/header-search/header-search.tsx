import {useSelector} from 'react-redux';
import {ChangeEvent, useEffect, useState} from 'react';
import {getGuitars} from '../../store/main-data/selectors';

function HeaderSearch(): JSX.Element {
  const guitarsList = useSelector(getGuitars);
  const guitarsNamesList = guitarsList.map((guitar) => guitar.name);

  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState(['']);

  const handleSearchChange = ({target}: ChangeEvent<HTMLInputElement>) => setSearchString(target.value);
  useEffect(() => {
    const results = guitarsNamesList.filter((guitarName) =>
      guitarName.toLowerCase().includes(searchString.toLowerCase()));
    setSearchResult(results);
  }, [searchString]);

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
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul style={{zIndex: 1}} className={`form-search__select-list ${!searchString ? 'hidden' : ''}`}>
        {searchResult.map((resultItem) => (
          <li className="form-search__select-item" tabIndex={0} key={resultItem}>{resultItem}</li>
        ))}
      </ul>
    </div>
  );
}

export default HeaderSearch;
