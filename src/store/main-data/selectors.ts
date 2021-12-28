import {Guitars} from '../../types/guitar';
import {State} from '../../types/state';
import {NameDataList} from '../root-reducer';

const getGuitars = (state: State): Guitars => state[NameDataList.MainData].productsList;
const getIsLoaded = (state: State): boolean => state[NameDataList.MainData].isDataLoaded;

export {getGuitars, getIsLoaded};
