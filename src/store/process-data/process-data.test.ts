import { ProcessData } from '../../types/state';
import { closeAllModals, toggleIsAddOpened, toggleIsDeleteOpened, toggleIsReviewFormOpened, toggleIsSuccessCartOpened, toggleIsSuccessReviewOpened } from '../action';
import { processData } from './process-data';


export const initialState: ProcessData = {
  isReviewFormOpened: false,
  isSuccessReviewOpened: false,
  isAddOpened: false,
  isDeleteOpened: false,
  isSuccessCartOpened: false,
};

describe('Reducer: process-data', () => {
  let state = initialState;
  beforeAll(() => {
    state = initialState;
  });
  it('without additional parameters should return initial state', () => {
    expect(processData(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(state);
  });
  it('should update isReviewFormOpened by toggleIsReviewFormOpened', () => {
    expect(processData(state, toggleIsReviewFormOpened(true))).toEqual({
      ...state,
      isReviewFormOpened: true,
    });
  });
  it('should return initialState by closeAllModals', () => {
    state = {...initialState,
      isSuccessReviewOpened: true};
    expect(processData(state, closeAllModals())).toEqual({
      ...initialState,
    });
  });
  it('should update isSuccessReviewOpened by toggleIsSuccessReviewOpened', () => {
    expect(processData(state, toggleIsSuccessReviewOpened(true))).toEqual({
      ...state,
      isSuccessReviewOpened: true,
    });
  });
  it('should update isAddOpened by toggleIsAddOpened', () => {
    expect(processData(state, toggleIsAddOpened(true))).toEqual({
      ...state,
      isAddOpened: true,
    });
  });

  it('should update isDeleteOpened by toggleIsCartDeleteOpen', () => {
    expect(processData(state, toggleIsDeleteOpened(true))).toEqual({
      ...state,
      isDeleteOpened: true,
    });
  });

  it('should update isSuccessCartOpened by toggleIsCartSuccessOpen', () => {
    expect(processData(state, toggleIsSuccessCartOpened(true))).toEqual({
      ...state,
      isSuccessCartOpened: true,
    });
  });
});
