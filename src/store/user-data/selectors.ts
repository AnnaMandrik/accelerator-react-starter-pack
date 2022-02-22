import {State} from '../../types/state';
import {NameDataList} from '../root-reducer';


const getUserSearching = (state: State) => state[NameDataList.UserData].searching;

const getUserFilter = (state: State) => state[NameDataList.UserData].filter;

const getUserSorting = (state: State) => state[NameDataList.UserData].sort;

export {getUserSearching, getUserSorting, getUserFilter};


