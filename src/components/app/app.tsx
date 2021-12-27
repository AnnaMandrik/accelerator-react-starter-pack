import { Route, Router as BrowserRouter, Switch } from 'react-router';
import { AppRoute } from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import ErrorPage from '../error-page/error-page';
import browserHistory from '../../browser-history';

function App(): JSX.Element {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <CatalogPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
