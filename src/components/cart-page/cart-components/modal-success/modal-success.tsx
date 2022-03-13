import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { AppRoute, ModalType } from '../../../../const';
import { toggleIsSuccessCartOpened } from '../../../../store/action';
import { getIsSuccessCartOpened } from '../../../../store/process-data/selectors';
import ModalButtonCross from '../../../modals/modal-button-cross/modal-button-cross';
import ModalWrapper from '../../../modals/modal-wrapper/modal-wrapper';

function ModalSuccess(): JSX.Element | null {
  const isOpen = useSelector(getIsSuccessCartOpened);
  const dispatch = useDispatch();
  const isCatalogPage = useMatch(AppRoute.Catalog);
  const navigate = useNavigate();
  const location = useLocation();

  const navigatePathname = useMemo(() => {
    const state = location.state as { from: string };
    if (state && state.from) {
      return state.from;
    }
    return `/${AppRoute.Page}`;
  }, [location]);

  const handleCloseButtonClick = () => dispatch(toggleIsSuccessCartOpened(false));

  const handleGoCartButtonClick = () => {
    dispatch(toggleIsSuccessCartOpened(false));
    navigate(`/${AppRoute.Cart}`);
  };
  const handleGoCatalogButtonClick = () => {
    dispatch(toggleIsSuccessCartOpened(false));
    if (!isCatalogPage) {
      navigate(`${navigatePathname}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType={ModalType.Success} >
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Товар успешно добавлен в корзину</p>
        <div className="modal__button-container modal__button-container--add">
          <button className="button button--small modal__button"
            onClick={handleGoCartButtonClick}
          >
            Перейти в корзину
          </button>
          <button className="button button--black-border button--small modal__button modal__button--right"
            onClick={handleGoCatalogButtonClick}
          >
            Продолжить покупки
          </button>
        </div>
        <ModalButtonCross onClick={handleCloseButtonClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalSuccess;
