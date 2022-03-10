import { cleanup, render, screen } from '@testing-library/react';
import CatalogPage from './catalog-page';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import { AppRoute, STEP_OF_COUNT} from '../../const';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { fakeProducts, makeFakeGuitars, MockMainData, MockUserData, TestReg } from '../../mocks';

HelmetProvider.canUseDOM = false;
jest.mock('../../store/api-actions');
mockAllIsIntersecting(true);

const PRODUCTS = 50;

const mockStore = configureMockStore();
const componentState = {
  MainData: {
    ...MockMainData,
    productsList: fakeProducts,
    pagesCount: PRODUCTS,
    isDataLoaded: true,
  },
  UserData: MockUserData,
};
const history = createMemoryHistory();
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const renderCatalogPage = (store: MockStore) =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<Navigate to={AppRoute.Page} />}
            />
            <Route path={AppRoute.Catalog} element={<CatalogPage />} />
          </Routes>
        </HelmetProvider>
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: CatalogPage', () => {
  afterEach(cleanup);
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderCatalogPage(store);
    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FilterTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.PriceTitle)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.ByPrice)).toBeInTheDocument();
    expect(screen.queryAllByTestId('pagination').length).toEqual(
      STEP_OF_COUNT);
    expect(screen.queryAllByText(TestReg.AboutProduct).length).toEqual(
      makeFakeGuitars.length-1);
  });
});
