import React from 'react';
import { render, screen } from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
//import userEvent from '@testing-library/user-event';

import ErrorPage from './error-page';
//import {makeFakeGuitars} from '../../mocks';

//const fakeGuitars = makeFakeGuitars();
const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {},
      USER: {
        searching: [],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ErrorPage />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/404 страница не найдена/)).toBeInTheDocument();
    expect(screen.getByText(/>Вернуться в каталог/)).toBeInTheDocument();
    expect(screen.getByTestId('go-back')).toBeInTheDocument();
  });

});
