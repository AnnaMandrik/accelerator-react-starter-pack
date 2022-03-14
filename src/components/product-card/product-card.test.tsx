import ProductCard from './product-card';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { fakeComments, fakeProduct, MockUserData, Stub, TestReg } from '../../mocks';
import { Product } from '../../types/guitar';
import { AppRoute } from '../../const';

const mockStore = configureMockStore();

const componentState = {
  UserData: MockUserData,
};
const store = mockStore(componentState);
const RATING = 3;
const NAME = 'name';
const ID = 5;
const PRICE = 100;
const COUNT = fakeComments.length.toString();

const product: Product = {
  ...fakeProduct,
  rating: RATING,
  name: NAME,
  price: PRICE,
  id: ID,
};

describe('Component: ProductCard', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<ProductCard guitar={product} />}
            />
            <Route path={`/product/${ID}`} element={<h1>{Stub}</h1>} />
          </Routes>
        </BrowserRouter>
      </Provider>);
    expect(screen.getByText(NAME)).toBeInTheDocument();
    expect(screen.getByText(COUNT)).toBeInTheDocument();
    expect(screen.getByText(TestReg.AboutProduct)).toBeInTheDocument();
    userEvent.click(screen.getByText(TestReg.AboutProduct));
    expect(screen.getByText(TestReg.StubPage)).toBeInTheDocument();
  });
});
