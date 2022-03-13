import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitars, Guitar, Product} from '../types/guitar';
import {Comment} from '../types/comment';
import { FilterState, SortState, Coupon } from '../types/state';

export const loadProductCardsList = createAction(
  ActionType.LoadProductCardsList,
  (productsList: Product[]) => ({
    payload: productsList,
  }),
);

export const loadMinDefaultPrice = createAction(
  ActionType.LoadMinDefaultPrice,
  (min: number) => ({
    payload: min,
  }),
);

export const loadMaxDefaultPrice = createAction(
  ActionType.LoadMaxDefaultPrice,
  (max: number) => ({
    payload: max,
  }),
);

export const loadPagesCount = createAction(
  ActionType.LoadPagesCount,
  (count: number) => ({
    payload: count,
  }),
);

export const clearPagesCount = createAction(ActionType.ClearPagesCount);

export const loadCurrentProduct = createAction(
  ActionType.LoadCurrentProduct,
  (currentProduct: Guitar) => ({
    payload: currentProduct,
  }),
);

export const clearCurrentProduct = createAction(ActionType.ClearCurrentProduct);

export const loadCurrentComments = createAction(
  ActionType.LoadCurrentComments,
  (currentComments: Comment[]) => ({
    payload: currentComments,
  }),
);

export const clearCurrentComments = createAction(ActionType.ClearCurrentComments);

export const addNewComment = createAction(
  ActionType.AddNewComment,
  (currentComments: Comment) => ({
    payload: currentComments,
  }),
);

export const increaseCommentsCounter = createAction(ActionType.IncreaseCommentsCounter);

export const clearCommentsCounter = createAction(ActionType.ClearComentsCounter);

export const searchingProducts = createAction(
  ActionType.SearchingProducts,
  (productsList: Guitars) => ({
    payload: productsList,
  }),
);

export const clearSearchingProducts = createAction(ActionType.ClearSearchingProducts);


export const selectFilter = createAction(
  ActionType.SelectFilter,
  (filter: FilterState) => ({
    payload: filter,
  }),
);

export const clearFilter = createAction(ActionType.ClearFilter);


export const selectSort = createAction(
  ActionType.SelectSort,
  (sort: SortState) => ({
    payload: sort,
  }),
);

export const clearSort = createAction(ActionType.ClearSort);

export const toggleIsReviewFormOpened = createAction(
  ActionType.ToggleIsReviewFormOpened,
  (isReviewFormOpened: boolean) => ({
    payload: isReviewFormOpened,
  }),
);

export const toggleIsSuccessReviewOpened = createAction(
  ActionType.ToggleIsSuccessReviewOpened,
  (isSuccessReviewOpened: boolean) => ({
    payload: isSuccessReviewOpened,
  }),
);

export const closeAllModals = createAction(ActionType.CloseAllModals);

export const addInCart = createAction(
  ActionType.AddInCart,
  (inCart: number) => ({
    payload: inCart,
  }),
);

export const deleteFromCart = createAction(
  ActionType.DeleteFromCart,
  (inCart: number) => ({
    payload: inCart,
  }),
);

export const selectQuantityInCart = createAction(
  ActionType.SelectQuantityInCart,
  (id: number, quantity: number) => ({
    payload: {
      id: id,
      quantity: quantity,
    },
  }),
);

export const clearCart = createAction(ActionType.ClearCart);

export const selectTotalPrice = createAction(
  ActionType.SelectTotalPrice,
  (id: number, price: number) => ({
    payload: {
      id: id,
      price: price,
    },
  }),
);

export const addCoupon = createAction(
  ActionType.AddCoupon,
  (coupon: Coupon) => ({
    payload: coupon,
  }),
);

export const clearCoupon = createAction(ActionType.ClearCoupon);

export const addTemporaryProductsInCart = createAction(
  ActionType.AddTemporaryProductsInCart,
  (temporaryProductsInCart: Guitar) => ({
    payload: temporaryProductsInCart,
  }),
);

export const clearTemporaryProductsInCart = createAction(ActionType.ClearTemporaryProductsInCart);

export const addProductsInCart = createAction(
  ActionType.AddProductsInCart,
  (productsInCart: Guitars) => ({
    payload: productsInCart,
  }),
);

export const clearProductsCart = createAction(ActionType.ClearProductsCart);

export const deleteProductsFromCart = createAction(
  ActionType.DeleteProductsFromCart,
  (productsInCart: number) => ({
    payload: productsInCart,
  }),
);

export const toggleIsAddOpened = createAction(
  ActionType.ToggleIsAddOpened,
  (isAddOpened: boolean) => ({
    payload: isAddOpened,
  }),
);

export const toggleIsDeleteOpened = createAction(
  ActionType.ToggleIsDeleteOpened,
  (isDeleteOpened: boolean) => ({
    payload: isDeleteOpened,
  }),
);

export const toggleIsSuccessCartOpened = createAction(
  ActionType.ToggleIsSuccessCartOpened,
  (isSuccessCartOpened: boolean) => ({
    payload: isSuccessCartOpened,
  }),
);
