import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeGuitars } from '../../mocks';
import CatalogPage from './catalog-page';
import {DEFAULT_PAGE, SortKey} from '../../const';
import thunk from 'redux-thunk';

const fakeGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {
        productsList: fakeGuitars,
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
        <Router history={history}>
          <CatalogPage actualPage={DEFAULT_PAGE} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
  });
});
