import { render, screen  } from '@testing-library/react';
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import ProductCardsList from './product-cards-list';
import {makeFakeGuitars} from '../../mocks';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitars();
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
        <Router history={history}>
          <ProductCardsList productsList={fakeGuitars}  />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('load-ok')).toBeInTheDocument();
  });
});
