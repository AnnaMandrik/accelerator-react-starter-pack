import {fakeProduct, fakeProducts, fakeComments, MakeFakeComment} from '../../mocks';
import {mainData} from '../main-data/main-data';
import {loadCurrentComments, loadProductCardsList, loadPagesCount, loadMaxDefaultPrice, loadMinDefaultPrice, loadCurrentProduct, clearCurrentProduct, clearCurrentComments, clearPagesCount, addNewComment, increaseCommentsCounter, clearCommentsCounter} from '../action';
import { Guitar } from '../../types/guitar';
import { START_COMMENTS_COUNT } from '../../const';
import { MainData } from '../../types/state';

const fakeComment = MakeFakeComment();
const fakeGuitars = fakeProducts;
const FAKE_COMMENT_COUNTER = 6;
const initialState: MainData = {
  productsList: [],
  isDataLoaded: false,
  pagesCount: 0,
  minDefaultPrice: 0,
  maxDefaultPrice: 0,
  currentProduct: {} as Guitar,
  currentComments: [],
  commentsCounter: START_COMMENTS_COUNT,
};

describe('Reducer: main-data', () => {
  let state = initialState;
  beforeAll(() => {
    state = initialState;
  });

  it('without additional parameters should return initial state', () => {
    expect(mainData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('should loaded guitars list', () => {
    expect(mainData(state, loadProductCardsList(fakeGuitars)))
      .toEqual({...state, productsList: fakeGuitars, isDataLoaded: true});
  });

  it('should load min price from all guitars', () => {
    expect(mainData(state, loadMinDefaultPrice(300)))
      .toEqual({...state, minDefaultPrice: 300});
  });

  it('should load max price from all guitars', () => {
    expect(mainData(state, loadMaxDefaultPrice(10000)))
      .toEqual({...state, maxDefaultPrice: 10000});
  });

  it('should loadPagesCount count', () => {
    expect(mainData(state, loadPagesCount(3)))
      .toEqual({...state, pagesCount: 3});
  });
  it('should clear pages by loadPagesCount', () => {
    state = { ...initialState, pagesCount: 3 };
    expect(mainData(state, clearPagesCount())).toEqual(initialState);
  });

  it('should load currentProduct from all productList', () => {
    expect(mainData(state, loadCurrentProduct(fakeProduct)))
      .toEqual({ ...state, currentProduct: fakeProduct,  isDataLoaded: true});
  });

  it('should clear currentProduct by clearCurrentProduct', () => {
    state = { ...initialState, currentProduct: fakeProduct };
    expect(mainData(state, clearCurrentProduct())).toEqual(initialState);
  });

  it('should load currentComments from all productList', () => {
    expect(mainData(state, loadCurrentComments(fakeComments)))
      .toEqual({ ...state, currentComments: fakeComments});
  });
  it('should clear currentComments by clearCurrentComments', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(mainData(state, clearCurrentComments())).toEqual(initialState);
  });
  it('should addNewComment', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(mainData(state, addNewComment(fakeComment))).toEqual({
      ...state,
      currentComments: [fakeComment, ...fakeComments],
    });
  });
  it('should update commentsCounter by incrementCommentsCounter', () => {
    state = { ...initialState, currentComments: fakeComments };
    expect(mainData(state, increaseCommentsCounter())).toEqual({
      ...initialState,
      currentComments: fakeComments,
      commentsCounter: initialState.commentsCounter + START_COMMENTS_COUNT,
    });
  });
  it('should clear commentsCounter by clearCommentsCounter', () => {
    state = { ...initialState, commentsCounter: FAKE_COMMENT_COUNTER };
    expect(mainData(state, clearCommentsCounter())).toEqual({
      ...initialState,
    });
  });
});
