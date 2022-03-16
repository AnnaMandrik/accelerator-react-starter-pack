import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import queryString from 'query-string';
import {ITEMS_PER_PAGE} from './const';
import {Guitars, Guitar} from './types/guitar';
import {Comment} from './types/comment';
import { FilterState, InCart, SortState } from './types/state';


export const createFilterQuery = (filter: FilterState) : string =>  {
  const {types, strings, minPrice, maxPrice} = filter;
  return queryString.stringify(
    {
      type: types,
      stringCount: strings,
      'price_gte': minPrice,
      'price_lte': maxPrice,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

const createSortQuery =  (sort: SortState) => {
  const {sorting, order} = sort;
  return queryString.stringify(
    {
      _sort: sorting,
      _order: order,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

const createPageQuery = (page: number | undefined): string => {
  const lastItem = page ? + page * ITEMS_PER_PAGE : ITEMS_PER_PAGE;
  const firstItem = lastItem - ITEMS_PER_PAGE;
  return queryString.stringify(
    {
      _start: firstItem,
      _end: lastItem,
    },
    { skipEmptyString: true, skipNull: true },
  );
};

export const createQuery = (page: number | undefined, filter: FilterState, sort: SortState):string => {
  const pageQuery = createPageQuery(page);
  const filterQuery = createFilterQuery(filter);
  const sortQuery = createSortQuery(sort);

  const fullQuery = [pageQuery, filterQuery, sortQuery].filter((query) => query !== '').join('&');
  return `/?${fullQuery}&_embed=comments`;
};


const compareFunc = (guitarA: Guitar, guitarB: Guitar) => {
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


export const allItems = (factItems: string[], item: string): string[] => {
  if (factItems.includes(item)) {
    return factItems.filter((value) => value !== item);
  }
  return [...factItems, item];
};

export const getCommentsSortByDate = (comments: Comment[]): Comment[] =>
  [...comments].sort((objA, objB) => Date.parse(objB.createAt) - Date.parse(objA.createAt));

export const getFormatDate = (date: string): string => dayjs(date).locale('ru').format('D MMMM');

export const isEscEvent = (evt: KeyboardEvent): boolean =>
  evt.key === 'Escape' || evt.key === 'Esc';

export const getSumValues = (object: InCart): number => {
  const values = Object.values(object);
  return values.length !==0
    ? values.reduce((sum, item) => sum = sum+item)
    : 0;
};

export const getAllIds = (object: InCart): number[] =>
  Object.entries(object)
    .reduce((allIds: number[], [key, value]) => {
      const currentIds = new Array(value).fill(Number(key));
      return [...allIds, ...currentIds];
    }, [] as number[]);

export const numberWithSpaces = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
