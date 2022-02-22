import {fakeProduct, fakeProducts, fakeComments} from '../../mocks';
import {mainData} from '../main-data/main-data';
import {loadCurrentComments, loadProductCardsList, loadPagesCount, loadMaxDefaultPrice, loadMinDefaultPrice, loadCurrentProduct, clearCurrentProduct, clearCurrentComments} from '../action';
import { Guitar } from '../../types/guitar';
import { START_COMMENTS_COUNT } from '../../const';
import { MainData } from '../../types/state';


const fakeGuitars = fakeProducts;
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

  it('should set all page count', () => {
    expect(mainData(state, loadPagesCount(3)))
      .toEqual({...state, pageCount: 3});
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
});
