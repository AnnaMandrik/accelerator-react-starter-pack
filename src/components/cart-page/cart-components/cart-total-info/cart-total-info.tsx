import { useDispatch, useSelector } from 'react-redux';
import { postOrderAction } from '../../../../store/api-actions';
import { getUserCoupon, getUserOrderQuantity, getUserSumOfTotal, getUserTotalDiscount } from '../../../../store/user-data/selectors';

function CartTotalInfo(): JSX.Element {
  const sumTotalPrices = useSelector(getUserSumOfTotal);
  const totalDiscount = useSelector(getUserTotalDiscount);
  const coupon = useSelector(getUserCoupon).value;
  const guitarsQuantity = useSelector(getUserOrderQuantity);

  const dispatch = useDispatch();

  return (
    <div className="cart__total-info">
      <p className="cart__total-item">
        <span className="cart__total-value-name">Всего:</span>
        <span className="cart__total-value">{sumTotalPrices} ₽</span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">Скидка:</span>
        <span
          className={`cart__total-value ${
            !!totalDiscount && 'cart__total-value--bonus'
          }`}
        >
          {totalDiscount} ₽
        </span>
      </p>
      <p className="cart__total-item">
        <span className="cart__total-value-name">К оплате:</span>
        <span className="cart__total-value cart__total-value--payment">
          {sumTotalPrices - totalDiscount} ₽
        </span>
      </p>
      <button
        className="button button--red button--big cart__order-button"
        onClick={()=>dispatch(postOrderAction({ guitarsQuantity, coupon }))}
      >Оформить заказ
      </button>
    </div>
  );
}

export default CartTotalInfo;
