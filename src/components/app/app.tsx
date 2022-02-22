import { Route, Routes} from 'react-router';
import {AppRoute} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import ErrorPage from '../error-page/error-page';
import StubPage from '../stub-page/stub-page';

function App(): JSX.Element {

  return (
    <Routes>
      <Route path={AppRoute.Main} element={ <CatalogPage />} >
        <Route path={AppRoute.Page} element={<CatalogPage />} />
        <Route path={AppRoute.Product} element={<StubPage />} />
        <Route path={AppRoute.About} element={<StubPage />} />
        <Route path={AppRoute.Where} element={<StubPage />} />
        <Route path={AppRoute.Cart} element={<StubPage />} />
        <Route path={AppRoute.Stub} element={<StubPage />} />
        <Route path={AppRoute.Error} element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
