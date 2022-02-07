import {createReducer} from '@reduxjs/toolkit';
import {UserData} from '../../types/state';
import {searchingProducts, selectStrings, selectType, selectMaxPrice,
  selectMinPrice, selectSorting, selectOrder, selectActualPage,
  selectActualPageCount, selectFirstPage, selectLastPage, prevFirstPage,
  prevLastPage, nextFirstPage, nextLastPage} from '../action';
import {CountOfPages, STEP_OF_COUNT} from '../../const';

const initialState: UserData = {
  minPrice: '',
  maxPrice: '',
  types: [],
  strings: [],
  sorting: '',
  order: '',
  actualPage: 1,
  actualPageCount: 0,
  firstPage: CountOfPages.First,
  lastPage: CountOfPages.Last,
  searching: [],
};

const userData = createReducer (initialState, (builder) => {
  builder
    .addCase(searchingProducts, (state, action) => {
      state.searching = action.payload;
    })
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
      state.strings = action.payload;
    })
    .addCase(selectSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(selectOrder, (state, action) => {
      state.order = action.payload;
    })
    .addCase(selectActualPage, (state, action) => {
      state.actualPage = action.payload;
    })
    .addCase(selectActualPageCount, (state, action) => {
      state.actualPageCount = action.payload;
    })
    .addCase(selectFirstPage, (state, action) => {
      state.firstPage = action.payload;
    })
    .addCase(selectLastPage, (state, action) => {
      state.lastPage = action.payload;
    })
    .addCase(prevFirstPage, (state) => {
      state.firstPage = state.firstPage - STEP_OF_COUNT;
    })
    .addCase(prevLastPage, (state) => {
      state.lastPage = state.lastPage - STEP_OF_COUNT;
    })
    .addCase(nextFirstPage, (state) => {
      state.firstPage = state.firstPage + STEP_OF_COUNT;
    })
    .addCase(nextLastPage, (state) => {
      state.lastPage = state.lastPage + STEP_OF_COUNT;
    });
});


export {userData};
