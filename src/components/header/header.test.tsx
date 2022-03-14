import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { MockMainData, MockUserData, TestReg } from '../../mocks';
import { customRenderWithProvider } from '../../render-test';
import Header from './header';

const mockStore = configureMockStore();
const componentState = {
  MainData: MockMainData,
  UserData: MockUserData,
};

const IN_CART = {
  '1': 5,
  '2': 5,
};
const TOTAL = 10;

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<Header/>, store);
    expect(screen.getByPlaceholderText(TestReg.SearchPlaceholder)).toBeInTheDocument();
    expect(screen.getByAltText(TestReg.Logo)).toBeInTheDocument();
    expect(screen.getByText(TestReg.About)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Where)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Catalog)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.CartLabel)).toBeInTheDocument();
    expect(screen.queryByText(TOTAL)).not.toBeInTheDocument();
  });
  it('should render total in cart', () => {
    const store = mockStore({ ...componentState, UserData: {...MockUserData, inCart: IN_CART } });
    customRenderWithProvider(<Header/>, store);
    expect(screen.getByText(TOTAL)).toBeInTheDocument();
  });
});
