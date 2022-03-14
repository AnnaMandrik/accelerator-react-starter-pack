import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { cleanup, render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { HistoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { MockProcessData, TestReg } from '../../../../mocks';
import ModalSuccess from './modal-success';
import { AppRoute } from '../../../../const';
import { toggleIsSuccessCartOpened } from '../../../../store/action';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const componentState = {
  ProcessData: { ...MockProcessData,  isSuccessCartOpened: true},
};
const history = createMemoryHistory();

const renderModalCartSuccess = (store: MockStore) =>
  render(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HelmetProvider>
          <ModalSuccess />
        </HelmetProvider>
      </HistoryRouter>
    </Provider>);


describe('Component: ModalSuccess', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, ProcessData: {isSuccessCartOpened: false}});
    renderModalCartSuccess(store);
    expect(screen.queryByText(TestReg.CartSuccessMessage)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    expect(screen.getByText(TestReg.CartSuccessMessage)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartSuccessRedirect)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartResume)).toBeInTheDocument();
  });
  it('should dispatch correctly & redirect to AppRoute.Cart if click  on CartSuccessRedirectBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByText(TestReg.CartSuccessRedirect));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsSuccessCartOpened(false));
    expect(history.location.pathname).toBe(`/${AppRoute.Cart}`);
  });
  it('should dispatch correctly if click &  redirect to AppRoute.Main on ResumeBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByText(TestReg.CartResume));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsSuccessCartOpened(false));
    expect(history.location.pathname).toBe(`/${AppRoute.Page}`);
  });
  it('should dispatch correctly if click CloseBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    renderModalCartSuccess(store);
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(toggleIsSuccessCartOpened(false));
  });
});
