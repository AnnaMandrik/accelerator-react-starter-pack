import { RemoveScroll } from 'react-remove-scroll';
import { Outlet } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';

function MainLayout(): JSX.Element {

  return (
    <div className={`wrapper ${RemoveScroll.classNames.fullWidth}`}>
      <Header />
      <main className='page-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
