import {ThunkActionResult} from '../types/action';
import {APIRoute, ITEMS_PER_PAGE} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList, loadPageCount, selectActualPageCount, searchingProducts} from './action';

export const fetchProductCardsListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
    dispatch(loadProductCardsList(data));
    dispatch(loadPageCount(pageCount));
  };

export const fetchSearchingProductsUserAction = (text: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?name_like=${text}`);
      dispatch(searchingProducts(data));
    } catch {
      // eslint-disable-next-line no-console
      console.log('do not load filter from server');
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
      // eslint-disable-next-line no-console
      console.log('do not load filter from server');
    }
  };


