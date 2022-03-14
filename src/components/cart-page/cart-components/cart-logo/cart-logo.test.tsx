import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { MockMainData, MockUserData, TestReg } from '../../../../mocks';
import { customRenderWithProvider } from '../../../../render-test';
import CartLogo from './cart-logo';


const mockStore = configureMockStore();
const componentState = {
  MainData: MockMainData,
  UserData: MockUserData,
};

const IN_CART = {
  '1': 1,
  '2': 5,
};
const TOTAL = 6;

describe('Component: CartLogo', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<CartLogo/>, store);
    expect(screen.getByText(TestReg.ToCart)).toBeInTheDocument();
    expect(screen.queryByText(TOTAL)).not.toBeInTheDocument();
  });
  it('should render total in cart', () => {
    const store = mockStore({ ...componentState, UserData: {...MockUserData, inCart: IN_CART } });
    customRenderWithProvider(<CartLogo/>, store);
    expect(screen.getByText(TOTAL)).toBeInTheDocument();
  });
});
