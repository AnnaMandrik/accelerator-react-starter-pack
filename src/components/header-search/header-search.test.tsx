import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import HeaderSearch from './header-search';
import {makeFakeGuitars} from '../../mocks';

const NAME_COUNT = 4;
const NAME = 'name';
const ID = 1;

const mockStore = configureMockStore();
const history = createMemoryHistory();
const selector = jest.fn();
const useSelector = jest.spyOn(Redux, 'useSelector');
const fakeGuitarsList = new Array(NAME_COUNT)
  .fill(null)
  .map((product, index) => {
    product = makeFakeGuitars();
    product.name = NAME;
    product.id = index + ID;
    return product;
  });

describe('Component: HeaderSearch', () => {
  it('should render correctly', () => {
    useSelector.mockReturnValue(selector);
    const store = mockStore({
      GUITARS: {
        isDataLoaded: true,
      },
      USER: {
        searching: [...fakeGuitarsList],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <HeaderSearch />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button', {name: 'Начать поиск'})).toBeInTheDocument();
    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    userEvent.type(screen.getByLabelText(/Поиск/i), 'chester');
    expect(screen.getByDisplayValue(/chester/i)).toBeInTheDocument();
  });
});

