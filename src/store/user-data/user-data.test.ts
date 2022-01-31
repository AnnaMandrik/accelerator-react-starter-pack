import {userData} from '../user-data/user-data';
import {searchingProducts, selectMinPrice, selectMaxPrice, selectType, selectStrings,
  selectSorting, selectOrder, selectActualPage, selectActualPageCount, selectFirstPage,
  selectLastPage} from '../action';
import {makeFakeGuitars} from '../../mocks';
//prevFirstPage, prevLastPage, nextFirstPage, nextLastPage}
const fakeGuitars = makeFakeGuitars();

describe('Reducer: user-data', () => {

  const state = {
    minPrice: '',
    maxPrice: '',
    types: [],
    strings: [],
    sorting: '',
    order: '',
    actualPage: 1,
    actualPageCount: 0,
    firstPage: 0,
    lastPage: 5,
    searching: [],
  };

  it('should search guitars', () => {
    expect(userData(state, searchingProducts(fakeGuitars)))
      .toEqual({ ...state, searching: fakeGuitars});
  });

  it('should select min price', () => {
    expect(userData(state, selectMinPrice('50')))
      .toEqual({...state, minPrice: '50'});
  });

  it('should select max price', () => {
    expect(userData(state, selectMaxPrice('1000')))
      .toEqual({...state, maxPrice: '1000'});
  });

  it('should select type of guitars', () => {
    expect(userData(state, selectType(['type1', 'type2', 'type3'])))
      .toEqual({...state, types: ['type1', 'type2', 'type3']});
  });

  it('should select strings for guitars', () => {
    expect(userData(state, selectStrings(['4', '6', '7', '12'])))
      .toEqual({...state, strings: ['4', '6', '7', '12']});
  });

  it('should select sorting type asc', () => {
    expect(userData(state, selectSorting('asc')))
      .toEqual({...state, sorting: 'asc'});
  });

  it('should select sorting type desc', () => {
    expect(userData(state, selectSorting('desc')))
      .toEqual({...state, sorting: 'desc'});
  });

  it('should select order type price', () => {
    expect(userData(state, selectOrder('price')))
      .toEqual({...state, order: 'price'});
  });

  it('should select order type rating', () => {
    expect(userData(state, selectOrder('rating')))
      .toEqual({...state, order: 'rating'});
  });

  it('should select actual page of list', () => {
    expect(userData(state, selectActualPage(5)))
      .toEqual({...state, actualPage: 5});
  });

  it('should select quantity of pages', () => {
    expect(userData(state, selectActualPageCount(10)))
      .toEqual({...state, actualPageCount: 10});
  });

  it('should selectt first pagination page', () => {
    expect(userData(state, selectFirstPage(4)))
      .toEqual({...state, firstPage: 4});
  });

  it('should selectt last pagination page', () => {
    expect(userData(state, selectLastPage(6)))
      .toEqual({...state, lastPage: 6});
  });

  // it('should select previous before first page', () => {
  //   expect(userData(state, prevFirstPage()))
  //     .toEqual({...state, firstPage: 0});
  // });

  // it('should select previous before last page', () => {
  //   expect(userData(state, prevLastPage()))
  //     .toEqual({...state, lastPage: 9});
  // });

  // it('should select next from first page', () => {
  //   expect(userData(state, nextFirstPage()))
  //     .toEqual({...state, firstPage: 13});
  // });

  // it('should select next from last page', () => {
  //   expect(userData(state, nextLastPage()))
  //     .toEqual({...state, lastPage: 15});
  // });
});
