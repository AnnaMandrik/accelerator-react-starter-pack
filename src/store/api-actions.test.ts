import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State} from '../types/state';
import {APIRoute} from '../const';
import {fetchProductCardsListAction} from './api-actions';
import {loadProductCardsList, loadPageCount} from './action';
import {HttpCode, makeFakeGuitars} from '../mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadProductCardsList when GET /guitars', async () => {
    const fakeGuitar = makeFakeGuitars();

    mockAPI
      .onGet(APIRoute.Guitars)
      .reply(HttpCode.Ok, fakeGuitar);

    const store = mockStore();
    await store.dispatch(fetchProductCardsListAction());

    expect(store.getActions()).toEqual([
      loadProductCardsList(fakeGuitar),
      loadPageCount(1),
    ]);
  });
});
