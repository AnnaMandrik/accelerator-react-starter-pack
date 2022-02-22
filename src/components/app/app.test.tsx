import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute } from '../../const';
import {fakeProducts} from '../../mocks';

const fakeGuitars = fakeProducts;
const mockStore = configureMockStore([thunk]);

const store = mockStore({
  MainData: {
    productsList: fakeGuitars,
    minDefaultPrice: 1500,
    maxDefaultPrice: 55000,
    isDataLoaded: true,
    pageCount: 3,
  },
  UserData: {
    minPrice: '2000',
    maxPrice: '15000',
    types: [],
    strings: [],
    sorting: '',
    order: '',
    actualPage: 1,
    actualPageCount: 3,
    firstPage: 1,
    lastPage: 3,
    searching: fakeGuitars,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
  });
  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/404 страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в каталог/)).toBeInTheDocument();
  });
  it('should render "StubPage" when user navigate to "/stub"', () => {
    history.push(AppRoute.Stub);
    render(fakeApp);

    expect(screen.getByText(/Страница находится в разработке!/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в каталог/)).toBeInTheDocument();
  });
});
