import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {makeFakeGuitar} from '../../mocks';
import ProductCard from './product-card';

const fakeOneGuitar = makeFakeGuitar();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ProductCard guitar={fakeOneGuitar}/>
      </Router>,
    );

    expect(screen.getByText('1500 ₽')).toBeInTheDocument();
    expect(screen.getByTestId('more')).toBeInTheDocument();
  });
});
