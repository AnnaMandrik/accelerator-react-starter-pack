import { useSelector } from 'react-redux';
import { generatePath, Link, useMatch } from 'react-router-dom';
import { AppRoute} from '../../const';
import { getCurrentProduct } from '../../store/main-data/selectors';

function Breadcrumbs(): JSX.Element {
  const { name, id } = useSelector(getCurrentProduct);
  const productID = id ?? '';
  const productPath = generatePath(AppRoute.Product, { id: productID.toString() });
  const isCartPage = useMatch(AppRoute.Cart);
  const isProductPage = useMatch(AppRoute.Product);
  return (
    <ul className='breadcrumbs page-content__breadcrumbs'>
      <li className='breadcrumbs__item'>
        <Link className='link' to={AppRoute.Main}>
          Главная
        </Link>
      </li>
      <li className='breadcrumbs__item'>
        <Link className='link' to={AppRoute.Main}>
          Каталог
        </Link>
      </li>
      {isProductPage && (
        <li className='breadcrumbs__item'>
          <Link className='link' to={`/${productPath}`}>
            {name}
          </Link>
        </li>
      )}
      {isCartPage && (
        <li className='breadcrumbs__item'>
          <Link className='link' to={`/${AppRoute.Cart}`}>
          Корзина
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Breadcrumbs;
