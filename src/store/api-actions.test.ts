import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State} from '../types/state';
import {APIRoute} from '../const';
import {fetchCatalogPageAction, fetchSearchingProductsUserAction, fetchCurrentProductAction} from './api-actions';
import {loadCurrentComments, loadProductCardsList, searchingProducts, loadCurrentProduct} from './action';
import {fakeProducts, HttpCode, MakeFakeGuitar, fakeComments} from '../mocks';


const pageItems = '';
const filter = '';
const fakeId = '';
const FAKE_PRODUCT_INFO = MakeFakeGuitar();
const FAKE_COMMENTS = fakeComments;
const FAKE_PRODUCT = {...FAKE_PRODUCT_INFO, comments: FAKE_COMMENTS};

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
      .reply(HttpCode.Ok, fakeProducts);

    const store = mockStore();
    await store.dispatch(fetchCatalogPageAction(pageItems, filter));

    expect(store.getActions()).toEqual([
      loadProductCardsList(fakeProducts),
    ]);
  });


  it('should dispatch Search suggestions when GET /guitars?_sort=price&_order=desc&_start=0&_limit=1', async () => {

    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=Чест`)
      .reply(HttpCode.Ok, fakeProducts);

    const store = mockStore();
    await store.dispatch(fetchSearchingProductsUserAction('Чест'));

    expect(store.getActions()).toEqual([searchingProducts(fakeProducts)]);
  });


  it('should dispatch loadCurrentProduct, loagCurrentComments with fakeProduct when GET ?_embed=comments & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}/${fakeId}?_embed=comments`)
      .reply(HttpCode.Ok, FAKE_PRODUCT);
    const store = mockStore();
    await store.dispatch(fetchCurrentProductAction(fakeId));
    expect(store.getActions()).toEqual([
      { payload: FAKE_PRODUCT_INFO, type: loadCurrentProduct.type },
      { payload: FAKE_COMMENTS, type: loadCurrentComments.type },
    ]);
  });
});
