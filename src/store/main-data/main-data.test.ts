import {makeFakeGuitars} from '../../mocks';
import {mainData} from '../main-data/main-data';
import {loadProductCardsList, loadPageCount, loadMaxDefaultPrice, loadMinDefaultPrice} from '../action';


const fakeGuitars = makeFakeGuitars();

describe('Reducer: main-data', () => {

  const state = {
    productsList: [],
    isDataLoaded: false,
    minDefaultPrice: 0,
    maxDefaultPrice: 0,
    pageCount: 0,
  };

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
    expect(mainData(state, loadPageCount(3)))
      .toEqual({...state, pageCount: 3});
  });

});
