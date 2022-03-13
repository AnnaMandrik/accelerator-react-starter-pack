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
  temporaryProductsInCart: Guitar,
  productsInCart: Guitars,
};

export type UserData = {
  searching: Guitars,
  filter: FilterState,
  sort: SortState,
  inCart: InCart,
  totalPrice: TotalPrice,
  coupon: Coupon,
};

export type ProcessData = {
  isReviewFormOpened: boolean,
  isSuccessReviewOpened: boolean,
  isAddOpened: boolean,
  isDeleteOpened: boolean,
  isSuccessCartOpened: boolean,
};

export type InCart = {
  [key: string]: number,
}

export type TotalPrice = {
  [key: string]: number,
}

export type Coupon = {
  value: string | null,
  discount: number,
}

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

export type State = RootState;

