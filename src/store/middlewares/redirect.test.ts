import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { redirectToRoute } from './middleware-action';
import { redirect } from './redirect';

const fakeHistory = {
  location: {
    pathname: '',
    state: [] as string [],
  },
  push(path: string) {
    this.location.state.push(this.location.pathname);
    this.location.pathname = path;
  },
  goBack() {
    this.location.pathname = this.location.state.pop() ?? '';
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('/');
  });

  it('should be redirect to /catalog/page_1', () => {
    store.dispatch(redirectToRoute(AppRoute.Main));
    expect(fakeHistory.location.pathname).toBe(AppRoute.Main);
    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Main)]);
  });

  it('should not to be redirect /404 страница не найдена', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Error});
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Error);
  });
});
