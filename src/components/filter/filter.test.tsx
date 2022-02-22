import { render, screen } from '@testing-library/react';
import {HistoryRouter, useParams} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {fakeProducts} from '../../mocks';
import {SortKey, StringCount, GuitarsType} from '../../const';
import Filter from './filter';
import thunk from 'redux-thunk';

const mockGuitars = fakeProducts;
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
// eslint-disable-next-line react-hooks/rules-of-hooks
const {number} = useParams();
const page = Number(number);

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
      <HistoryRouter history={history}>
        <Filter page={page} />
      </HistoryRouter>
    </Provider>
  );

  it('should render correctly', () => {
    render(fakeApp);
    [...GuitarsType.keys()].map((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
    [...StringCount.keys()].map((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
  });
});
