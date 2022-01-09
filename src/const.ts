const ITEMS_PER_PAGE = 9;
const DIGIT_ZERO = 0;

enum AppRoute {
  Main = '/',
  Guitars = '/guitars/',
}

enum APIRoute {
  Guitars = '/guitars',
  Guitar = '/guitars/:id',
  Comments = '/guitars/:id/comments',
  NewComment = '/comments',
  Coupon = '/coupons',
  Order = '/orders',
}

enum Params {
  Sort = 'sort',
  Order = 'order',
}

enum SortKey {
  Price = 'price',
  Rating = 'rating',
}

enum OrderKey {
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

export {FilterOfPrices, AppRoute, APIRoute, ITEMS_PER_PAGE,
  Params, SortKey, OrderKey, DIGIT_ZERO, STRINGS,
  TYPES_QUANTITY, STRINGS_QUANTITY, FILTER_OF_TYPES_STRINGS};

