import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
//import thunk from 'redux-thunk';
import { HeaderSearch } from './header-search';
import {makeFakeGuitars} from '../../mocks';

const mockStore = configureMockStore();
const fakeGuitars = makeFakeGuitars();
const history = createMemoryHistory();

describe('Component: HeaderSearch', () => {
  // it('should render correctly', () => {
  //   const store = mockStore({
  //     GUITARS: {
  //       isDataLoaded: true,
  //     },
  //     USER: {
  //       searching: fakeGuitars,
  //     },
  //   });

  //   render(
  //     <Provider store={store}>
  //       <Router history={history}>
  //         <HeaderSearch />
  //       </Router>
  //     </Provider>,
  //   );

  //     expect(screen.getByRole('button', {name: 'Начать поиск'})).toBeInTheDocument();
  //     expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
  //     userEvent.type(screen.getByLabelText(/Поиск/i), 'chester');
  //     expect(screen.getByDisplayValue(/chester/i)).toBeInTheDocument();
  //   });
  // });
  test('it displays search suggestions', async () => {
    render(
      <Provider store={mockStore({
        USER: {
          searching: fakeGuitars,
        },
      })}
      >
        <Router history={history}>
          <HeaderSearch />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText(/Поиск/i)).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('search'), 'Чест');

    expect(screen.getByTestId(/search-suggestion-list/i)).toBeInTheDocument();
    expect(screen.getAllByTestId(/search-suggestion-item/i)).toHaveLength(3);
    expect(screen.getByText(/Честер Plus/)).toBeInTheDocument();
    expect(screen.getByText(/Честер 6V/)).toBeInTheDocument();
  });
});
