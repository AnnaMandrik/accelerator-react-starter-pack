import {createReducer} from '@reduxjs/toolkit';
import {UserData} from '../../types/state';
import {selectStrings, selectType, selectMaxPrice, selectMinPrice} from '../action';

const initialState: UserData = {
  minPrice: '',
  maxPrice: '',
  types: [],
  strings: [],
};

const userData = createReducer (initialState, (builder) => {
  builder
    .addCase(selectMinPrice, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(selectMaxPrice, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(selectType, (state, action) => {
      state.types = action.payload;
    })
    .addCase(selectStrings, (state, action) => {
      state.types = action.payload;
    });
});


export {userData};
