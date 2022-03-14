import { render, screen } from '@testing-library/react';
import { AppRoute} from '../../const';
import { customRenderWithProvider } from '../../render-test';
import CartPage from './cart-page';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fetchCartProductsAction } from '../../store/api-actions';
import { fakeProduct, MockMainData, MockUserData, TestReg } from '../../mocks';


HelmetProvider.canUseDOM = false;
const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();
jest.mock('../../store/api-actions');

const fakeFetchCartProducts = fetchCartProductsAction as jest.MockedFunction<
  typeof fetchCartProductsAction
>;

const FIRST_NAME = 'Product1';
const FIRST_ID = 1;
const SECOND_NAME = 'Product2';
const SECOND_ID = 3;
const fakeFirstProduct = {
  ...fakeProduct,
  name: FIRST_NAME,
  id: FIRST_ID,
  price: 25,
};
const fakeSecondProduct = {
  ...fakeProduct,
  name: SECOND_NAME,
  id: SECOND_ID,
  price: 50,
};
const FakeInCart = {
  '1': 2,
  '3': 1,
};
const FAKE_IDS = ['1', '3'];
const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};
const FakeCoupon = {
  value: 'medium-444',
  discount: 25,
};
const componentState = {
  MainData: {
    ...MockMainData,
    productsInCart: [fakeFirstProduct, fakeSecondProduct],
    isDataLoaded: false,
  },
  UserData: {
    ...MockUserData,
    inCart: FakeInCart,
    totalPrice: FakeTotalPrice,
    coupon: FakeCoupon,
  },
};

describe('Component: CartPage', () => {
  it('should dispatch async actions when mount and reset actions when unmount', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartPage />, store);
    expect(fakeFetchCartProducts).toBeCalledTimes(1);
    expect(fakeFetchCartProducts).toHaveBeenCalledWith(FAKE_IDS);
  });
  it('should render EmptyCart', () => {
    history.push(`/${AppRoute.Cart}`);
    useDispatch.mockReturnValue(dispatch);
    const emptyState = {
      MainData: { ...MockMainData, isDataLoaded: false },
      UserData: MockUserData,
    };
    const store = mockStore(emptyState);
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route path={AppRoute.Main} />
              <Route path={`/${AppRoute.Cart}`} element={<CartPage />} />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>);
    expect(screen.queryByText(TestReg.CouponTitle)).not.toBeInTheDocument();
  });
});
