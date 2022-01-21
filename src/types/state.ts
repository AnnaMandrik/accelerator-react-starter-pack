import {RootState} from '../store/root-reducer';
import {Guitars} from './guitar';

export type MainData = {
  productsList: Guitars,
  isDataLoaded: boolean,
  pageCount: number,
};

export type UserData = {
  searching: Guitars,
  minPrice: string,
  maxPrice: string,
  types: string[],
  strings: string[],
  sorting: string,
  order: string,
  actualPage: number,
  actualPageCount: number,
  firstPage: number,
  lastPage: number,
};


export type State = RootState;

