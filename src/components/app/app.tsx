import { Navigate, Route, Routes } from 'react-router-dom';
import {AppRoute} from '../../const';
import CartPage from '../cart-page/cart-page';
import CatalogPage from '../catalog-page/catalog-page';
import ErrorPage from '../error-page/error-page';
import MainLayout from '../main-layout/main-layout';
import ProductPage from '../product-page/product-page';
import StubPage from '../stub-page/stub-page';

function App(): JSX.Element {

  return (
    <Routes>
      <Route path = {AppRoute.Main} element={<MainLayout />}>
        <Route index element={<Navigate to={AppRoute.Page} replace />} />
        <Route path={AppRoute.Catalog} element={<CatalogPage />} />
        <Route path={AppRoute.Product} element={<ProductPage />} />
        <Route path={AppRoute.About} element={<StubPage />} />
        <Route path={AppRoute.Where} element={<StubPage />} />
        <Route path={AppRoute.Cart} element={<CartPage />} />
        <Route path={AppRoute.Stub} element={<StubPage />} />
        <Route path={AppRoute.Error} element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
