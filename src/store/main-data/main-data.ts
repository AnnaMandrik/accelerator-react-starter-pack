import {MainData} from '../../types/state';
import {createReducer} from '@reduxjs/toolkit';
import {loadProductCardsList} from '../action';

const initialState: MainData = {
  productsList: [],
  isDataLoaded: false,
};

const mainData = createReducer (initialState, (builder) => {
  builder
    .addCase(loadProductCardsList, (state, action) => {
      state.productsList = action.payload;
      state.isDataLoaded = true;
    });
});


export {mainData};
