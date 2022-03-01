import {generatePath, Link} from 'react-router-dom';
import {AppRoute, RATING_NUMBERS} from '../../const';
import {Product} from '../../types/guitar';

type ProductCardProps = {
  guitar: Product;
}

function ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {previewImg, rating, name, price, comments, id} = guitar;
  const productInfoPath = generatePath(AppRoute.Product, { id: id.toString() });
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
        <Link className="button button--red button--mini button--add-to-cart" to={AppRoute.Stub}>Купить</Link>
      </div>
    </div>
  );
}

export default ProductCard;
