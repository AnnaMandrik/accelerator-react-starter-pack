import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadProductCardsList, loadPageCount} from '../action';

const initialState: MainData = {
  productsList: [],
  isDataLoaded: false,
  pageCount: 0,
};

const mainData = createReducer (initialState, (builder) => {
  builder
    .addCase(loadProductCardsList, (state, action) => {
      state.productsList = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadPageCount, (state, action) => {
      state.pageCount = action.payload;
    });
});


export {mainData};
