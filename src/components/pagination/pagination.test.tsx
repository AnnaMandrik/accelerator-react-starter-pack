import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Pagination from './pagination';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const getFakeApp = (store: any) => (
  <Provider store={store}>
    <Router history={history}>
      <Pagination />
    </Router>
  </Provider>
);

describe('Component: Pagination', () => {
  it('should render correctly pagination for three pages (the first is actual page)', () => {
    const store = mockStore({
      MainData: {
        pageCount: 3,
      },
      UserData: {
        actualPage: 1,
        actualPageCount: 3,
        firstPage: 0,
        lastPage: 3,
      },
    });

    const fakeApp = getFakeApp(store);
    render(fakeApp);

    expect(screen.queryByRole('link', {name: 'Назад'})).not.toBeInTheDocument();
    expect(screen.getByRole('link', {name: '1'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '2'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '3'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Далее'})).toBeInTheDocument();
  });

  it('should render correctly pagination for five pages (the five is actual page)', () => {
    const store = mockStore({
      MainData: {
        pageCount: 5,
      },
      UserData: {
        actualPage: 5,
        actualPageCount: 5,
        firstPage: 3,
        lastPage: 5,
      },
    });

    const fakeApp = getFakeApp(store);
    render(fakeApp);

    expect(screen.getByRole('link', {name: 'Назад'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '4'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '5'})).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: 'Далее'})).not.toBeInTheDocument();
  });

  it('should render correctly pagination for five pages (the two is actual page)', () => {
    const store = mockStore({
      MainData: {
        pageCount: 5,
      },
      UserData: {
        actualPage: 2,
        actualPageCount: 5,
        firstPage: 0,
        lastPage: 3,
      },
    });

    const fakeApp = getFakeApp(store);
    render(fakeApp);

    expect(screen.getByRole('link', {name: 'Назад'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '1'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '2'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '3'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Далее'})).toBeInTheDocument();
  });

});

