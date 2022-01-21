import {Parameter, ITEMS_PER_PAGE} from './const';

export const getItemsPerPage = (page: number): string => {
  const firstItem = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  const lastItem = (page) * ITEMS_PER_PAGE;
  return `_start=${firstItem}&end=${lastItem}`;
};

export const getItems = (page: number) => ({
  firstItem: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
  lastItem: (page) * ITEMS_PER_PAGE,
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
