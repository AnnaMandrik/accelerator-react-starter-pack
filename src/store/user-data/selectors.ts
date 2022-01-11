import {State} from '../../types/state';
import {NameDataList} from '../root-reducer';

const getMinUserPrice = (state: State): string => state[NameDataList.UserData].minPrice;
const getMaxUserPrice = (state: State): string => state[NameDataList.UserData].maxPrice;
const getUserType = (state: State): string[] => state[NameDataList.UserData].types;
const getUserStrings = (state: State): string[] => state[NameDataList.UserData].strings;

export {getMinUserPrice, getMaxUserPrice, getUserType, getUserStrings};


