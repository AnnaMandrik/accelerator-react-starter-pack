import {RootState} from '../store/root-reducer';
import {Guitars, Guitar, Product} from './guitar';
import {Comment} from './comment';

export type MainData = {
  productsList: Product[],
  isDataLoaded: boolean,
  minDefaultPrice: number,
  maxDefaultPrice: number,
  pagesCount: number,
  currentProduct: Guitar,
  currentComments: Comment[],
  commentsCounter: number,
};

export type UserData = {
  searching: Guitars,
  filter: FilterState,
  sort: SortState,
};

export type FilterState = {
  types: string [],
  strings: string [],
  minPrice: string,
  maxPrice: string,
}

export type SortState = {
  sorting: string,
  order: string,
}

export type ProcessData = {
  isReviewFormOpened: boolean,
  isSuccessReviewOpened: boolean,
};


export type State = RootState;

