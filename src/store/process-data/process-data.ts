import {createReducer} from '@reduxjs/toolkit';
import {ProcessData} from '../../types/state';
import { closeAllModals, toggleIsAddOpened, toggleIsDeleteOpened, toggleIsReviewFormOpened,
  toggleIsSuccessCartOpened,
  toggleIsSuccessReviewOpened } from '../action';


const initialState: ProcessData = {
  isReviewFormOpened: false,
  isSuccessReviewOpened: false,
  isAddOpened: false,
  isDeleteOpened: false,
  isSuccessCartOpened: false,
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
    })
    .addCase(toggleIsAddOpened, (state, action) => {
      state.isAddOpened = action.payload;
    })
    .addCase(toggleIsDeleteOpened, (state, action) => {
      state.isDeleteOpened = action.payload;
    })
    .addCase(toggleIsSuccessCartOpened, (state, action) => {
      state.isSuccessCartOpened = action.payload;
    });
});


export {processData};
