import {ThunkActionResult} from '../types/action';
import {APIRoute, ITEMS_PER_PAGE} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList, loadPageCount, selectActualPageCount} from './action';

export const fetchProductCardsListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);
    dispatch(loadProductCardsList(data));
    dispatch(loadPageCount(pageCount));
  };

// export const fetchSortingProductCardsAction = (name: string): ThunkActionResult =>
//   async (dispatch, _getState, api): Promise<void> => {
//     try {
//       const {data} = await api.get<Guitars>(`${APIRoute.Guitars}${name}`);
//       dispatch(loadProductCardsList(data));
//     } catch {
//     // eslint-disable-next-line no-console
//       console.log('do not load sorting from server');
//     }
//   };

export const fetchFilterUserAction = (range: string, filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const allData = (await api.get<Guitars>(`${APIRoute.Guitars}?${filter}`)).data;
      const actualPageCount = Math.ceil(allData.length / ITEMS_PER_PAGE);
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}?${range}${filter}`);
      dispatch(loadProductCardsList(data));
      dispatch(selectActualPageCount(actualPageCount));
    } catch {
      // eslint-disable-next-line no-console
      console.log('do not load filter from server');
    }
  };

