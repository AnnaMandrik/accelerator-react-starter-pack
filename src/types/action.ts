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
  AddTemporaryProductsInCart = 'data/addTemporaryProductsInCart',
  ClearTemporaryProductsInCart = 'data/clearTemporaryProductsInCart',
  AddProductsInCart = 'data/addProductsInCart',
  DeleteProductsFromCart = 'data/deleteProductsFromCart',
  ClearProductsCart = 'data/clearProductsCart',

  SearchingProducts = 'user/searchingProducts',
  ClearSearchingProducts = 'user/clearSearchingProducts',
  SelectFilter ='user/selectFilter',
  ClearFilter ='user/clearFilter',
  SelectSort = 'user/selectSort',
  ClearSort = 'user/clearSort',
  AddInCart = 'user/addInCart',
  DeleteFromCart = 'user/deleteFromCart',
  ClearCart = 'user/clearCart',
  SelectTotalPrice = 'user/selectTotalPrice',
  AddCoupon = 'user/addCoupon',
  ClearCoupon = 'user/clearCoupon',
  SelectQuantityInCart = 'user/selectQuantityInCart',

  ToggleIsReviewFormOpened = 'process/toggleIsReviewFormOpened',
  ToggleIsSuccessReviewOpened = 'process/toggleIsSuccessReviewOpened',
  CloseAllModals = 'process/closeAllModals',
  ToggleIsAddOpened = 'process/toggleIsAddOpened',
  ToggleIsDeleteOpened = 'process/toggleIsDeleteOpened',
  ToggleIsSuccessCartOpened = 'process/toggleIsSuccessCartOpened',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
export type CallbackType = (thunkAction:ThunkActionResult<Promise<void>>) => void;
