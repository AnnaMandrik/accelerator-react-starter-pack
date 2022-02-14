import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State} from '../types/state';
import {APIRoute} from '../const';
import {fetchCatalogPageAction, fetchSearchingProductsUserAction} from './api-actions';
import {loadProductCardsList, searchingProducts} from './action';
import {HttpCode, makeFakeGuitars} from '../mocks';


const fakeGuitar = makeFakeGuitars();
const pageItems = '';
const filter = '';
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


    mockAPI
      .onGet(`${APIRoute.Guitars}?${pageItems}${filter}`)
      .reply(HttpCode.Ok, fakeGuitar);

    const store = mockStore();
    await store.dispatch(fetchCatalogPageAction(pageItems, filter));

    expect(store.getActions()).toEqual([
      loadProductCardsList(fakeGuitar),
    ]);
  });


  it('should dispatch Search suggestions when GET /guitars?_sort=price&_order=desc&_start=0&_limit=1', async () => {

    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=Чест`)
      .reply(HttpCode.Ok, fakeGuitar);

    const store = mockStore();
    await store.dispatch(fetchSearchingProductsUserAction('Чест'));

    expect(store.getActions()).toEqual([searchingProducts(fakeGuitar)]);
  });
});
