import {toast} from 'react-toastify';
import {ThunkActionResult} from '../types/action';
import {APIRoute, ITEMS_PER_PAGE, ErrorText} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList, loadPageCount, selectActualPageCount, searchingProducts, loadMinDefaultPrice, loadMaxDefaultPrice} from './action';

export const fetchProductCardsListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars);
      const minPrice = Math.min(...data.map((guitar) => guitar.price));
      const maxPrice = Math.max(...data.map((guitar) => guitar.price));
      const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

      dispatch(loadProductCardsList(data));
      dispatch(loadMinDefaultPrice(minPrice));
      dispatch(loadMaxDefaultPrice(maxPrice));
      dispatch(loadPageCount(pageCount));
    } catch {
      toast.info(ErrorText.LoadData);
    }
  };

export const fetchFilterUserAction = (pageItems: string, filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const allData = (await api.get<Guitars>(`${APIRoute.Guitars}?${filter}`)).data;
      const actualPageCount = Math.ceil(allData.length / ITEMS_PER_PAGE);
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?${pageItems}${filter}`);
      dispatch(loadProductCardsList(data));
      dispatch(selectActualPageCount(actualPageCount));
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


