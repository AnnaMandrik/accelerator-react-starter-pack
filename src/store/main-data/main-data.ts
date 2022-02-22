import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {clearCurrentComments, clearCurrentProduct, clearPagesCount, loadPagesCount, loadCurrentComments, loadProductCardsList, loadMinDefaultPrice, loadMaxDefaultPrice, loadCurrentProduct} from '../action';
import {Guitar} from '../../types/guitar';
import { START_COMMENTS_COUNT } from '../../const';

const initialState: MainData = {
  productsList: [],
  isDataLoaded: false,
  pagesCount: 0,
  minDefaultPrice: 0,
  maxDefaultPrice: 0,
  currentProduct: {} as Guitar,
  currentComments: [],
  commentsCounter: START_COMMENTS_COUNT,
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
    .addCase(loadPagesCount, (state, action) => {
      state.pagesCount = action.payload;
    })
    .addCase(clearPagesCount, (state) => {
      state.pagesCount = initialState.pagesCount;
    })
    .addCase(loadCurrentProduct, (state, action) => {
      state.currentProduct = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(clearCurrentProduct, (state) => {
      state.currentProduct = initialState.currentProduct;
    })
    .addCase(loadCurrentComments, (state, action) => {
      state.currentComments = action.payload;
    })
    .addCase(clearCurrentComments, (state) => {
      state.currentComments = initialState.currentComments;
    });
});


export {mainData};


