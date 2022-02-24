import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';
import { Provider } from 'react-redux';
import { HistoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { MockMainData, MockUserData, TestReg, Main, Stub } from '../../mocks';
import MainLayout from './main-layout';


const mockStore = configureMockStore();
const history = createMemoryHistory();
const componentState = {
  MainData: MockMainData,
  UserData: MockUserData,
};
const store = mockStore(componentState);
mockAllIsIntersecting(true);

const fakeApp = (
  <Provider store = {store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path = {AppRoute.Main} element={<MainLayout/>}>
          <Route index element={<Navigate to={AppRoute.Page} replace />} />
          <Route path={AppRoute.Catalog} element={<h1>{Main}</h1>} />
          <Route path={AppRoute.About} element={<h1>{Stub}</h1>} />
          <Route path={AppRoute.Where} element={<h1>{Stub}</h1>} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>);

describe('Component: MainLayout', () => {
  it('should render correctly', () => {
    render(fakeApp);
    expect(screen.getByPlaceholderText(TestReg.SearchPlaceholder)).toBeInTheDocument();
    expect(screen.getAllByAltText(TestReg.Logo).length).toEqual(2);
    expect(screen.getByText(TestReg.About)).toBeInTheDocument();
    expect(screen.getAllByText(TestReg.Where).length).toEqual(2);
    expect(screen.getByText(TestReg.Catalog)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterAbout)).toBeInTheDocument();
    expect(screen.getByText(TestReg.FooterService)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Main)).toBeInTheDocument();
  });

});
