import {Route, Switch} from 'react-router';
import {AppRoute, DEFAULT_PAGE} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import ErrorPage from '../error-page/error-page';
import StubPage from '../stub-page/stub-page';

function App(): JSX.Element {

  return (
    <Switch>
      <Route exact path={AppRoute.Main}>
        <CatalogPage actualPage={DEFAULT_PAGE} />
      </Route>
      <Route exact path={AppRoute.Page}
        render={(routerProps) => {
          const page = parseInt(routerProps?.match?.params.page.replace('page_', '') as string, 10);
          return <CatalogPage actualPage={page} />;
        }}
      >
      </Route>
      <Route exact path={AppRoute.Stub}>
        <StubPage />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default App;
