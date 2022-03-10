import { render, screen } from '@testing-library/react';
import { MakeFakeComment } from '../../../../mocks';
import ReviewProduct from './review-product';


const fakeComment = {...MakeFakeComment(),
  userName: 'user',
  rating: 4,
  advantage: 'advantage',
  disadvantage: 'disadvantage',
  comment: 'comment',
};

describe('Component: ProductReview', () => {
  it('should render correctly', () => {
    render(<ReviewProduct review={fakeComment}/>);
    expect(screen.getByText(`${fakeComment.userName}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.advantage}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.disadvantage}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeComment.comment}`)).toBeInTheDocument();
  });
});
