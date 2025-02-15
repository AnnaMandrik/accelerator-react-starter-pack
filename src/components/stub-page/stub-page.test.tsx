import React from 'react';
import { render, screen } from '@testing-library/react';
import {HistoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import StubPage from './stub-page';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: StubPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {},
      UserData: {},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <StubPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Страница находится в разработке!/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в каталог/)).toBeInTheDocument();
    expect(screen.getByTestId('go-back')).toBeInTheDocument();
  });

});
