import {ThunkActionResult} from '../types/action';
import {APIRoute} from '../const';
import {Guitars} from '../types/guitar';
import {loadProductCardsList} from './action';

export const fetchProductCartsListAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitars>(APIRoute.Guitars);
    dispatch(loadProductCardsList(data));
  };
