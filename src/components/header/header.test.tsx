import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Header from './header';
import {fakeProducts} from '../../mocks';

const mockStore = configureMockStore([thunk]);
const fakeGuitars = fakeProducts;

describe('Component: Header', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {
        isDataLoaded: true,
      },
      UserData: {
        searching: fakeGuitars,
      },
    });
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Каталог'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Где купить?'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'О компании'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Корзина'})).toBeInTheDocument();
  });
});
