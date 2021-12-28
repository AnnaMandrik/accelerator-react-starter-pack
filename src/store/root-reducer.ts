import {combineReducers} from '@reduxjs/toolkit';
import {mainData} from './main-data/main-data';

export enum NameDataList {
  MainData = 'MainData'
}

export const rootReducer = combineReducers({
  [NameDataList.MainData]: mainData,
});

export type RootState = ReturnType<typeof rootReducer>;
