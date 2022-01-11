export const getFilterPriceInfo = (min: string, max: string): string => {
  let filterRange = '';

  if (min !== '') {
    filterRange += `price_gte=${min}`;
  }

  if (max !== '') {
    filterRange += `&price_lte=${max}`;
  }
  return filterRange;
};


export const getFilterTypeInfo = (types: string[], strings: string[]): string => {
  let filterRange = '';

  if (types.length !== 0) {
    filterRange += `&type=${types.join('&type=')}`;
  }
  if (strings.length !== 0) {
    filterRange += `&stringCount=${strings.join('&stringCount=')}`;
  }
  return filterRange;
};
