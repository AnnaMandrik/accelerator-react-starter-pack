import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import FilterPrice from './filter-price';
import {makeFakeGuitars} from '../../mocks';
import {SortKey} from '../../const';

const fakeGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: FilterPrice', () => {
  const minPrice = 5000;
  const maxPrice = 15000;

  const store = mockStore({
    GUITARS: {
      productsList: fakeGuitars,
      pageCount: 3,
      isDataLoaded: true,
    },
    USER: {
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
