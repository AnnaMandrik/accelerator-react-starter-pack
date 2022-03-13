import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../../const';
import { getUserTotalInCart } from '../../../../store/user-data/selectors';


function CartLogo() {
  const totalInCart = useSelector(getUserTotalInCart);
  return (
    <Link
      className='header__cart-link'
      to={`/${AppRoute.Cart}`}
      aria-label='Корзина'
    >
      <svg
        className='header__cart-icon'
        width='14'
        height='14'
        aria-hidden='true'
      >
        <use xlinkHref='#icon-basket'></use>
      </svg>
      <span className='visually-hidden'>Перейти в корзину</span>
      {!!totalInCart && (
        <span className='header__cart-count'>{totalInCart}</span>
      )}
    </Link>
  );
}

export default CartLogo;
