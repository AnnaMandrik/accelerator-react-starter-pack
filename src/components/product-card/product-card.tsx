import { useSelector } from 'react-redux';
import {generatePath, Link} from 'react-router-dom';
import {AppRoute, RATING_NUMBERS} from '../../const';
import { getUserInCart } from '../../store/user-data/selectors';
import {Product} from '../../types/guitar';
import ProductCardButtonInCart from '../product-card-button-cart/product-card-button-in-cart/product-card-button-in-cart';
import ProductCardButtonToCart from '../product-card-button-cart/product-card-button-to-cart/product-card-button-to-cart';

type ProductCardProps = {
  guitar: Product;
}

function ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {previewImg, rating, name, price, comments, id} = guitar;
  const productInfoPath = generatePath(AppRoute.Product, { id: id.toString() });
  const inCart = useSelector(getUserInCart);


  return (
    <div className="product-card">
      <img src={previewImg.replace('img', 'img/content')} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {
            RATING_NUMBERS.map((item, index) => {
              const key = `${index}-${item}`;
              return (
                <svg key={key} width="12" height="11" aria-hidden="true">
                  <use xlinkHref={item <= rating ? '#icon-full-star' : '#icon-star'}>
                  </use>
                </svg>
              );
            })
          }
          <span className="rate__count">{comments.length}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`/${productInfoPath}`} data-testid="more">Подробнее</Link>
        {id in inCart ? <ProductCardButtonInCart /> : <ProductCardButtonToCart product={guitar} />}
      </div>
    </div>
  );
}

export default ProductCard;
