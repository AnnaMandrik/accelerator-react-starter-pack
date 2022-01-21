import { Route, Switch } from 'react-router';
import {useSelector} from 'react-redux';
import {AppRoute, DEFAULT_PAGE} from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import ErrorPage from '../error-page/error-page';
import Spinner from '../spinner/spinner';
import {getIsLoaded} from '../../store/main-data/selectors';

function App(): JSX.Element {

  const isLoaded = useSelector(getIsLoaded);

  if (!isLoaded) {
    return <Spinner/>;
  }

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
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  );
}

export default App;
