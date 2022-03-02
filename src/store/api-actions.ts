import {toast} from 'react-toastify';
import {ThunkActionResult} from '../types/action';
import {APIRoute, ErrorText, HEADER_TOTAL_COUNT, DIGIT_ZERO, DEFAULT_PAGE, AppRoute} from '../const';
import {Product, Guitars} from '../types/guitar';
import {Comment, CommentPost} from '../types/comment';
import {loadCurrentComments, loadCurrentProduct, loadProductCardsList, searchingProducts,
  loadMinDefaultPrice, loadMaxDefaultPrice, clearPagesCount, loadPagesCount, selectFilter, selectSort,
  addNewComment, toggleIsReviewFormOpened, toggleIsSuccessReviewOpened} from './action';
import { createQuery } from '../utils';
import { FilterState, SortState } from '../types/state';
import { redirectToRoute } from './middlewares/middleware-action';


export const fetchCatalogPageAction = (page: number): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const filter = getState().UserData.filter;
    const sort = getState().UserData.sort;
    const query = createQuery(page, filter, sort);
    try {
      const {data} = await api.get<Product[]>(`${APIRoute.Guitars}${query}`);
      dispatch(loadProductCardsList(data));
    }catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
      }
    }
  };


export const fetchFilterUserAction = (filter: FilterState, page: number, isSearchQuery?:boolean): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    dispatch(clearPagesCount());
    const actualPage = isSearchQuery ? page : DEFAULT_PAGE;
    const sort = getState().UserData.sort;
    const query = createQuery(actualPage, filter, sort);
    try {
      const {data, headers} = await api.get<Product[]>(`${APIRoute.Guitars}${query}`);
      const allProductCardItems = headers[HEADER_TOTAL_COUNT];
      if ((data.length === 0)&&(isSearchQuery)) {
        throw new Error(ErrorText.LoadData);
      }
      if (page !== DEFAULT_PAGE) {
        dispatch(redirectToRoute(AppRoute.Main));
      }
      dispatch(loadPagesCount(allProductCardItems));
      dispatch(loadProductCardsList(data));
      dispatch(selectFilter(filter));
    } catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
        if (err.message === ErrorText.Redirect) {
          dispatch(redirectToRoute(AppRoute.Error));
        }
      }
    }
  };


export const fetchSortedUserAction = (page: number, sort: SortState): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const filter = getState().UserData.filter;
    const query = createQuery(page, filter, sort);
    try {
      const { data } = await api.get<Product[]>(`${APIRoute.Guitars}${query}`);
      dispatch(loadProductCardsList(data));
      dispatch(selectSort(sort));
    } catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
      }
    }
  };


export const fetchDefaultMinPriceAction =(): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data, headers} = await api.get<Guitars>(
        `${APIRoute.Guitars}?_sort=price&_start=${DIGIT_ZERO}&_end=${DIGIT_ZERO + 1}`);

      dispatch(loadMinDefaultPrice(data[DIGIT_ZERO].price));
      dispatch(fetchDefaultMaxPriceAction(headers[HEADER_TOTAL_COUNT]));
    }  catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
      }
    }
  };

export const fetchDefaultMaxPriceAction =(productsCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(
        `${APIRoute.Guitars}?_sort=price&_start=${productsCount - 1}&_end=${productsCount}`);

      dispatch(loadMaxDefaultPrice(data[DIGIT_ZERO].price));
    } catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
      }
    }
  };

export const fetchSearchingProductsUserAction = (text: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?name_like=${text}`);
      dispatch(searchingProducts(data));
    } catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
      }
    }
  };


export const fetchCurrentProductAction = (id: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Product>(`${APIRoute.Guitars}/${id}?_embed=comments`);
      const {comments, ...rest} = data;
      dispatch(loadCurrentProduct(rest));
      dispatch(loadCurrentComments(comments));
    } catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
        if (err.message === ErrorText.NotFound) {
          dispatch(redirectToRoute(AppRoute.Error));
        }
      }
    }
  };


export const postCommentAction = (comment: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<Comment>(
        `${APIRoute.Comments}`, comment);
      dispatch(addNewComment(data));
      dispatch(toggleIsReviewFormOpened(false));
      dispatch(toggleIsSuccessReviewOpened(true));
    } catch (err) {
      if (err instanceof Error) {
        if  (err.message === ErrorText.LoadData) {
          toast.error(err.message);
          toast.clearWaitingQueue();
        }
        if (err.message === ErrorText.BadRequest) {
          toast.warning(ErrorText.Attention);
          toast.clearWaitingQueue();
        }
      }
    }
  };
