import { render, screen } from '@testing-library/react';
import { HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {fakeComments, fakeProduct} from '../../mocks';
import ProductCard from './product-card';
import {Product} from '../../types/guitar';


const RATING = 3;
const NAME = 'name';
const ID = 5;
const PRICE = 100;
const COUNT = fakeComments.length.toString();

const product: Product = {
  ...fakeProduct,
  rating: RATING,
  name: NAME,
  price: PRICE,
  id: ID,
};

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <ProductCard guitar={product}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(NAME)).toBeInTheDocument();
    expect(screen.getByText(COUNT)).toBeInTheDocument();
    expect(screen.getByTestId('more')).toBeInTheDocument();
  });
});
