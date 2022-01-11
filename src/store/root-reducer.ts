import {combineReducers} from '@reduxjs/toolkit';
import {mainData} from './main-data/main-data';
import {userData} from './user-data/user-data';

export enum NameDataList {
  MainData = 'MainData',
  UserData = 'UserData',
}

export const rootReducer = combineReducers({
  [NameDataList.MainData]: mainData,
  [NameDataList.UserData]: userData,
});

export type RootState = ReturnType<typeof rootReducer>;
