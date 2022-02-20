import {RootState} from '../store/root-reducer';
import {Guitars, Guitar, Product} from './guitar';
import {Comment} from './comment';

export type MainData = {
  productsList: Product[],
  isDataLoaded: boolean,
  minDefaultPrice: number,
  maxDefaultPrice: number,
  pageCount: number,
  currentProduct: Guitar,
  currentComments: Comment[],
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

