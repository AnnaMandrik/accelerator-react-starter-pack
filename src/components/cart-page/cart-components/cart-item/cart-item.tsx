import { useDispatch } from 'react-redux';
import { GuitarsType } from '../../../../const';
import { addTemporaryProductsInCart, toggleIsDeleteOpened } from '../../../../store/action';
import { Guitar } from '../../../../types/guitar';
import CartCount from '../cart-count/cart-count';


type CartItemProps = {
  product: Guitar;
};

function CartItem({product}: CartItemProps): JSX.Element {
  const { name, vendorCode, type, previewImg, stringCount, price } = product;
  const productType = GuitarsType.get(type)?.type;
  const dispatch = useDispatch();

  const handleCloseButtonClick = () => {
    dispatch(addTemporaryProductsInCart(product));
    dispatch(toggleIsDeleteOpened(true));
  };

  return (
    <div className="cart-item">
      <button
        onClick={handleCloseButtonClick}
        className="cart-item__close-button button-cross"
        type="button"
        aria-label="Удалить"
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img src={previewImg} width="55" height="130" alt={name}/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{productType} {name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{productType}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <CartCount product={product}/>
      <div className="cart-item__price-total">17 500 ₽</div>
    </div>
  );
}

export default CartItem;
