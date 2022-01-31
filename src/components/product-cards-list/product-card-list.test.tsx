import { render } from '@testing-library/react';
import { Router} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ProductCardsList from './product-cards-list';
import {makeFakeGuitars} from '../../mocks';

const history = createMemoryHistory();
const fakeGuitars = makeFakeGuitars();

describe('Component: ProductCardsList', () => {
  it('should render correctly', () => {
    const {container} = render(
      <Router history={history}>
        <ProductCardsList productsList={fakeGuitars}/>
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
