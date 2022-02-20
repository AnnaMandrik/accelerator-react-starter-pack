import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitars, Guitar, Product} from '../types/guitar';
import {Comment} from '../types/comment';

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

export const loadPageCount = createAction(
  ActionType.LoadPageCount,
  (count: number) => ({
    payload: count,
  }),
);

export const loadCurrentProduct = createAction(
  ActionType.LoadCurrentProduct,
  (currentProduct: Guitar) => ({
    payload: currentProduct,
  }),
);

export const loadCurrentComments = createAction(
  ActionType.LoadCurrentComments,
  (currentComments: Comment[]) => ({
    payload: currentComments,
  }),
);

export const searchingProducts = createAction(
  ActionType.SearchingProducts,
  (productsList: Guitars) => ({
    payload: productsList,
  }),
);


export const selectMinPrice = createAction(
  ActionType.SelectMinPrice,
  (minPrice: string) => ({
    payload: minPrice,
  }),
);

export const selectMaxPrice = createAction(
  ActionType.SelectMaxPrice,
  (maxPrice: string) => ({
    payload: maxPrice,
  }),
);

export const selectType = createAction(
  ActionType.SelectType,
  (types: string[]) => ({
    payload: types,
  }),
);

export const selectStrings = createAction(
  ActionType.SelectStrings,
  (types: string[]) => ({
    payload: types,
  }),
);

export const selectSorting = createAction(
  ActionType.SelectSorting,
  (sorting: string) => ({
    payload: sorting,
  }),
);

export const selectOrder = createAction(
  ActionType.SelectOrder,
  (order: string) => ({
    payload: order,
  }),
);

export const selectActualPage = createAction(
  ActionType.SelectActualPage,
  (actualPage: number) => ({
    payload: actualPage,
  }),
);

export const selectActualPageCount = createAction(
  ActionType.SelectActualPageCount,
  (actualPageCount: number) => ({
    payload: actualPageCount,
  }),
);

export const selectFirstPage = createAction(
  ActionType.SelectFirstPage,
  (firstPage: number) => ({
    payload: firstPage,
  }),
);

export const selectLastPage = createAction(
  ActionType.SelectLastPage,
  (lastPage: number) => ({
    payload: lastPage,
  }),
);

export const prevFirstPage = createAction(ActionType.PrevFirstPage);
export const prevLastPage = createAction(ActionType.PrevLastPage);
export const nextFirstPage = createAction(ActionType.NextFirstPage);
export const nextLastPage = createAction(ActionType.NextLastPage);

