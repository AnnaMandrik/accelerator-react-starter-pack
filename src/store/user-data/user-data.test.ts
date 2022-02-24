import {userData} from '../user-data/user-data';
import {clearFilter, clearSearchingProducts, clearSort, searchingProducts, selectFilter, selectSort} from '../action';
import {fakeProducts} from '../../mocks';
import { OrderKey, ProductType, SortKey } from '../../const';
import { UserData } from '../../types/state';


const fakeGuitars = fakeProducts;
const FAKE_SORT = {
  sorting: SortKey.Price,
  order: OrderKey.Asc,
};
const FAKE_FILTER = {
  types: [ProductType.Acoustic, ProductType.Electric],
  strings: ['4', '12'],
  minPrice: '1',
  maxPrice: '10',
};


const initialState: UserData = {
  searching: [],
  sort: {
    sorting: '',
    order: '',
  },
  filter: {
    types: [],
    strings: [],
    minPrice: '',
    maxPrice: '',
  },
};

describe('Reducer: user-data', () => {
  let state = initialState;
  it('should search guitars', () => {
    expect(userData(state, searchingProducts(fakeGuitars)))
      .toEqual({ ...state, searching: fakeGuitars});
  });

  it('should clear search by clearSearchingProducts', () => {
    state = { ...initialState, searching: fakeGuitars };
    expect(userData(state, clearSearchingProducts())).toEqual(initialState);
  });

  it('should update sort by setSort', () => {
    expect(userData(state, selectSort(FAKE_SORT)))
      .toEqual({...state, sort: FAKE_SORT});
  });

  it('should clear sort by clearSort', () => {
    state = { ...initialState, sort: FAKE_SORT };
    expect(userData(state, clearSort())).toEqual(initialState);
  });

  it('should update filter by setFilter', () => {
    expect(userData(state, selectFilter(FAKE_FILTER)))
      .toEqual({...state, filter: FAKE_FILTER});
  });

  it('should clear filter by clearFilter', () => {
    state = { ...initialState, filter: FAKE_FILTER };
    expect(userData(state, clearFilter())).toEqual(initialState);
  });

});
