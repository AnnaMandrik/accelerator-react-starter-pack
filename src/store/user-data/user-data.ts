import {createReducer} from '@reduxjs/toolkit';
import {UserData} from '../../types/state';
import {clearSearchingProducts, searchingProducts,
  selectFilter, clearFilter, selectSort, clearSort} from '../action';


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
    });
});


export {userData};
