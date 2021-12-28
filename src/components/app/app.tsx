import { Route, Router as BrowserRouter, Switch } from 'react-router';
import {useSelector} from 'react-redux';
import { AppRoute } from '../../const';
import CatalogPage from '../catalog-page/catalog-page';
import ErrorPage from '../error-page/error-page';
import Spinner from '../spinner/spinner';
import browserHistory from '../../browser-history';
import {getIsLoaded} from '../../store/main-data/selectors';

function App(): JSX.Element {

  const isLoaded = useSelector(getIsLoaded);

  if (!isLoaded) {
    return <Spinner/>;
  }

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
