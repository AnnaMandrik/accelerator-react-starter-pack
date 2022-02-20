import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import FilterPrice from './filter-price';
import {fakeProducts} from '../../mocks';
import {SortKey} from '../../const';

const fakeGuitars = fakeProducts;
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: FilterPrice', () => {
  const minPrice = 5000;
  const maxPrice = 15000;

  const store = mockStore({
    MainData: {
      productsList: fakeGuitars,
      minDefaultPrice: 1500,
      maxDefaultPrice: 45000,
      pageCount: 3,
      isDataLoaded: true,
    },
    UserData: {
      minPrice: String(minPrice),
      maxPrice: String(maxPrice),
      types: [],
      strings: [],
      sorting: SortKey.Price,
      order: '',
      actualPage: 1,
      actualPageCount: 0,
      firstPage: 1,
      lastPage: 3,
    },
  });

  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <FilterPrice />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('min-price')).toBeInTheDocument();
    expect(screen.getByTestId('max-price')).toBeInTheDocument();
  });
});
