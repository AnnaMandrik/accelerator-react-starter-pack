import React from 'react';
import { render, screen } from '@testing-library/react';
import {HistoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ProductCardButtonToCart from './product-card-button-to-cart';
import { fakeProduct, MockUserData } from '../../../mocks';
import { Product } from '../../../types/guitar';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const RATING = 3;
const NAME = 'name';
const ID = 5;
const PRICE = 100;

const componentState = {
  UserData: MockUserData,
};
const store = mockStore(componentState);
const product: Product = {
  ...fakeProduct,
  rating: RATING,
  name: NAME,
  price: PRICE,
  id: ID,
};
describe('Component: ProductCardButtonToCart', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardButtonToCart product={product} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Купить/)).toBeInTheDocument();
  });

});
