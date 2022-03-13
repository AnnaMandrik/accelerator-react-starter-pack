import { createSelector } from 'reselect';
import {State} from '../../types/state';
import { getSumValues, getAllIds } from '../../utils';
import {NameDataList} from '../root-reducer';


const getUserSearching = (state: State) => state[NameDataList.UserData].searching;
const getUserFilter = (state: State) => state[NameDataList.UserData].filter;
const getUserSorting = (state: State) => state[NameDataList.UserData].sort;

const getUserInCart = (state: State) => state[NameDataList.UserData].inCart;
const getUserTotalPrice = (state: State) => state[NameDataList.UserData].totalPrice;
const getUserCoupon = (state: State) => state[NameDataList.UserData].coupon;
const getUserDiscount = (state: State) => state[NameDataList.UserData].coupon.discount;

const getUserTotalInCart = createSelector(getUserInCart, getSumValues);
const getUserQuantity = createSelector(getUserInCart, (inCart) =>  Object.keys(inCart));
const getUserSumOfTotal = createSelector(getUserTotalPrice, getSumValues);
const getUserTotalDiscount = createSelector(getUserSumOfTotal, getUserDiscount, (sum, percent) => (sum/100)*percent);
const getUserOrderQuantity = createSelector(getUserInCart, getAllIds);


export {getUserSearching, getUserSorting, getUserFilter,
  getUserInCart, getUserTotalPrice, getUserCoupon, getUserDiscount,
  getUserTotalInCart, getUserQuantity, getUserSumOfTotal, getUserTotalDiscount,
  getUserOrderQuantity};


