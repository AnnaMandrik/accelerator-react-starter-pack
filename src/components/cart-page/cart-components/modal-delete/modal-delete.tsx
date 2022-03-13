import { useDispatch, useSelector } from 'react-redux';
import { clearTemporaryProductsInCart, deleteFromCart, deleteProductsFromCart, toggleIsDeleteOpened } from '../../../../store/action';
import { getTemporaryProductsInCart } from '../../../../store/main-data/selectors';
import { getIsDeleteOpened } from '../../../../store/process-data/selectors';
import ModalButtonCross from '../../../modals/modal-button-cross/modal-button-cross';
import ModalProductInfo from '../../../modals/modal-product-info/modal-product-info';
import ModalWrapper from '../../../modals/modal-wrapper/modal-wrapper';


function ModalDelete(): JSX.Element | null {
  const isOpen = useSelector(getIsDeleteOpened);
  const { id } = useSelector(getTemporaryProductsInCart);
  const dispatch = useDispatch();

  const handleCloseButtonClick = () => {
    dispatch(clearTemporaryProductsInCart());
    dispatch(toggleIsDeleteOpened(false));
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteFromCart(id));
    dispatch(deleteProductsFromCart(id));
    dispatch(clearTemporaryProductsInCart());
    dispatch(toggleIsDeleteOpened(false));
  };


  if (!isOpen) {
    return null;
  }


  return (
    <ModalWrapper modalType={''} >
      <div className="modal__content">
        <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
        <ModalProductInfo />
        <div className="modal__button-container">
          <button className="button button--small modal__button"
            onClick={handleDeleteButtonClick}
          >
            Удалить товар
          </button>
          <button className="button button--black-border button--small modal__button modal__button--right"
            onClick={handleCloseButtonClick}
          >
            Продолжить покупки
          </button>
        </div>
        <ModalButtonCross onClick={handleCloseButtonClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalDelete;
