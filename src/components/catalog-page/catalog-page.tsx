import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogWrapper from '../catalog-wrapper/catalog-wrapper';

function CatalogPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a></li>
            <li className="breadcrumbs__item"><a className="link">Каталог</a></li>
          </ul>
          < CatalogWrapper />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CatalogPage;
