import { act, cleanup, render, screen } from '@testing-library/react';
import { HistoryRouter, Route, Routes} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Pagination from './pagination';
import { AppRoute } from '../../const';
import { TestReg } from '../../mocks';

const COUNT = 54;
const PAGE_COUNT = 3;

const prevPage = (page: number) => (page - 1).toString();
const nextPage = (page: number) => (page + 1).toString();
const mockStore = configureMockStore();
const history = createMemoryHistory();

const componentState = {
  MainData: {
    pagesCount: COUNT,
  },
  UserData: {},
};
const store = mockStore(componentState);

const renderPagination = (page: number) =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
          />
          <Route
            path={`/${AppRoute.Catalog}`}
            element={<Pagination page={page} />}
          />
        </Routes>
      </HistoryRouter>
    </Provider>);

describe('Component: Pagination', () => {
  afterEach(cleanup);
  it('should render correctly with Далее & Назад', () => {
    const fifthPage = 5;
    act(() => {
      history.replace(`/catalog/page_${fifthPage}`);
    });
    renderPagination(fifthPage);
    expect(screen.getAllByTestId('pagination').length).toEqual(PAGE_COUNT);
    expect(screen.getByText(fifthPage.toString())).toBeInTheDocument();
    expect(screen.getByText(prevPage(fifthPage))).toBeInTheDocument();
    expect(screen.getByText(nextPage(fifthPage))).toBeInTheDocument();
    expect(screen.getByText(TestReg.NextPage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.PrevPage)).toBeInTheDocument();
    expect(screen.getByTestId('back')).toBeVisible();
    expect(screen.getByTestId('next')).toBeVisible();
  });

  it('should render correctly with Далее witout Назад', () => {
    const firstPage = 1;
    act(() => {
      history.replace(`/catalog/page_${firstPage}`);
    });
    renderPagination(firstPage);
    expect(screen.getAllByTestId('pagination').length).toEqual(PAGE_COUNT);
    expect(screen.getByText(firstPage.toString())).toBeInTheDocument();
    expect(screen.getByText(nextPage(firstPage))).toBeInTheDocument();
    expect(screen.getByText(nextPage(firstPage+1))).toBeInTheDocument();
    expect(screen.getByText(TestReg.NextPage)).toBeInTheDocument();
    expect(screen.getByTestId('back')).not.toBeVisible();
    expect(screen.getByTestId('next')).toBeVisible();
  });


  it('should render correctly with Назад witout Далее', () => {
    const lastPage = 6;
    act(() => {
      history.replace(`/catalog/page_${lastPage}`);
    });
    renderPagination(lastPage);
    expect(screen.getAllByTestId('pagination').length).toEqual(PAGE_COUNT);
    expect(screen.getByText(lastPage.toString())).toBeInTheDocument();
    expect(screen.getByText(prevPage(lastPage))).toBeInTheDocument();
    expect(screen.getByText(prevPage(lastPage-1))).toBeInTheDocument();
    expect(screen.getByText(TestReg.NextPage)).toBeInTheDocument();
    expect(screen.getByTestId('back')).toBeVisible();
    expect(screen.getByTestId('next')).not.toBeVisible();
  });
});
