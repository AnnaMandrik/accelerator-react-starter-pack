import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitars, Guitar, Product} from '../types/guitar';
import {Comment} from '../types/comment';
import { FilterState, SortState } from '../types/state';

export const loadProductCardsList = createAction(
  ActionType.LoadProductCardsList,
  (productsList: Product[]) => ({
    payload: productsList,
  }),
);

export const loadMinDefaultPrice = createAction(
  ActionType.LoadMinDefaultPrice,
  (min: number) => ({
    payload: min,
  }),
);

export const loadMaxDefaultPrice = createAction(
  ActionType.LoadMaxDefaultPrice,
  (max: number) => ({
    payload: max,
  }),
);

export const loadPagesCount = createAction(
  ActionType.LoadPagesCount,
  (count: number) => ({
    payload: count,
  }),
);

export const clearPagesCount = createAction(ActionType.ClearPagesCount);

export const loadCurrentProduct = createAction(
  ActionType.LoadCurrentProduct,
  (currentProduct: Guitar) => ({
    payload: currentProduct,
  }),
);

export const clearCurrentProduct = createAction(ActionType.ClearCurrentProduct);

export const loadCurrentComments = createAction(
  ActionType.LoadCurrentComments,
  (currentComments: Comment[]) => ({
    payload: currentComments,
  }),
);

export const clearCurrentComments = createAction(ActionType.ClearCurrentComments);

export const addNewComment = createAction(
  ActionType.AddNewComment,
  (currentComments: Comment) => ({
    payload: currentComments,
  }),
);

export const increaseCommentsCounter = createAction(ActionType.IncreaseCommentsCounter);

export const clearCommentsCounter = createAction(ActionType.ClearComentsCounter);

export const searchingProducts = createAction(
  ActionType.SearchingProducts,
  (productsList: Guitars) => ({
    payload: productsList,
  }),
);

export const clearSearchingProducts = createAction(ActionType.ClearSearchingProducts);


export const selectFilter = createAction(
  ActionType.SelectFilter,
  (filter: FilterState) => ({
    payload: filter,
  }),
);

export const clearFilter = createAction(ActionType.ClearFilter);


export const selectSort = createAction(
  ActionType.SelectSort,
  (sort: SortState) => ({
    payload: sort,
  }),
);

export const clearSort = createAction(ActionType.ClearSort);

export const toggleIsReviewFormOpened = createAction(
  ActionType.ToggleIsReviewFormOpened,
  (isReviewFormOpened: boolean) => ({
    payload: isReviewFormOpened,
  }),
);

export const toggleIsSuccessReviewOpened = createAction(
  ActionType.ToggleIsSuccessReviewOpened,
  (isSuccessReviewOpened: boolean) => ({
    payload: isSuccessReviewOpened,
  }),
);

export const closeAllModals = createAction(ActionType.CloseAllModals);
