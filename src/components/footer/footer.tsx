import {Link, useMatch} from 'react-router-dom';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useDispatch } from 'react-redux';
import {socialsNets} from '../../const';
import {AppRoute} from '../../const';
import { increaseCommentsCounter } from '../../store/action';

function Footer(): JSX.Element {
  const dispatch = useDispatch();
  const isProductPage = useMatch(AppRoute.Product);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (!inView || !isProductPage) {
      return;
    }
    dispatch(increaseCommentsCounter());
  }, [dispatch, inView, isProductPage]);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__container container">
        <Link className="footer__logo logo" to={AppRoute.Main}>
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип" />
        </Link>
        <div className="socials footer__socials">
          <ul className="socials__list">
            {
              socialsNets.map((net) => {
                const key = `${net.ariaLabel}`;

                return (
                  <li key={key} className="socials-item">
                    <a className="socials__link" href={net.href} aria-label={net.ariaLabel}>
                      <svg className="socials__icon" width="24" height="24" aria-hidden="true">
                        <use xlinkHref={net.xlinkHref}></use>
                      </svg>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </div>
        <section className="footer__nav-section footer__nav-section--info">
          <h2 className="footer__nav-title">О нас</h2>
          <p className="footer__nav-content footer__nav-content--font-secondary">Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!</p>
        </section>
        <section className='footer__nav-section footer__nav-section--links'>
          <h2 className='footer__nav-title'>Информация</h2>
          <ul className='footer__nav-list'>
            <li className='footer__nav-list-item'>
              <Link className='link' to={`/${AppRoute.Where}`}>
                Где купить?
              </Link>
            </li>
            <li className='footer__nav-list-item'>
              <Link className='link' to={AppRoute.Stub}>
                Блог
              </Link>
            </li>
            <li className='footer__nav-list-item'>
              <Link className='link' to={AppRoute.Stub}>
                Вопрос - ответ
              </Link>
            </li>
            <li className='footer__nav-list-item'>
              <Link className='link' to={AppRoute.Stub}>
                Возврат
              </Link>
            </li>
            <li className='footer__nav-list-item'>
              <Link className='link' to={AppRoute.Stub}>
                Сервис-центры
              </Link>
            </li>
          </ul>
        </section>
        <section className="footer__nav-section footer__nav-section--contacts">
          <h2 className="footer__nav-title">Контакты</h2>
          <p className="footer__nav-content">г. Санкт-Петербург,<br/> м. Невский проспект, <br/>ул. Казанская 6.</p>
          <div className="footer__nav-content">
            <svg className="footer__icon" width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-phone"></use>
            </svg><a className="link" href="tel:88125005050"> 8-812-500-50-50</a>
          </div>
          <p className="footer__nav-content">Режим работы:<br/>
            <span className="footer__span">
              <svg className="footer__icon" width="13" height="13" aria-hidden="true">
                <use xlinkHref="#icon-clock"></use>
              </svg>
              <span> с 11:00 до 20:00</span>
              <span>без выходных</span>
            </span>
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
