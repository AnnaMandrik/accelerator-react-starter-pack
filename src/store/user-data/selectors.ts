import {State} from '../../types/state';
import {NameDataList} from '../root-reducer';

const getMinUserPrice = (state: State): string => state[NameDataList.UserData].minPrice;
const getMaxUserPrice = (state: State): string => state[NameDataList.UserData].maxPrice;
const getUserType = (state: State): string[] => state[NameDataList.UserData].types;
const getUserStrings = (state: State): string[] => state[NameDataList.UserData].strings;
const getUserSorting = (state: State): string => state[NameDataList.UserData].sorting;
const getUserOrder = (state: State): string => state[NameDataList.UserData].order;

export {getMinUserPrice, getMaxUserPrice, getUserType, getUserStrings, getUserSorting, getUserOrder};


