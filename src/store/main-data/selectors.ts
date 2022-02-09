import {NameDataList} from '../root-reducer';
import {Guitars} from '../../types/guitar';
import {State} from '../../types/state';


const getGuitars = (state: State): Guitars => state[NameDataList.MainData].productsList;
const getIsLoaded = (state: State): boolean => state[NameDataList.MainData].isDataLoaded;
const getDefaultMinPrice = (state: State): number => state[NameDataList.MainData].minDefaultPrice;
const getDefaultMaxPrice = (state: State): number => state[NameDataList.MainData].maxDefaultPrice;
const getPagesCount = (state: State): number => state[NameDataList.MainData].pageCount;


export {getGuitars, getIsLoaded, getDefaultMinPrice, getDefaultMaxPrice, getPagesCount};
