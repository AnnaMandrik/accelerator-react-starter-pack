import {Parameter, ITEMS_PER_PAGE} from './const';
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

export const getFilterInfo = (min: string, max: string, types: string[], strings: string[], sorting: string): string => {
  let filterRange = '';

  if (min !== '') {
    filterRange += `&price_gte=${min}`;
  }

  if (max !== '') {
    filterRange += `&price_lte=${max}`;
  }

  if (sorting !== '') {
    filterRange += sorting;
  }

  if (types.length !== 0) {
    filterRange += `&type=${types.join('&type=')}`;
  }
  if (strings.length !== 0) {
    filterRange += `&stringCount=${strings.join('&stringCount=')}`;
  }

  return filterRange;
};


export const getSortingOrderInfo = (sort: string, order: string): string => `${sort && `&_${Parameter.Sort}=${sort}`}${order && `&_${Parameter.Order}=${order}`}`;

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
