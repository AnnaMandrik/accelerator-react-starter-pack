import {NameDataList} from '../root-reducer';
import {Product, Guitar} from '../../types/guitar';
import {Comment} from '../../types/comment';
import {State} from '../../types/state';
import { createSelector } from 'reselect';
import { getCommentsSortByDate } from '../../utils';


const getGuitars = (state: State): Product[] => state[NameDataList.MainData].productsList;
const getIsLoaded = (state: State): boolean => state[NameDataList.MainData].isDataLoaded;
const getDefaultMinPrice = (state: State): number => state[NameDataList.MainData].minDefaultPrice;
const getDefaultMaxPrice = (state: State): number => state[NameDataList.MainData].maxDefaultPrice;
const getPagesCount = (state: State): number => state[NameDataList.MainData].pagesCount;
const getCurrentProduct = (state: State): Guitar => state[NameDataList.MainData].currentProduct;
const getCurrentComments = (state:State): Comment[] => state[NameDataList.MainData].currentComments;
const getCommentsCounter = (state: State) => state[NameDataList.MainData].commentsCounter;

const getSortedComments  = createSelector(
  getCurrentComments, getCommentsSortByDate);

export {getSortedComments, getCommentsCounter, getCurrentComments, getCurrentProduct, getGuitars, getIsLoaded, getDefaultMinPrice, getDefaultMaxPrice, getPagesCount};
