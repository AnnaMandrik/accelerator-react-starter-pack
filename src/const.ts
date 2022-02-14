import {StringType, GuitarType} from './types/guitar';

const ITEMS_PER_PAGE = 9;
const DIGIT_ZERO = 0;

const enum AppRoute {
  Main = '/',
  Page = '/catalog/:page',
  Product = 'product/:id',
  Stub = '/stub',
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
//------------------------------------------------------------
// const STRINGS: number[] = [4, 6, 7, 12];
// const TYPES_QUANTITY = 3;
// const STRINGS_QUANTITY = 4;

// const FilterOfTypesStrings = {
//   ACOUSTIC: {
//     name: 'acoustic',
//     type: 'Акустические гитары',
//     stringsCount: [6, 7, 12],
//   },
//   ELECTRIC: {
//     name: 'electric',
//     type: 'Электрогитары',
//     stringsCount: [4, 6, 7],
//   },
//   UKULELE: {
//     name: 'ukulele',
//     type: 'Укулеле',
//     stringsCount: [4],
//   },
// };

// const FILTER_OF_TYPES_STRINGS = [FilterOfTypesStrings.ACOUSTIC, FilterOfTypesStrings.ELECTRIC, FilterOfTypesStrings.UKULELE];
// const TYPE_NAMES = ['acoustic', 'electric', 'ukulele'];

//----------------------------------------------

export const StringCount = new Map<string, StringType>([
  ['four', { id: '4-strings', stringCount: '4' }],
  ['six', { id: '6-strings', stringCount: '6' }],
  ['seven', { id: '7-strings', stringCount: '7' }],
  ['twelve', { id: '12-strings', stringCount: '12' }],
]);

export const ProductProperty = new Map<string, string[]>([
  ['acoustic', ['6', '7', '12']],
  ['electric', ['4', '6', '7']],
  ['ukulele', ['4']],
]);

export const GuitarsType = new Map<string, GuitarType>([
  ['acoustic', {id: 'acoustic', title: 'Акустические гитары', type: 'Аккустическая гитара'}],
  ['electric', {id: 'electric', title: 'Электрогитары', type: 'Электрогитара'}],
  ['ukulele', {id: 'ukulele', title: 'Укулеле', type: 'Укулеле'}],
]);

//--------------------------------------------------------------

const DEFAULT_PAGE = 1;
const STEP_OF_COUNT = 3;
const HEADER_TOTAL_COUNT = 'x-total-count';

const enum CountOfPages {
  First = 0,
  Last = 3,
}


const enum ErrorText {
  LoadData = 'Не загрузились данные. Попробуйте позже!!!',
}

const FOOTER_NAV = [ 'Где купить?', 'Блог', 'Вопрос - ответ', 'Возврат', 'Сервис-центры' ];

const socialsNets = [
  {
    ariaLabel: 'facebook',
    href: 'https://www.facebook.com/',
    xlinkHref: '#icon-facebook',
  },
  {
    ariaLabel: 'instagram',
    href: 'https://www.instagram.com/',
    xlinkHref: '#icon-instagram',
  },
  {
    ariaLabel: 'twitter',
    href: 'https://www.twitter.com/',
    xlinkHref: '#icon-twitter',
  },
];

export {FilterOfPrices, AppRoute, APIRoute, ITEMS_PER_PAGE,
  Parameter, SortKey, OrderKey, DIGIT_ZERO,
  DEFAULT_PAGE, STEP_OF_COUNT, CountOfPages, ErrorText,
  FOOTER_NAV, socialsNets, HEADER_TOTAL_COUNT};

