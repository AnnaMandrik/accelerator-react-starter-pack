import {ThunkActionResult} from '../types/action';
import {APIRoute} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList} from './action';

export const fetchProductCardsListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    dispatch(loadProductCardsList(data));
  };

export const fetchSortingProductCardsAction = (name: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}${name}`);
      dispatch(loadProductCardsList(data));
    } catch {
    // eslint-disable-next-line no-console
      console.log('do not load sorting from server');
    }
  };

export const fetchFilterUserAction = (filter: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}${filter}`);
      dispatch(loadProductCardsList(data));
    } catch {
      // eslint-disable-next-line no-console
      console.log('do not load filter from server');
    }
  };

