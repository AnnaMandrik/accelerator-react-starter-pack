import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {makeFakeGuitars} from '../../mocks';
import {SortKey, STRINGS, FILTER_OF_TYPES_STRINGS} from '../../const';
import Filter from './filter';
import thunk from 'redux-thunk';

const mockGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: Filter', () => {
  const store = mockStore({
    MainData: {
      productsList: mockGuitars,
      minDefaultPrice: 1500,
      maxDefaultPrice: 45000,
      pageCount: 3,
      isDataLoaded: true,
    },
    UserData: {
      minPrice: '5000',
      maxPrice: '15000',
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
        <Filter />
      </Router>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);
    FILTER_OF_TYPES_STRINGS.map((guitar) => expect(screen.getByTestId(guitar.name)).toBeInTheDocument());
    STRINGS.map((string) => expect(screen.getByTestId(string)).toBeInTheDocument());
  });
});
