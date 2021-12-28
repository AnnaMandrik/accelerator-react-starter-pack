import {RootState} from '../store/root-reducer';
import {Guitars} from './guitar';

export type MainData = {
  productsList: Guitars,
  isDataLoaded: boolean,
};

export type State = RootState;

