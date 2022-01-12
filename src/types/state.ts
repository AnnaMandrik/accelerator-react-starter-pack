import {RootState} from '../store/root-reducer';
import {Guitars} from './guitar';

export type MainData = {
  productsList: Guitars,
  isDataLoaded: boolean,
};

export type UserData = {
  minPrice: string,
  maxPrice: string,
  types: string[],
  strings: string[],
  sorting: string,
  order: string,
};


export type State = RootState;

