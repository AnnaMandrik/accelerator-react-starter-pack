import {Action, ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from './state';
import {AxiosInstance} from 'axios';

export const enum ActionType {
  LoadProductCardsList = 'data/loadProductCardsList',
  LoadPageCount = 'data/loadPageCount',
  SearchingProducts = 'user/searchingProducts',
  SelectMinPrice ='user/selectMinPrice',
  SelectMaxPrice ='user/selectMaxPrice',
  SelectType = 'user/selectType',
  SelectStrings = 'user/selectStrings',
  SelectSorting = 'user/selectSorting',
  SelectOrder = 'user/selectOrder',
  SelectActualPage = 'user/selectActualPage',
  SelectActualPageCount = 'user/selectActualPageCount',
  SelectFirstPage = 'user/selectFirstPage',
  SelectLastPage = 'user/selectLastPage',
  PrevFirstPage = 'user/prevFirstPage',
  PrevLastPage = 'user/prevLastPage',
  NextFirstPage = 'user/nextFirstPage',
  NextLastPage = 'user/nextLastPage',
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
