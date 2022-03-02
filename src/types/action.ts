import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from './state';
import {AxiosInstance} from 'axios';

export const enum ActionType {
  LoadProductCardsList = 'data/loadProductCardsList',
  LoadPagesCount = 'data/loadPagesCount',
  ClearPagesCount = 'data/clearPagesCount',
  LoadMinDefaultPrice = 'data/loadMinDefaultPrice',
  LoadMaxDefaultPrice = 'data/loadMaxDefaultPrice',
  LoadCurrentProduct = 'data/loadCurrentProduct',
  ClearCurrentProduct = 'data/clearCurrentProduct',
  LoadCurrentComments = 'data/loadCurrentComments',
  ClearCurrentComments = 'data/clearCurrentComments',
  AddNewComment = 'data/addNewComment',
  IncreaseCommentsCounter = 'data/increaseCommentsCounter',
  ClearComentsCounter = 'data/clearCommentsCounter',

  SearchingProducts = 'user/searchingProducts',
  ClearSearchingProducts = 'user/clearSearchingProducts',
  SelectFilter ='user/selectFilter',
  ClearFilter ='user/clearFilter',
  SelectSort = 'user/selectSort',
  ClearSort = 'user/clearSort',

  ToggleIsReviewFormOpened = 'process/toggleIsReviewFormOpened',
  ToggleIsSuccessReviewOpened = 'process/toggleIsSuccessReviewOpened',
  CloseAllModals = 'process/closeAllModals',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
export type CallbackType = (thunkAction:ThunkActionResult<Promise<void>>) => void;
