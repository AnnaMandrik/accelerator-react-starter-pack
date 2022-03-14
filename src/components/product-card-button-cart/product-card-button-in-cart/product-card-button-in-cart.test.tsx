import React from 'react';
import { render, screen } from '@testing-library/react';
import {HistoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ProductCardButtonInCart from './product-card-button-in-cart';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ProductCardButtonInCart', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {},
      UserData: {},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardButtonInCart />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/В Корзине/)).toBeInTheDocument();
  });

});
