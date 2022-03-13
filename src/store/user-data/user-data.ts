import {createReducer} from '@reduxjs/toolkit';
import {UserData} from '../../types/state';
import {clearSearchingProducts, searchingProducts,
  selectFilter, clearFilter, selectSort, clearSort,
  addInCart, deleteFromCart, selectQuantityInCart,
  clearCart, selectTotalPrice, addCoupon, clearCoupon} from '../action';


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

const userData = createReducer (initialState, (builder) => {
  builder
    .addCase(searchingProducts, (state, action) => {
      state.searching = action.payload;
    })
    .addCase(clearSearchingProducts, (state) => {
      state.searching = initialState.searching;
    })
    .addCase(selectFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(clearFilter, (state) => {
      state.filter = initialState.filter;
    })
    .addCase(selectSort, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(clearSort, (state) => {
      state.sort = initialState.sort;
    })
    .addCase(addInCart, (state, action) => {
      state.inCart[action.payload]
        ? (state.inCart[action.payload] = state.inCart[action.payload] + 1)
        : (state.inCart[action.payload] = 1);
    })
    .addCase(deleteFromCart, (state, action) => {
      delete state.inCart[action.payload];
      delete state.totalPrice[action.payload];
    })
    .addCase(selectQuantityInCart, (state, action) => {
      state.inCart[action.payload.id] = action.payload.quantity;
    })
    .addCase(clearCart, (state) => {
      state.inCart = initialState.inCart;
      state.totalPrice = initialState.totalPrice;
    })
    .addCase(selectTotalPrice, (state, action) => {
      state.totalPrice[action.payload.id] = action.payload.price;
    })
    .addCase(addCoupon, (state, action) => {
      state.coupon = action.payload;
    })
    .addCase(clearCoupon, (state) => {
      state.coupon = initialState.coupon;
    });
});


export {userData};
