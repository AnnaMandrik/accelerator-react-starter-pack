import {NameDataList} from '../root-reducer';
import {Guitars} from '../../types/guitar';
import {State} from '../../types/state';
import {ITEMS_PER_PAGE} from '../../const';


const getGuitars = (state: State): Guitars => state[NameDataList.MainData].productsList;
const getIsLoaded = (state: State): boolean => state[NameDataList.MainData].isDataLoaded;
const getDefaultMinPrice = (state: State): number => Math.min(...state[NameDataList.MainData].productsList.map((guitar) => guitar.price));
const getDefaultMaxPrice = (state: State): number => Math.max(...state[NameDataList.MainData].productsList.map((guitar) => guitar.price));
const getPagesCount = (state: State): number => Math.ceil(state[NameDataList.MainData].productsList.length / ITEMS_PER_PAGE);

export {getGuitars, getIsLoaded, getDefaultMinPrice, getDefaultMaxPrice, getPagesCount};
