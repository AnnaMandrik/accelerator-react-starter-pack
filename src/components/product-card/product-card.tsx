import {Guitar} from '../../types/guitar';

type ProductCardProps = {
  guitar: Guitar;
}

function ProductCard({guitar}: ProductCardProps): JSX.Element {
  const {previewImg, rating, name, price} = guitar;
  return (
    <div className="product-card">
      <img src={`./${previewImg}`} width="75" height="190" alt={name} />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg><span className="rate__count">{rating}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${price}`} ₽</p>
      </div>
      <div className="product-card__buttons">
        <a className="button button--mini" href="#">Подробнее</a>
        <a className="button button--red button--mini button--add-to-cart" href="#">Купить</a>
      </div>
    </div>
  );
}

export default ProductCard;
