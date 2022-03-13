import { useSelector } from 'react-redux';
import { GuitarsType } from '../../../const';
import { getTemporaryProductsInCart } from '../../../store/main-data/selectors';

function ModalProductInfo() {
  const product = useSelector(getTemporaryProductsInCart);
  const { name, vendorCode, type, previewImg, stringCount, price } = product;
  const productType = GuitarsType.get(type)?.type;

  return (
    <div className='modal__info'>
      <img
        className='modal__img'
        src={previewImg}
        width='67'
        height='137'
        alt={name}
      />
      <div className='modal__info-wrapper'>
        <h3 className='modal__product-name title title--little title--uppercase'>
          Гитара {name}
        </h3>
        <p className='modal__product-params modal__product-params--margin-11'>
          Артикул: {vendorCode}
        </p>
        <p className='modal__product-params'>
          {productType}, {stringCount} струнная
        </p>
        <p className='modal__price-wrapper'>
          <span className='modal__price'>Цена:</span>
          <span className='modal__price'>{price} ₽</span>
        </p>
      </div>
    </div>
  );
}

export default ModalProductInfo;
