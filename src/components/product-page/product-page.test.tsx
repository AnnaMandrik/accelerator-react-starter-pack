import { render, screen } from '@testing-library/react';
import ProductPage from './product-page';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeComments, fakeProduct, MockMainData, MockProcessData, MockUserData, TestReg } from '../../mocks';
import * as Redux from 'react-redux';
import { createMemoryHistory } from 'history';
import { HistoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, START_COMMENTS_COUNT } from '../../const';
import { fetchCurrentProductAction } from '../../store/api-actions';


HelmetProvider.canUseDOM = false;
jest.mock('../../store/api-actions');
jest.mock('../../store/main-data/main-data');
const fakeFetchCurrentProduct = fetchCurrentProductAction as jest.MockedFunction<
  typeof fetchCurrentProductAction
>;


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const NAME = 'Product';
const ID = 1;
const fakeCurrentProduct = { ...fakeProduct, name: NAME, id: ID };
const componentState = {
  MainData: {
    ...MockMainData,
    currentProduct: fakeCurrentProduct,
    currentComments: fakeComments,
  },
  UserData: MockUserData,
  ProcessData: MockProcessData,
};
const store = mockStore(componentState);
const history = createMemoryHistory();
window.scrollTo = jest.fn();

const renderProductPage = () =>
  render(
    <Redux.Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <Routes>
            <Route path={AppRoute.Main} />
            <Route path={AppRoute.Product} element={<ProductPage />} />
          </Routes>
        </HelmetProvider>
      </HistoryRouter>
    </Redux.Provider>);

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    history.push('/product/1');
    renderProductPage();
    expect(screen.getAllByText(NAME).length).toEqual(3);
    expect(screen.getAllByText(TestReg.Comment).length).toEqual(START_COMMENTS_COUNT);
    expect(screen.getByText(TestReg.Description)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Price)).toBeInTheDocument();
    expect(screen.getByText(TestReg.ScrollBtn)).toBeInTheDocument();
  });
  it('should dispatch async actions when mount and clear actions when unmount', async () => {
    history.push('/product/1');
    useDispatch.mockReturnValue(dispatch);
    const { unmount } = renderProductPage();
    expect(fakeFetchCurrentProduct).toHaveBeenCalled();
    unmount();
  });
});
