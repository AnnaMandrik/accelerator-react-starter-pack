import {StringType, GuitarType} from './types/guitar';

const START_COMMENTS_COUNT = 3;
const ITEMS_PER_PAGE = 9;
const DIGIT_ZERO = 0;
const DEFAULT_PAGE = 1;
const STEP_OF_COUNT = 3;
const HEADER_TOTAL_COUNT = 'x-total-count';

const enum AppRoute {
  Main = '/',
  Page = 'catalog/page_:number',
  Product = 'product/:id',
  About = 'about',
  Where = 'where',
  Cart = 'cart',
  Stub = '/stub',
  Error = '/error',
}

const enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments',
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

const StringCount = new Map<string, StringType>([
  ['four', { id: '4-strings', stringCount: '4' }],
  ['six', { id: '6-strings', stringCount: '6' }],
  ['seven', { id: '7-strings', stringCount: '7' }],
  ['twelve', { id: '12-strings', stringCount: '12' }],
]);

const ProductProperty = new Map<string, string[]>([
  ['acoustic', ['6', '7', '12']],
  ['electric', ['4', '6', '7']],
  ['ukulele', ['4']],
]);

const GuitarsType = new Map<string, GuitarType>([
  ['acoustic', {id: 'acoustic', title: 'Акустические гитары', type: 'Аккустическая гитара'}],
  ['electric', {id: 'electric', title: 'Электрогитары', type: 'Электрогитара'}],
  ['ukulele', {id: 'ukulele', title: 'Укулеле', type: 'Укулеле'}],
]);

enum ProductType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}


const enum CountOfPages {
  First = 0,
  Last = 3,
}


const enum ErrorText {
  LoadData = 'Не загрузились данные. Попробуйте позже!!!',
  Redirect = 'Перенаправление на основную страницу.',
  NotFound = 'Запрос не выполнен с кодом состояния 404',
  BadRequest = 'Запрос не выполнен с кодом состояния 400',
  Attention = 'Внимание!'
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

const RATING_NUMBERS: number[] = [1, 2, 3, 4, 5];


export {FilterOfPrices, AppRoute, APIRoute, ITEMS_PER_PAGE,
  Parameter, SortKey, OrderKey, DIGIT_ZERO,
  DEFAULT_PAGE, STEP_OF_COUNT, CountOfPages, ErrorText,
  FOOTER_NAV, socialsNets, HEADER_TOTAL_COUNT, RATING_NUMBERS,
  START_COMMENTS_COUNT, StringCount, ProductProperty,
  GuitarsType, ProductType};

