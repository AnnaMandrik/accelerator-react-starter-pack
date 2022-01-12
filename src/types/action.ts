import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from './state';
import {AxiosInstance} from 'axios';

export const enum ActionType {
  LoadProductCardsList = 'data/loadProductCardsList',
  SelectMinPrice ='user/selectMinPrice',
  SelectMaxPrice ='user/selectMaxPrice',
  SelectType = 'user/selectType',
  SelectStrings = 'user/selectStrings',
  SelectSorting = 'user/selectSorting',
  SelectOrder = 'user/selectOrder'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
