import {Link} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AppRoute} from '../../const';

function ErrorPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">404 страница не найдена</h1>
          <Link className="breadcrumbs__item" to={AppRoute.Main}><p>Вернуться в каталог</p></Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ErrorPage;


