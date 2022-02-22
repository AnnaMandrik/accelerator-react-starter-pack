import { render, screen  } from '@testing-library/react';
import { HistoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductCardsList from './product-cards-list';
import {fakeProducts} from '../../mocks';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const fakeGuitars = fakeProducts;
const mockStore = configureMockStore([thunk]);


describe('Component: ProductCardsList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {
        productsList: fakeGuitars,
        minDefaultPrice: 1500,
        maxDefaultPrice: 15000,
        pageCount: 3,
        isDataLoaded: true,
      },
      UserData: {},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProductCardsList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('load-ok')).toBeInTheDocument();
  });
});
