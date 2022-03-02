import {combineReducers} from '@reduxjs/toolkit';
import {mainData} from './main-data/main-data';
import { processData } from './process-data/process-data';
import {userData} from './user-data/user-data';

export enum NameDataList {
  MainData = 'MainData',
  UserData = 'UserData',
  ProcessData = 'ProcessData'
}

export const rootReducer = combineReducers({
  [NameDataList.MainData]: mainData,
  [NameDataList.UserData]: userData,
  [NameDataList.ProcessData]: processData,
});

export type RootState = ReturnType<typeof rootReducer>;
