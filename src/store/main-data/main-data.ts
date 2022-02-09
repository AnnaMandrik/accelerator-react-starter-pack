import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadProductCardsList, loadPageCount, loadMinDefaultPrice, loadMaxDefaultPrice} from '../action';

const initialState: MainData = {
  productsList: [],
  isDataLoaded: false,
  pageCount: 0,
  minDefaultPrice: 0,
  maxDefaultPrice: 0,
};

const mainData = createReducer (initialState, (builder) => {
  builder
    .addCase(loadProductCardsList, (state, action) => {
      state.productsList = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadMinDefaultPrice, (state, action) => {
      state.minDefaultPrice = action.payload;
    })
    .addCase(loadMaxDefaultPrice, (state, action) => {
      state.maxDefaultPrice = action.payload;
    })
    .addCase(loadPageCount, (state, action) => {
      state.pageCount = action.payload;
    });
});


export {mainData};
