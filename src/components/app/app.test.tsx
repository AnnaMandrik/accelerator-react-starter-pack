import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute } from '../../const';
import {makeFakeGuitars} from '../../mocks';

const fakeGuitars = makeFakeGuitars();
const mockStore = configureMockStore([thunk]);

const store = mockStore({
  GUITARS: {
    productsList: fakeGuitars,
    isDataLoaded: false,
    pageCount: 3,
  },
  USER: {
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
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);
    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });
  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/404. Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в каталог/i)).toBeInTheDocument();
  });
});
