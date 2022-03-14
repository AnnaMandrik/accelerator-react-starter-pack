import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { customRenderWithProvider } from '../../../../render-test';
import CartCoupon from './cart-coupon';
import { CouponError } from '../../../../const';
import { postCouponAction } from '../../../../store/api-actions';
import { MockUserData, TestReg } from '../../../../mocks';
import { clearCoupon } from '../../../../store/action';


jest.mock('../../../../store/api-actions');

const fakePostCoupon = postCouponAction as jest.MockedFunction<typeof postCouponAction>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const FakeCoupon = {
  value: 'medium-444',
  discount: 25,
};

const componentState = {
  UserData: MockUserData,
};
const componentStateWithCoupon = {
  UserData: { ...MockUserData, coupon: FakeCoupon },
};
const componentStateWithError = {
  UserData: { ...MockUserData, coupon: CouponError },
};

const COUPON_WTH_SPACE ='   MedIum-444 ';
const COUPON_WTHOUT_SPACE ='medium-444';

describe('Component: CartCoupon', () => {
  it('should render correctly without validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByTestId('coupon')).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponRight)).not.toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponWrong)).not.toBeInTheDocument();
  });
  it('should render correctly with CouponRight validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponRight)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponWrong)).not.toBeInTheDocument();
  });
  it('should render correctly with CouponWrong validation message', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithError);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByText(TestReg.CouponTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CouponWrong)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.CouponRight)).not.toBeInTheDocument();
  });
  it('should dispatch correctly if click CouponBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartCoupon />, store);
    userEvent.type(screen.getByTestId('coupon'), COUPON_WTH_SPACE);
    userEvent.click(screen.getByText(TestReg.CouponBtn));
    expect(fakePostCoupon).toBeCalledTimes(1);
    expect(fakePostCoupon).toBeCalledWith(COUPON_WTHOUT_SPACE);
  });
  it('should render with coupon and clear dispatch correctly if clear input', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartCoupon />, store);
    expect(screen.getByTestId('coupon')).toHaveValue(FakeCoupon.value);
    expect(screen.getByText(TestReg.CouponRight)).toBeInTheDocument();
    userEvent.clear(screen.getByTestId('coupon'));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toBeCalledWith(clearCoupon());
  });
});
