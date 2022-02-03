import {Link} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import {AppRoute} from '../../const';

function StubPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Страница находится в разработке!</h1>
          <p className="page-content__title title">Приносим извинения за неудобство!</p>
          <Link className="breadcrumbs__item"
            to={AppRoute.Main} data-testid="go-back"
            style={{fontWeight: 'bold', color: '#c90606', textDecoration: 'underline'}}
          >
            <p>Вернуться в каталог</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StubPage;
