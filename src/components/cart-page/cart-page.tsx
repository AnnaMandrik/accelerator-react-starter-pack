import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { HEAD_TITLE } from '../../const';
import { fetchCartProductsAction } from '../../store/api-actions';
import { getIsLoaded, getProductsInCart } from '../../store/main-data/selectors';
import { getUserQuantity } from '../../store/user-data/selectors';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Spinner from '../spinner/spinner';
import CartFooter from './cart-components/cart-footer/cart-footer';
import CartItem from './cart-components/cart-item/cart-item';
import EmptyCart from './cart-components/empty-cart/empty-cart';

function CartPage(): JSX.Element {
  const isLoading = useSelector(getIsLoaded);
  const productsInCart = useSelector(getProductsInCart);
  const dispatch = useDispatch();
  const productsCount = useSelector(getUserQuantity);
  const headTitle = `'Корзина' - ${HEAD_TITLE}`;

  useEffect(() => {
    dispatch(fetchCartProductsAction(productsCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <>
      <Helmet title={headTitle} />
      <div className="container">
        <h1 className="title title--bigger page-content__title">Корзина</h1>
        <Breadcrumbs />
        <div className="cart">
          {productsInCart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
          {productsInCart.length === 0 ? <EmptyCart /> : <CartFooter />}
        </div>
      </div>
    </>
  );
}

export default CartPage;
