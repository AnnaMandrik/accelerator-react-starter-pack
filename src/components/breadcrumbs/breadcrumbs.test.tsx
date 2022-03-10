import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { generatePath, HistoryRouter } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MockMainData, MockUserData, fakeProduct, MockProcessData } from '../../mocks';
import Breadcrumbs from './breadcrumbs';


const history = createMemoryHistory();
const mockStore = configureMockStore();

const NAME = 'Product';
const ID = 1;
const productPath = generatePath(AppRoute.Product, { id: ID.toString() });
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };


const store = mockStore({
  MainData: {...MockMainData, currentProduct: fakeCurrentProduct},
  UserData: MockUserData,
  ProcessData: MockProcessData,
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Breadcrumbs />
    </HistoryRouter>
  </Provider>
);

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    act(() => {
      history.push(AppRoute.Main);
    });
    render(fakeApp);

    expect(screen.getByText(/Главная/i)).toBeInTheDocument();
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    act(() => {
      history.push(`/${productPath}`);
    });
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.getByText(NAME)).toBeInTheDocument();
    act(() => {
      history.push(`/${AppRoute.Cart}`);
    });
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.queryByText(NAME)).not.toBeInTheDocument();
    expect(screen.getByText('Корзина')).toBeInTheDocument();
    act(() => {
      history.push(AppRoute.Main);
    });
    expect(screen.getByText(/Каталог/i)).toBeInTheDocument();
    expect(screen.queryByText(NAME)).not.toBeInTheDocument();
    expect(screen.queryByText('Корзина')).not.toBeInTheDocument();
  });
});
