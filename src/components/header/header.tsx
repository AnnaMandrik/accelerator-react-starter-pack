import {Link, useLocation} from 'react-router-dom';
import HeaderSearch from '../header-search/header-search';
import {AppRoute, HeaderLinks} from '../../const';
import CartLogo from '../cart-page/cart-components/cart-logo/cart-logo';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  return (
    <header className="header" id="header">
      <div className="container header__wrapper">
        <Link className="header__logo logo" to={AppRoute.Main}>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
        </Link>
        <nav className="main-nav">
          <ul className="main-nav__list">
            {[...HeaderLinks.keys()].map((headerLink) => {
              const link = HeaderLinks.get(headerLink)?.link || AppRoute.Main;
              const title = HeaderLinks.get(headerLink)?.title;
              const isActiveLink = pathname.includes(headerLink);
              return (
                <li key={headerLink}>
                  <Link
                    className={`link main-nav__link ${
                      isActiveLink ? 'link--current' : ''
                    }`}
                    to={link}
                  >
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <HeaderSearch />
        <CartLogo />
      </div>
    </header>
  );
}

export default Header;
