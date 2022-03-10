import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import ModalSuccessReview from './modal-success-review';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MockMainData, MockProcessData, MockUserData, TestReg } from '../../../../mocks';
import { customRenderWithProvider } from '../../../../render-test';
import { toggleIsSuccessReviewOpened } from '../../../../store/action';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const componentState = {
  MainData: MockMainData,
  UserData: MockUserData,
  ProcessData: MockProcessData,
};

describe('Component: ModalSuccess', () => {
  it('should render correctly', () => {
    const store = mockStore({...componentState, ProcessData: {isSuccessReviewOpened: true}});
    customRenderWithProvider(<ModalSuccessReview />, store);
    expect(screen.getByTestId('modalCloseBtn')).toBeInTheDocument();
  });
  it('should dispatch correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, ProcessData: {isSuccessReviewOpened: true}});
    customRenderWithProvider(<ModalSuccessReview />, store);
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      payload: false,
      type: toggleIsSuccessReviewOpened.type,
    });
  });

  it('should not render if isSuccessOpen: false', () => {
    const store = mockStore({...componentState, APP: {isSuccessOpen: false}});
    customRenderWithProvider(<ModalSuccessReview />, store);
    expect(screen.queryByText(TestReg.SuccessBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId('modalCloseBtn')).not.toBeInTheDocument();
  });
});
