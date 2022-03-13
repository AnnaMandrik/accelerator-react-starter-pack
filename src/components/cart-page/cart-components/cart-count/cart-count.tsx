import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELAY_COUNT, MAX_IN_CART } from '../../../../const';
import { addTemporaryProductsInCart, selectQuantityInCart, selectTotalPrice, toggleIsDeleteOpened } from '../../../../store/action';
import { getUserInCart, getUserTotalPrice } from '../../../../store/user-data/selectors';
import { Guitar } from '../../../../types/guitar';


type CartCountProps = {
  product: Guitar;
};

function CartCount({ product }: CartCountProps) {
  const { id, price } = product;
  const productCount = useSelector(getUserInCart)[id];
  const totalPrice = useSelector(getUserTotalPrice)[id];
  const dispatch = useDispatch();
  const [count, setCount] = useState(productCount.toString());
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (count === '') {
      return;
    }
    timeout.current = setTimeout(() => {
      dispatch(selectQuantityInCart(id, +count));
      dispatch(selectTotalPrice(id, +count*price));
    }, DELAY_COUNT);
  }, [dispatch, id, price, count]);

  const handleInputOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const quant = evt.target.validity.valid ? evt.target.value : count;
    setCount(quant);
  };

  const handleInputOnBlur = () => {
    if (count === '') {
      setCount(productCount.toString());
    }
  };

  return (
    <>
      <div className='quantity cart-item__quantity'>
        <button
          onClick={() => {
            if (+count === 1) {
              dispatch(addTemporaryProductsInCart(product));
              dispatch(toggleIsDeleteOpened(true));
              return;
            }
            setCount((prevCount) => (+prevCount-1).toString());
          }}
          className='quantity__button'
          aria-label='Уменьшить количество'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-minus'></use>
          </svg>
        </button>
        <input
          onChange={handleInputOnChange}
          onBlur={handleInputOnBlur}
          className='quantity__input'
          type='text'
          id='2-count'
          name='2-count'
          pattern='[1-9]|[1-9][0-9]'
          value={count}
        />
        <button
          onClick={() => {
            if (+productCount >= MAX_IN_CART) {
              return;
            }
            setCount((prevCount) => (+prevCount+1).toString());
          }}
          className='quantity__button'
          aria-label='Увеличить количество'
        >
          <svg width='8' height='8' aria-hidden='true'>
            <use xlinkHref='#icon-plus'></use>
          </svg>
        </button>
      </div>

      <div className='cart-item__price-total'>{totalPrice} ₽</div>
    </>
  );
}

export default CartCount;
