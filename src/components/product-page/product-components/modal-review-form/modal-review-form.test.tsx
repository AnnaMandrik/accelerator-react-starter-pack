import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import ModalReviewForm from './modal-review-form';
import {MockUserData, MockMainData, MockProcessData, MakeFakeGuitar} from '../../../../mocks';
import { RATING_NUMBERS } from '../../../../const';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { customRenderWithProvider } from '../../../../render-test';
import { TestReg } from '../../../../mocks';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...MakeFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  MainData: { ...MockMainData, currentProduct: fakeProduct },
  UserData: MockUserData,
  ProcessData: MockProcessData,
};

const TEXT = 'text';

describe('Component: ModalReviewForm', () => {
  it('should render correctly', () => {
    const store = mockStore({ ...componentState, ProcessData: { isReviewFormOpened: true } });
    customRenderWithProvider(<ModalReviewForm />, store);
    expect(screen.getByText(TestReg.SubmitBtn)).toBeInTheDocument();
    expect(screen.getByTestId('modalCloseBtn')).toBeInTheDocument();
    expect(screen.getByTestId('userName')).toBeInTheDocument();
    expect(screen.getAllByTestId('star').length).toEqual(
      RATING_NUMBERS.length);
    expect(screen.getByTestId('adv')).toBeInTheDocument();
    expect(screen.getByTestId('disadv')).toBeInTheDocument();
    expect(screen.getByTestId('comment')).toBeInTheDocument();
    expect(screen.getAllByText(TestReg.ValidErrorText).length).toEqual(4);
    screen
      .getAllByText(TestReg.ValidErrorText)
      .forEach((element) => expect(element).not.toBeVisible());
    expect(screen.queryByText(TestReg.ValidErrorStar)).not.toBeVisible();
  });

  it('should submit correctly', async () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({ ...componentState, ProcessData: { isReviewFormOpened: true } });

    customRenderWithProvider(<ModalReviewForm />, store);

    fireEvent.submit(screen.getByTestId('submit'));

    await waitFor(() =>
      screen
        .getAllByText(TestReg.ValidErrorText)
        .forEach((element) => expect(element).toBeVisible()));
    await waitFor(() =>
      expect(screen.queryByText(TestReg.ValidErrorStar)).toBeVisible());

    userEvent.type(screen.getByTestId('userName'), TEXT);

    userEvent.type(screen.getByTestId('adv'), TEXT);

    userEvent.type(screen.getByTestId('disadv'), TEXT);

    userEvent.type(screen.getByTestId('comment'), TEXT);

    expect(screen.getAllByTestId('star')[2]).not.toBeChecked();

    userEvent.click(screen.getAllByTestId('star')[2]);

    expect(screen.getAllByTestId('star')[2]).toBeChecked();
    expect(screen.getByTestId('userName')).toHaveValue(TEXT);
    expect(screen.getByTestId('adv')).toHaveValue(TEXT);
    expect(screen.getByTestId('disadv')).toHaveValue(TEXT);
    expect(screen.getByTestId('comment')).toHaveValue(TEXT);

    fireEvent.submit(screen.getByTestId('submit'));

  });

  it('should not render if isReviewFormOpen false', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalReviewForm />, store);
    expect(screen.queryByText(TestReg.SubmitBtn)).not.toBeInTheDocument();
    expect(screen.queryByTestId('modalCloseBtn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('userName')).not.toBeInTheDocument();
  });
});
