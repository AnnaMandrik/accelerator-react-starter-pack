import {render, screen} from '@testing-library/react';
import EmptyCart from './empty-cart';

describe('Component: EmptyCart', () => {
  it('should render correctly', () => {
    render(<EmptyCart />);
    expect(screen.getByText(/Корзина пустая/i)).toBeInTheDocument();
  });
});
