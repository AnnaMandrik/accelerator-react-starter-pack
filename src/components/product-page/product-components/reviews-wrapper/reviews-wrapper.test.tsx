import { configureMockStore } from '@jedmao/redux-mock-store';
import { screen } from '@testing-library/react';
import { START_COMMENTS_COUNT } from '../../../../const';
import {MakeFakeComment, MockUserData, MockMainData, MockProcessData, TestReg} from '../../../../mocks';
import { customRenderWithProvider } from '../../../../render-test';
import ReviewsWrapper from './reviews-wrapper';


const mockStore = configureMockStore();

const fakeComment = MakeFakeComment();
const user = new RegExp('user', 'i');
const NAME = 'user';
const NAME_FIRST = 'user 1';
const NAME_THIRD = 'user 3';
const fakeComments = [
  { ...fakeComment, id: 1, createAt: '2021-10-27T12:32:16.934Z', userName: NAME_THIRD },
  { ...fakeComment, id: 2, createAt: '2021-11-28T12:32:16.934Z', userName: NAME_FIRST  },
  { ...fakeComment, id: 3, createAt: '2021-10-28T13:32:16.934Z', userName: NAME },
  { ...fakeComment, id: 4, createAt: '2021-09-28T13:32:16.934Z', userName: NAME },
];

describe('Component: ReviewsContainer', () => {
  it('should render correctly', () => {
    const componentState = {
      MainData: { ...MockMainData, currentComments: fakeComments },
      UserData: MockUserData,
      ProcessData: MockProcessData,
    };
    const store = mockStore(componentState);
    customRenderWithProvider(<ReviewsWrapper />, store);
    expect(screen.getByText(TestReg.LeaveReviewBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.ScrollBtn)).toBeInTheDocument();
    expect(screen.getByText('Показать еще отзывы')).toBeInTheDocument();
    expect(screen.getAllByText(user).length).toEqual(START_COMMENTS_COUNT);
    expect(screen.getAllByText(user)[0]).toHaveTextContent(NAME_FIRST);
    expect(screen.getAllByText(user)[2]).toHaveTextContent(NAME_THIRD);
  });

  it('should not render ScrollBtn & ShowMoreBtn without comments', () => {
    const componentState = {
      MainData: MockMainData,
      UserData: MockUserData,
      ProcessData: MockProcessData,
    };
    const store = mockStore(componentState);
    customRenderWithProvider(<ReviewsWrapper />, store);
    expect(screen.getByText(TestReg.LeaveReviewBtn)).toBeInTheDocument();
    expect(screen.queryByText(TestReg.ScrollBtn)).not.toBeInTheDocument();
    expect(screen.queryByText('Показать еще отзывы')).not.toBeInTheDocument();
    expect(screen.getByText(TestReg.NoReviews)).toBeInTheDocument();
  });
});
