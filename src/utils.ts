import queryString from 'query-string';
import {ITEMS_PER_PAGE, DIGIT_ZERO} from './const';
import {Guitars, Guitar} from './types/guitar';


export const getItemsPerPage = (page: number): string => {
  const firstItem = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  const lastItem = page * ITEMS_PER_PAGE;
  return `_start=${firstItem}&_end=${lastItem}`;
};

export const getItems = (page: number) => ({
  firstItem: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
  lastItem: page * ITEMS_PER_PAGE,
});


const createTypesStringsQuery = (types: string[], strings: string[]) =>
  queryString.stringify(
    {
      type: types,
      stringCount: strings,
    },
    {skipEmptyString: true, skipNull: true},
  );

export const getFilterInfo = (min: string, max: string, types: string[], strings: string[], sorting: string, order: string): string => {
  let priceGteQuery = '';
  let priceLteQuery = '';
  let sortingQuery = '';
  let orderQuery = '';

  if (min !== '') {
    priceGteQuery += `price_gte=${min}`;
  }

  if (max !== '') {
    priceLteQuery += `price_lte=${max}`;
  }

  if (sorting !== '') {
    sortingQuery +=  `_sort=${sorting}`;
  }

  if (order !== '') {
    orderQuery +=  `_order=${order}`;
  }

  const typesStringsQuery = createTypesStringsQuery(types,strings);

  const fullQuery = [priceGteQuery, priceLteQuery, sortingQuery, orderQuery, typesStringsQuery].filter((query) => query !== '').join('&');
  return `&${fullQuery}&_embed=comments`;
};


export const compareFunc = (guitarA: Guitar, guitarB: Guitar) => {
  if (guitarA.name < guitarB.name) {
    return -1;
  }
  if (guitarA.name > guitarB.name) {
    return 1;
  }
  else {
    return 0;
  }
};

export const getSortedResult = (data: Guitar[], searchTerm: string) => {
  const matchGuitars: Guitars = [];
  const notMatchGuitars:Guitars = [];
  if (data) {
    data.filter((item) =>
      item.name.toLowerCase().indexOf(searchTerm.charAt(0).toLowerCase()) === 0
        ? matchGuitars.push(item)
        : notMatchGuitars.push(item));
  }
  return [...matchGuitars, ...notMatchGuitars.sort(compareFunc)];
};

export const getCheckingMinPrice = (userPrice: number, minPrice: number, maxPrice: number, maxUserPrice: string): string => {
  let price = userPrice;

  if (price < minPrice || price < DIGIT_ZERO) {
    price = minPrice;
  }

  if (price > maxPrice) {
    price = maxPrice;
  }

  if (maxUserPrice !== '') {
    const max = Number(maxUserPrice);

    if (price > max) {
      price = max;
    }
  }

  return String(price);
};


export const getCheckingMaxPrice = (userPrice: number, minPrice: number, maxPrice: number, minUserPrice: string): string => {
  let price = userPrice;

  if (price < minPrice) {
    price = minPrice;
  }

  if (price > maxPrice || price < DIGIT_ZERO) {
    price = maxPrice;
  }

  if (minUserPrice !== '') {
    const min = Number(minUserPrice);

    if (price < min) {
      price = min;
    }
  }

  return String(price);
};
