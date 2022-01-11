import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitars} from '../types/guitar';

export const loadProductCardsList = createAction(
  ActionType.LoadProductCardsList,
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
