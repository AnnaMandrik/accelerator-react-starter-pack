import {toast} from 'react-toastify';
import {ThunkActionResult} from '../types/action';
import {APIRoute, ITEMS_PER_PAGE, ErrorText, HEADER_TOTAL_COUNT, DIGIT_ZERO} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList, loadPageCount, selectActualPageCount, searchingProducts, loadMinDefaultPrice, loadMaxDefaultPrice} from './action';


export const fetchFilterUserAction = (pageItems: string, filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data, headers} = await api.get<Guitars>(`${APIRoute.Guitars}?${pageItems}${filter}`);
      const productCardItems = headers[HEADER_TOTAL_COUNT];
      const pageCount = Math.ceil(productCardItems / ITEMS_PER_PAGE);
      const actualPageCount = Math.ceil(productCardItems / ITEMS_PER_PAGE);

      dispatch(loadProductCardsList(data));
      dispatch(selectActualPageCount(actualPageCount));
      dispatch(loadPageCount(pageCount));
    } catch {
      toast.info(ErrorText.LoadData);
    }
  };

export const fetchDefaultMinPriceAction =(): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data, headers} = await api.get<Guitars>(
        `${APIRoute.Guitars}?_sort=price&_start=${DIGIT_ZERO}&_end=${DIGIT_ZERO + 1}`);

      dispatch(loadMinDefaultPrice(data[DIGIT_ZERO].price));
      dispatch(fetchDefaultMaxPriceAction(headers[HEADER_TOTAL_COUNT]));
    } catch {
      toast.info(ErrorText.LoadData);
    }
  };

export const fetchDefaultMaxPriceAction =(productsCount: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(
        `${APIRoute.Guitars}?_sort=price&_start=${productsCount - 1}&_end=${productsCount}`);

      dispatch(loadMaxDefaultPrice(data[DIGIT_ZERO].price));
    } catch {
      toast.info(ErrorText.LoadData);
    }
  };

export const fetchSearchingProductsUserAction = (text: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?name_like=${text}`);
      dispatch(searchingProducts(data));
    } catch {
      toast.info(ErrorText.LoadData);
    }
  };


