import {createReducer} from '@reduxjs/toolkit';
import {ProcessData} from '../../types/state';
import { closeAllModals, toggleIsReviewFormOpened, toggleIsSuccessReviewOpened } from '../action';


const initialState: ProcessData = {
  isReviewFormOpened: false,
  isSuccessReviewOpened: false,
};

const processData = createReducer (initialState, (builder) => {
  builder
    .addCase(toggleIsReviewFormOpened, (state, action) => {
      state.isReviewFormOpened = action.payload;
    })
    .addCase(toggleIsSuccessReviewOpened, (state, action) => {
      state.isSuccessReviewOpened = action.payload;
    })
    .addCase(closeAllModals, (state) => {
      state.isReviewFormOpened = initialState.isReviewFormOpened;
      state.isSuccessReviewOpened = initialState.isSuccessReviewOpened;
    });
});


export {processData};
