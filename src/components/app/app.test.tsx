import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HistoryRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute } from '../../const';
import { MockMainData, MockUserData, fakeProduct, MockProcessData } from '../../mocks';
import { HelmetProvider } from 'react-helmet-async';


HelmetProvider.canUseDOM = false;
const mockStore = configureMockStore([thunk]);
const NAME = 'Product';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };

const store = mockStore({
  MainData: {...MockMainData, currentProduct: fakeCurrentProduct},
  UserData: MockUserData,
  ProcessData: MockProcessData,
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
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
    history.push(AppRoute.Error);
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
  it('should render ProductPage when user navigate to /product/:id', () => {
    history.push('/product/1');
    render(fakeApp);
    expect(screen.getAllByText(NAME).length).toEqual(3);
  });
});
