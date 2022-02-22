import { render, screen } from '@testing-library/react';
import { HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Footer from './footer';
import {FOOTER_NAV} from '../../const';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );

    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();

    FOOTER_NAV.map((nav) => expect(screen.getByRole('link', {name: nav})).toBeInTheDocument());
  });
});
