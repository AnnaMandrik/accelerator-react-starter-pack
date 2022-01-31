import {State} from '../../types/state';
import {NameDataList} from '../root-reducer';
import {getFilterInfo, getSortingOrderInfo} from '../../utils';

const getUserSearching = (state: State) => state[NameDataList.UserData].searching;
const getMinUserPrice = (state: State): string => state[NameDataList.UserData].minPrice;
const getMaxUserPrice = (state: State): string => state[NameDataList.UserData].maxPrice;
const getUserType = (state: State): string[] => state[NameDataList.UserData].types;
const getUserStrings = (state: State): string[] => state[NameDataList.UserData].strings;
const getUserSorting = (state: State): string => state[NameDataList.UserData].sorting;
const getUserOrder = (state: State): string => state[NameDataList.UserData].order;
const getUserActualPage = (state: State): number => state[NameDataList.UserData].actualPage;

const getIsFilterChecked = (state: State): boolean => {
  if (state[NameDataList.UserData].minPrice === ''
    && state[NameDataList.UserData].maxPrice === ''
    && state[NameDataList.UserData].types.length === 0
    && state[NameDataList.UserData].strings.length === 0) {
    return false;
  }

  return true;
};

const getUserActualPageCount = (state: State): number => state[NameDataList.UserData].actualPageCount;
const getUserFirstPage = (state: State): number => state[NameDataList.UserData].firstPage;
const getUserLastPage = (state: State): number => state[NameDataList.UserData].lastPage;

const collectFilterInfo = (state: State): string => getFilterInfo(
  state[NameDataList.UserData].minPrice,
  state[NameDataList.UserData].maxPrice,
  state[NameDataList.UserData].types,
  state[NameDataList.UserData].strings,
  getSortingOrderInfo(state[NameDataList.UserData].sorting, state[NameDataList.UserData].order),
);

export {collectFilterInfo, getUserSearching, getIsFilterChecked, getUserActualPageCount, getUserFirstPage, getUserLastPage, getUserActualPage, getMinUserPrice, getMaxUserPrice, getUserType, getUserStrings, getUserSorting, getUserOrder};


