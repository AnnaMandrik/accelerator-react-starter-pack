import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { customRenderWithProvider } from '../../../../render-test';
import CartItem from './cart-item';
import { GuitarsType } from '../../../../const';
import { MakeFakeGuitar, MockUserData, TestReg } from '../../../../mocks';
import { Guitar } from '../../../../types/guitar';
import { addTemporaryProductsInCart, toggleIsDeleteOpened } from '../../../../store/action';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const mockStore = configureMockStore();

const FAKE_ID = 1;
const PRICE = 25;
const FAKE_COUNT = 2;
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
const fakeProductType = GuitarsType.get(fakeProduct.type)?.type;


describe('Component: CartItem', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartItem product = {fakeProduct}/>, store);
    expect(screen.getByText(`${fakeProductType} ${fakeProduct.name}`)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProductType}, ${fakeProduct.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProduct.price} ₽`)).toBeInTheDocument();
    expect(screen.getByText(`${FAKE_TOTAL_PRICE} ₽`)).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toBeInTheDocument();
    expect(screen.getByTestId('quantity')).toHaveValue(FAKE_COUNT.toString());
    expect(screen.getByLabelText(TestReg.QuantAdd)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.QuantRemove)).toBeInTheDocument();
  });
  it('should dispatch correctly if click CartDeleteBtn', async () => {
    useDispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<CartItem product = {fakeProduct}/>, store);
    userEvent.click(screen.getByLabelText(TestReg.CartDeleteBtn));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toBeCalledWith(addTemporaryProductsInCart(fakeProduct));
    expect(dispatch).toBeCalledWith(toggleIsDeleteOpened(true));
  });
});
