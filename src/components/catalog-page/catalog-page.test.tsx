import { render, screen } from '@testing-library/react';
import {HistoryRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import {MockMainData, MockUserData} from '../../mocks';
import CatalogPage from './catalog-page';
import thunk from 'redux-thunk';


const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      MainData: MockMainData,
      UserData: MockUserData,
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CatalogPage />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/каталог гитар/i)).toBeInTheDocument();
  });
});
