import { useMatch } from 'react-router-dom';
import { AppRoute } from '../../../../const';


function EmptyCart(): JSX.Element {
  const isCartPage = useMatch(AppRoute.Cart);
  return (
    <div className="container">
      {isCartPage ? (
        <h2>Корзина пустая</h2>
      ) : (
        <h2>Нет товара с такими параметрами</h2>
      )}
    </div>
  );
}

export default EmptyCart;
