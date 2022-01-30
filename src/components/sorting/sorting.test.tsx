import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import Sorting from './sorting';

const mockStore = configureMockStore();

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    const store = mockStore({
      GUITARS: {},
      USER: {},
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Sorting />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'по цене' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'по популярности' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'По возрастанию' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'По убыванию' })).toBeInTheDocument();
  });
});
