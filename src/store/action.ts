import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitars} from '../types/guitar';

export const loadProductCardsList = createAction(
  ActionType.LoadProductCardsList,
  (productsList: Guitars) => ({
    payload: productsList,
  }),
);
