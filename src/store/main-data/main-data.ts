import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadCurrentComments, loadProductCardsList, loadPageCount, loadMinDefaultPrice, loadMaxDefaultPrice, loadCurrentProduct} from '../action';
import {Guitar} from '../../types/guitar';

const initialState: MainData = {
  productsList: [],
  isDataLoaded: false,
  pageCount: 0,
  minDefaultPrice: 0,
  maxDefaultPrice: 0,
  currentProduct: {} as Guitar,
  currentComments: [],
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
    })
    .addCase(loadCurrentProduct, (state, action) => {
      state.currentProduct = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadCurrentComments, (state, action) => {
      state.currentComments = action.payload;
    });
});


export {mainData};
