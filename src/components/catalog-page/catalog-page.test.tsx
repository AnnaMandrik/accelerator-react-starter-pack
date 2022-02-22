import { render, screen } from '@testing-library/react';
import {HistoryRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {fakeProducts} from '../../mocks';
import CatalogPage from './catalog-page';
import {SortKey} from '../../const';
import thunk from 'redux-thunk';

const fakeGuitars = fakeProducts;
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {
        productsList: fakeGuitars,
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
        searching: fakeGuitars,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
  });
});
