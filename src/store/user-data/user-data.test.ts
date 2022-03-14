import {userData} from '../user-data/user-data';
import {addCoupon, addInCart, clearCart, clearCoupon, clearFilter, clearSearchingProducts, clearSort, deleteFromCart, searchingProducts, selectFilter, selectQuantityInCart, selectSort, selectTotalPrice} from '../action';
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
const FAKE_COUPON = {
  value: 'light-333',
  discount: 15,
};

const FAKE_PRICE = 10;
const FAKE_QUANTITY = 10;


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
  inCart: {},
  totalPrice: {},
  coupon: {
    value: null,
    discount: 0,
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
  it('should update inCart by addInCart', () => {
    state = { ...initialState, inCart: { '1': 1 } };
    expect(userData(state, addInCart(1))).toEqual({
      ...initialState,
      inCart: { '1': 2 },
    });
  });
  it('should add new key inCart by addInCart', () => {
    state = { ...initialState, inCart: { '1': 1 } };
    expect(userData(state, addInCart(2))).toEqual({
      ...initialState,
      inCart: {
        '1': 1,
        '2': 1,
      },
    });
  });
  it('should delete inCart by deleteFromCart', () => {
    state = {
      ...initialState,
      inCart: {
        '1': 2,
        '2': 1,
      },
      totalPrice: {
        '1': FAKE_PRICE,
      },
    };
    expect(userData(state, deleteFromCart(1))).toEqual({
      ...initialState,
      inCart: {
        '2': 1,
      },
    });
  });
  it('should clear inCart by clearCart', () => {
    state = {
      ...state,
      inCart: {
        '1': 2,
        '2': 1,
      },
      totalPrice: {
        '1': FAKE_PRICE,
        '2': FAKE_PRICE,
      },
    };
    expect(userData(state, clearCart())).toEqual(initialState);
  });
  it('should update inCart by selectQuantityInCart', () => {
    state = { ...initialState, inCart: { '1': 1 } };
    expect(
      userData(state, selectQuantityInCart(1, FAKE_QUANTITY)),
    ).toEqual({
      ...initialState,
      inCart: { '1': FAKE_QUANTITY },
    });
  });
  it('should update totalPrice by selectTotalPrice', () => {
    state = { ...initialState, totalPrice: {} };
    expect(userData(state, selectTotalPrice(1, FAKE_PRICE))).toEqual(
      {
        ...initialState,
        totalPrice: { '1': FAKE_PRICE },
      },
    );
  });
  it('should clear coupon by clearCoupon', () => {
    state = { ...initialState, coupon: FAKE_COUPON };
    expect(userData(state, clearCoupon())).toEqual(initialState);
  });
  it('should add coupon by addCoupon', () => {
    state = initialState;
    expect(userData(state, addCoupon(FAKE_COUPON))).toEqual({
      ...initialState,
      coupon: FAKE_COUPON,
    });
  });
});

