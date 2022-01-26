import {makeFakeGuitars} from '../../mocks';
import {mainData} from '../main-data/main-data';
import {loadProductCardsList, loadPageCount} from '../action';


const fakeGuitars = makeFakeGuitars();

describe('Reducer: main-data', () => {

  const state = {
    productsList: [],
    isDataLoaded: false,
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

  it('should set all page count', () => {
    expect(mainData(state, loadPageCount(3)))
      .toEqual({...state, pageCount: 3});
  });

});
