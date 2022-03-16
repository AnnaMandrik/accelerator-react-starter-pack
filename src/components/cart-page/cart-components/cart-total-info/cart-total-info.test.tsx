import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { customRenderWithProvider } from '../../../../render-test';
import { postOrderAction } from '../../../../store/api-actions';
import CartTotalInfo from './cart-total-info';
import { MockUserData, TestReg } from '../../../../mocks';


jest.mock('../../../../store/api-actions');

const fakePostOrder = postOrderAction as jest.MockedFunction<typeof postOrderAction>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FAKE_IDS = [1, 1, 3];
const FAKE_DISCOUNT = 25;
const FAKE_TOTAL_PRICE = 100;
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};
const FakeCoupon = {
  value: 'medium-444',
  discount: 25,
};
const componentState = {
  UserData: { ...MockUserData, inCart: FakeInCart, totalPrice: FakeTotalPrice },
};
const componentStateWithCoupon = {
  UserData: { ...MockUserData, inCart: FakeInCart, totalPrice: FakeTotalPrice, coupon: FakeCoupon },
};

describe('Component: TotalInfo', () => {
  it('should render correctly without discount', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<CartTotalInfo />, store);
    expect(screen.getAllByText(`${FAKE_TOTAL_PRICE} ₽`).length).toEqual(2);
    expect(screen.getByText('0 ₽')).toBeInTheDocument();
    expect(screen.getByText(TestReg.OrderBtn)).toBeInTheDocument();
  });
  it('should render correctly with coupon', () => {
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartTotalInfo />, store);
    expect(screen.getAllByText(`${FAKE_TOTAL_PRICE} ₽`).length).toEqual(1);
    expect(screen.getByText(`- ${FAKE_DISCOUNT} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${FAKE_TOTAL_PRICE-FAKE_DISCOUNT} ₽`)).toBeInTheDocument();
  });
  it('should dispatch correctly if click on OrderBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentStateWithCoupon);
    customRenderWithProvider(<CartTotalInfo />, store);
    userEvent.click(screen.getByText(TestReg.OrderBtn));
    expect(dispatch).toBeCalledTimes(1);
    expect(fakePostOrder).toBeCalledTimes(1);
    expect(fakePostOrder).toHaveBeenCalledWith({
      guitarsIds: FAKE_IDS, coupon: FakeCoupon.value,
    });
  });
});
