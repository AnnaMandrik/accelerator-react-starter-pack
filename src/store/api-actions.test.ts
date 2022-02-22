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


const FAKE_QUERY = '?name=СURT&type=electric';
//const FAKE_COUNT = 20;
const FAKE_PAGE = 1;
//const FAKE_NEW_PAGE = 5;
//const EMPTY_DATA = [] as Guitar[];
//const FAKE_SEARCH_QUERY = true;
const FAKE_ID = '1';
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
      .onGet(`${APIRoute.Guitars}${FAKE_QUERY}`)
      .reply(HttpCode.Ok, fakeProducts);

    const store = mockStore();
    await store.dispatch(fetchCatalogPageAction(FAKE_PAGE));

    expect(store.getActions()).toEqual([
      loadProductCardsList(fakeProducts),
    ]);
  });


  it('should dispatch searchingProduct with fakeProductsSearch when GET /name_like', async () => {

    mockAPI
      .onGet(`${APIRoute.Guitars}?name_like=Чест`)
      .reply(HttpCode.Ok, fakeProducts);

    const store = mockStore();
    await store.dispatch(fetchSearchingProductsUserAction('Чест'));

    expect(store.getActions()).toEqual([searchingProducts(fakeProducts)]);
  });


  it('should dispatch loadCurrentProduct, loagCurrentComments with fakeProduct when GET ?_embed=comments & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}/${FAKE_ID}?_embed=comments`)
      .reply(HttpCode.Ok, FAKE_PRODUCT);
    const store = mockStore();
    await store.dispatch(fetchCurrentProductAction(FAKE_ID));
    expect(store.getActions()).toEqual([
      { payload: FAKE_PRODUCT_INFO, type: loadCurrentProduct.type },
      { payload: FAKE_COMMENTS, type: loadCurrentComments.type },
    ]);
  });
});
