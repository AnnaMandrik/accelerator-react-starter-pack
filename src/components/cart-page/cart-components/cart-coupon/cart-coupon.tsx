import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CouponError } from '../../../../const';
import { clearCoupon } from '../../../../store/action';
import { postCouponAction } from '../../../../store/api-actions';
import { getUserCoupon } from '../../../../store/user-data/selectors';


function CartCoupon(): JSX.Element {
  const couponValue = useSelector(getUserCoupon).value;
  const createCoupon =
    couponValue === null || couponValue === CouponError.value
      ? ''
      : couponValue;
  const [coupon, setCoupon] = useState(createCoupon);
  const dispatch = useDispatch();

  useEffect(() => {
    if (coupon === '') {
      dispatch(clearCoupon());
    }
  }, [couponValue, coupon, dispatch]);

  const handleOnSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const currentCoupon = coupon.trim().toLocaleLowerCase();
    dispatch(postCouponAction(currentCoupon));
  };


  return (
    <div className="cart__coupon coupon">
      <h2 className="title title--little coupon__title">Промокод на скидку</h2>
      <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
      <form
        onSubmit={handleOnSubmit}
        className="coupon__form"
        id="coupon-form"
      >
        <div className="form-input coupon__input">
          <label className="visually-hidden">Промокод</label>
          <input
            type="text"
            placeholder="Введите промокод"
            id="coupon"
            name="coupon"
            value={coupon}
            onChange={(evt) => setCoupon(evt.target.value)}
            data-testid = 'coupon'
          />
          {couponValue !== null && couponValue !== CouponError.value && (
            <p className='form-input__message form-input__message--success'>
              Промокод принят
            </p>
          )}
          {couponValue === CouponError.value && (
            <p className='form-input__message form-input__message--error'>
              неверный промокод
            </p>
          )}
        </div>
        <button className="button button--big coupon__button">
          Применить
        </button>
      </form>
    </div>
  );
}

export default CartCoupon;
