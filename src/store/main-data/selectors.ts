import {Guitars} from '../../types/guitar';
import {State} from '../../types/state';
import {NameDataList} from '../root-reducer';

const getGuitars = (state: State): Guitars => state[NameDataList.MainData].productsList;
const getIsLoaded = (state: State): boolean => state[NameDataList.MainData].isDataLoaded;
const getMinPrice = (state: State): number => Math.min(...state[NameDataList.MainData].productsList.map((guitar) => guitar.price));
const getMaxPrice = (state: State): number => Math.max(...state[NameDataList.MainData].productsList.map((guitar) => guitar.price));


export {getGuitars, getIsLoaded, getMinPrice, getMaxPrice};
