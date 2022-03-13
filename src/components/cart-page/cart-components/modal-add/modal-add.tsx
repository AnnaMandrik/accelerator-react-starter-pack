import { useDispatch, useSelector } from 'react-redux';
import { addInCart, clearTemporaryProductsInCart, toggleIsAddOpened, toggleIsSuccessCartOpened } from '../../../../store/action';
import { getTemporaryProductsInCart } from '../../../../store/main-data/selectors';
import { getIsAddOpened } from '../../../../store/process-data/selectors';
import ModalButtonCross from '../../../modals/modal-button-cross/modal-button-cross';
import ModalProductInfo from '../../../modals/modal-product-info/modal-product-info';
import ModalWrapper from '../../../modals/modal-wrapper/modal-wrapper';


function ModalAdd(): JSX.Element | null {
  const isOpen = useSelector(getIsAddOpened);
  const { id } = useSelector(getTemporaryProductsInCart);
  const dispatch = useDispatch();

  const handleCloseButtonClick = () => {
    dispatch(clearTemporaryProductsInCart());
    dispatch(toggleIsAddOpened(false));
  };

  const handleAddButtonClick = () => {
    dispatch(addInCart(id));
    dispatch(clearTemporaryProductsInCart());
    dispatch(toggleIsAddOpened(false));
    dispatch(toggleIsSuccessCartOpened(true));
  };


  if (!isOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType={''} >
      <div className="modal__content">
        <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
        <ModalProductInfo />
        <div className="modal__button-container">
          <button className="button button--red button--big modal__button modal__button--add"
            onClick={handleAddButtonClick}
          >
            Добавить в корзину
          </button>
        </div>
        <ModalButtonCross onClick={handleCloseButtonClick} />
      </div>
    </ModalWrapper>
  );
}

export default ModalAdd;
