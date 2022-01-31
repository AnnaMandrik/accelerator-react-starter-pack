// import {Link} from 'react-router-dom';
import {RATING_NUMBERS} from '../../const';
import {Guitar} from '../../types/guitar';

type ProductCardProps = {
  guitar: Guitar;
}

function ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {previewImg, rating, name, price} = guitar;
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
          <span className="rate__count">{rating}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#" data-testid="more">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
