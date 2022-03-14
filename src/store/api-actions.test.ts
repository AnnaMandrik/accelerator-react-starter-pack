import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {State} from '../types/state';
import {APIRoute, CouponError} from '../const';
import {postCommentAction, fetchCatalogPageAction, fetchSearchingProductsUserAction, fetchCurrentProductAction, fetchCartProductsAction, postCouponAction, postOrderAction} from './api-actions';
import {loadCurrentComments, loadProductCardsList, searchingProducts, loadCurrentProduct, addNewComment, toggleIsReviewFormOpened, toggleIsSuccessReviewOpened, addProductsInCart, addCoupon, clearProductsCart, clearCoupon, clearCart} from './action';
import {fakeProducts, HttpCode, MakeFakeGuitar, fakeComments, MockUserData,MakeFakeComment} from '../mocks';
import { createQuery } from '../utils';
import { Order } from '../types/guitar';


jest.mock('../utils');
const createFakeQuery = createQuery as jest.MockedFunction<typeof createQuery>;
const FAKE_QUERY = '?name=СURT&type=electric';
const FAKE_PAGE = 1;
const FAKE_ID = '1';
const FAKE_PRODUCT_INFO = MakeFakeGuitar();
const FAKE_COMMENTS = fakeComments;
const FAKE_PRODUCT = {...FAKE_PRODUCT_INFO, comments: FAKE_COMMENTS};
const FAKE_COMMENT = MakeFakeComment();
const FAKE_VALUE = 'coupon';
const FAKE_DISCOUNT = 50;
const FAKE_ORDER: Order = {
  guitarsIds: [1, 1],
  coupon: FAKE_VALUE,
};

const NewComment = {
  guitarId: 1,
  userName: 'user',
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'comment',
  rating: 7,
};


describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch loadProductCardsList when GET page & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}${FAKE_QUERY}`)
      .reply(HttpCode.Ok, fakeProducts);
    const store = mockStore({ UserData: MockUserData });
    createFakeQuery.mockReturnValue(FAKE_QUERY);
    await store.dispatch(fetchCatalogPageAction(FAKE_PAGE));
    expect(store.getActions()).toEqual([
      loadProductCardsList(fakeProducts),
    ]);
    expect(createFakeQuery).toBeCalled();
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
  it('should dispatch toggleIsReviewFormOpened, toggleIsSuccessReviewOpened, addNewComment with FAKE_COMMENT when POST /comments', async () => {
    mockAPI
      .onPost(APIRoute.Comments).reply(HttpCode.Ok, FAKE_COMMENT);
    const store = mockStore();
    await store.dispatch(postCommentAction(NewComment));
    expect(store.getActions()).toEqual([
      { payload: FAKE_COMMENT, type: addNewComment.type },
      { payload: false, type: toggleIsReviewFormOpened.type },
      { payload: true, type: toggleIsSuccessReviewOpened.type },
    ]);
  });

  it('should dispatch addProductsInCart when GET page & HttpCode.OK', async () => {
    mockAPI
      .onGet(`${APIRoute.Guitars}/1`)
      .reply(HttpCode.Ok, FAKE_PRODUCT_INFO)
      .onGet(`${APIRoute.Guitars}/2`)
      .reply(HttpCode.Ok, FAKE_PRODUCT_INFO)
      .onGet(`${APIRoute.Guitars}/3`)
      .reply(HttpCode.Ok, FAKE_PRODUCT_INFO);
    const store = mockStore();
    await store.dispatch(fetchCartProductsAction(['1', '2', '3']));
    expect(store.getActions()).toEqual([
      addProductsInCart([
        FAKE_PRODUCT_INFO,
        FAKE_PRODUCT_INFO,
        FAKE_PRODUCT_INFO,
      ]),
    ]);
  });

  it('should dispatch addCoupon with {FAKE_COMMENT when POST /coupons & HttpCode.OK', async () => {
    mockAPI.onPost(APIRoute.Coupon).reply(HttpCode.Ok, FAKE_DISCOUNT);
    const store = mockStore();
    await store.dispatch(postCouponAction(FAKE_VALUE));
    expect(store.getActions()).toEqual([
      {
        payload: { value: FAKE_VALUE, discount: FAKE_DISCOUNT },
        type: addCoupon.type,
      },
    ]);
  });

  it('should dispatch addCoupon with CouponError when POST /coupons & HttpCode.BadRequest', async () => {
    mockAPI.onPost(APIRoute.Coupon).reply(HttpCode.BadRequest);
    const store = mockStore();
    await store.dispatch(postCouponAction(FAKE_VALUE));
    expect(store.getActions()).toEqual([
      { payload: CouponError, type: addCoupon.type },
    ]);
  });

  it('should dispatch clearCoupon, clearCart, clearProductsCart when POST /orders & HttpCode.OK', async () => {
    mockAPI.onPost(APIRoute.Order).reply(HttpCode.Ok);
    const store = mockStore();
    await store.dispatch(postOrderAction(FAKE_ORDER));
    expect(store.getActions()).toEqual([
      { type: clearProductsCart.type },
      { type: clearCoupon.type },
      { type: clearCart.type },
    ]);
  });
});

