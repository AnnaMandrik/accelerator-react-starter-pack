import {Parameter} from './const';

export const getFilterPriceInfo = (min: string, max: string, sorting: string): string => {
  let filterRange = '';

  if (min !== '') {
    filterRange += `price_gte=${min}`;
  }

  if (max !== '') {
    filterRange += `&price_lte=${max}`;
  }

  if (sorting !== '') {
    filterRange += sorting;
  }

  return filterRange;
};


export const getFilterTypeInfo = (types: string[], strings: string[], sorting: string): string => {
  let filterRange = '';

  if (types.length !== 0) {
    filterRange += `&type=${types.join('&type=')}`;
  }
  if (strings.length !== 0) {
    filterRange += `&stringCount=${strings.join('&stringCount=')}`;
  }

  if (sorting !== '') {
    filterRange += sorting;
  }

  return filterRange;
};

export const getSortingOrderInfo = (sort: string, order: string): string => `${sort && `&_${Parameter.Sort}=${sort}`}${order && `&_${Parameter.Order}=${order}`}`;
