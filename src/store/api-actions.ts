import {ThunkActionResult} from '../types/action';
import {APIRoute} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList} from './action';

export const fetchProductCardsListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    dispatch(loadProductCardsList(data));
  };

export const fetchSortingProductCardsAction = (type: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitars>(`${APIRoute.Guitars}${type}`);
      dispatch(loadProductCardsList(data));
    } catch {
    // eslint-disable-next-line no-console
      console.log('do not load from server');
    }
  };

