const ITEMS_PER_PAGE = 9;
const DIGIT_ZERO = 0;

const enum AppRoute {
  Main = '/',
  Page = 'catalog/:page',
}

const enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

const enum Parameter {
  Sort = 'sort',
  Order = 'order',
}

const enum SortKey {
  Price = 'price',
  Rating = 'rating',
}

const enum OrderKey {
  Desc = 'desc',
  Asc = 'asc',
}

const FilterOfPrices = {
  PRICE_MIN: {
    id: 'priceMin',
    name: 'от',
  },
  PRICE_MAX: {
    id: 'priceMax',
    name: 'до',
  },
};

const STRINGS: number[] = [4, 6, 7, 12];
const TYPES_QUANTITY = 3;
const STRINGS_QUANTITY = 4;

const FilterOfTypesStrings = {
  ACOUSTIC: {
    name: 'acoustic',
    type: 'Акустические гитары',
    stringsCount: [6, 7, 12],
  },
  ELECTRIC: {
    name: 'electric',
    type: 'Электрогитары',
    stringsCount: [4, 6, 7],
  },
  UKULELE: {
    name: 'ukulele',
    type: 'Укулеле',
    stringsCount: [4],
  },
};

const FILTER_OF_TYPES_STRINGS = [FilterOfTypesStrings.ACOUSTIC, FilterOfTypesStrings.ELECTRIC, FilterOfTypesStrings.UKULELE];

const DEFAULT_PAGE = 1;
const STEP_OF_COUNT = 3;

const enum CountOfPages {
  First = 0,
  Last = 3,
}

const RATING_NUMBERS: number[] = [1, 2, 3, 4, 5];

export {FilterOfPrices, AppRoute, APIRoute, ITEMS_PER_PAGE,
  Parameter, SortKey, OrderKey, DIGIT_ZERO, STRINGS,
  TYPES_QUANTITY, STRINGS_QUANTITY, FILTER_OF_TYPES_STRINGS,
  DEFAULT_PAGE, STEP_OF_COUNT, CountOfPages, RATING_NUMBERS};

