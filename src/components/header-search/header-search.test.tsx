import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HeaderSearch from './header-search';
import {fakeProducts} from '../../mocks';
import thunk from 'redux-thunk';


const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeGuitars = fakeProducts;

describe('Component: HeaderSearch', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: {
        isDataLoaded: true,
      },
      UserData: {
        searching: fakeGuitars,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HeaderSearch />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button', {name: 'Начать поиск'})).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/Поиск/i), 'chester');
    expect(screen.getByDisplayValue(/chester/i)).toBeInTheDocument();
  });
});

