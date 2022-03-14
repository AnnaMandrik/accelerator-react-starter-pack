import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen, waitFor } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { customRenderWithProvider } from '../../../../render-test';
import { MakeFakeGuitar, MockUserData, TestReg } from '../../../../mocks';
import { Guitar } from '../../../../types/guitar';
import CartCount from './cart-count';
import { selectQuantityInCart, selectTotalPrice } from '../../../../store/action';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();

const FAKE_ID = 1;
const PRICE = 25;
const FAKE_COUNT = 2;
const FAKE_NEW_COUNT = 25;
const FAKE_TOTAL_PRICE = 50;
const fakeProduct = { ...MakeFakeGuitar(), id: FAKE_ID, price: PRICE } as Guitar;
const FakeInCart = {
  '1': 2,
  '3': 1,
};

const FakeTotalPrice = {
  '1': 50,
  '3': 50,
};

const componentState = {
  UserData: { ...MockUserData, inCart: FakeInCart, totalPrice: FakeTotalPrice },
};


describe('Component: CartCount', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartCount product = {fakeProduct}/>, store);
    expect(screen.getByText(`${FAKE_TOTAL_PRICE} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toHaveValue(FAKE_COUNT.toString());
    expect(screen.getByLabelText(TestReg.QuantAdd)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.QuantRemove)).toBeInTheDocument();
  });
  it('should dispatch correctly if input changed', async () => {
    useDispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartCount product = {fakeProduct}/>, store);
    userEvent.type(screen.getByTestId('quantity'), '5');
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(selectQuantityInCart(FAKE_ID, FAKE_NEW_COUNT)));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(selectTotalPrice(FAKE_ID, FAKE_NEW_COUNT*PRICE)));
    userEvent.click(screen.getByLabelText(TestReg.QuantAdd));
    expect(screen.getByTestId('quantity')).toHaveValue('26');
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(selectQuantityInCart(FAKE_ID, 26)));
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith(selectTotalPrice(FAKE_ID, 26*PRICE)));
  });
});
