import { useDispatch, useSelector } from 'react-redux';
import { GuitarsType, RATING_NUMBERS } from '../../../../const';
import { useToggle } from '../../../../hooks/use-toggle/use-toggle';
import { addTemporaryProductsInCart, toggleIsAddOpened } from '../../../../store/action';
import { getCurrentComments } from '../../../../store/main-data/selectors';
import { Guitar } from '../../../../types/guitar';
import { numberWithSpaces } from '../../../../utils';

type ProductInfoProps = {
  currentProduct: Guitar;
}

function ProductInfo({currentProduct}: ProductInfoProps): JSX.Element {
  const {name, vendorCode, type, description, stringCount, rating, price, previewImg} = currentProduct;
  const commentsCount = useSelector(getCurrentComments).length;
  const productType = GuitarsType.get(type)?.type;
  const dispatch = useDispatch();

  const [isCharTab, toggleIsCharTab] = useToggle(true);
  const [isDescTab, toggleIsDescTab] = useToggle(false);

  const handleCharButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (isCharTab) {
      return;
    }
    toggleIsCharTab();
    toggleIsDescTab();
  };

  const handleDescButtonClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    if (isDescTab) {
      return;
    }
    toggleIsDescTab();
    toggleIsCharTab();
  };

  const handleAddToCartClick = () => {
    dispatch(addTemporaryProductsInCart(currentProduct));
    dispatch(toggleIsAddOpened(true));
  };

  return (
    <div className="product-container">
      <img className="product-container__img"
        src={previewImg.replace('img', 'img/content')}
        width="90" height="235" alt={name}
      />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
        <div className="rate product-container__rating" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>

          {
            RATING_NUMBERS.map((item, index) => {
              const key = `${index}-${item}`;
              return (
                <svg key={key} width="14" height="14" aria-hidden="true">
                  <use xlinkHref={item <= rating ? '#icon-full-star' : '#icon-star'}>
                  </use>
                </svg>
              );
            })
          }

          <span className="rate__count">{commentsCount}</span>
          <span className="rate__message"></span>
        </div>
        <div className='tabs'>
          <a
            onClick={handleCharButtonClick}
            className={`button
              ${!isCharTab && 'button--black-border'}
              button--medium tabs__button`}
            href='#characteristics'
          >
            Характеристики
          </a>
          <a
            onClick={handleDescButtonClick}
            className={`button
              ${!isDescTab && 'button--black-border'}
              button--medium tabs__button`}
            href='#description'
          >
            Описание
          </a>
          <div className='tabs__content' id='characteristics'>
            {isCharTab && (
              <table className='tabs__table'>
                <tbody>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Артикул:</td>
                    <td className='tabs__value'>{vendorCode}</td>
                  </tr>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Тип:</td>
                    <td className='tabs__value'>{productType}</td>
                  </tr>
                  <tr className='tabs__table-row'>
                    <td className='tabs__title'>Количество струн:</td>
                    <td className='tabs__value'>{stringCount} струнная</td>
                  </tr>
                </tbody>
              </table>
            )}
            {isDescTab && (
              <p className='tabs__product-description'>{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">Цена:</p>
        <p className="product-container__price-info product-container__price-info--value">{numberWithSpaces(price)} ₽</p>
        <button className="button button--red button--big product-container__button"
          onClick = {handleAddToCartClick}
        >
            Добавить в корзину
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;


