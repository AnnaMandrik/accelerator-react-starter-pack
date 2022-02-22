import React from 'react';
import { render, screen } from '@testing-library/react';
import {HistoryRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ErrorPage from './error-page';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {},
      UserData: {
        searching: [],
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ErrorPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/404 страница не найдена/)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться в каталог/)).toBeInTheDocument();
    expect(screen.getByTestId('go-back')).toBeInTheDocument();
  });

});
