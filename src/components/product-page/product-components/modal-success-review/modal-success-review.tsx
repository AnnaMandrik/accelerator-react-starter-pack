import { useDispatch, useSelector } from 'react-redux';
import { ModalType } from '../../../../const';
import { toggleIsSuccessReviewOpened } from '../../../../store/action';
import { getIsSuccessReviewOpened } from '../../../../store/process-data/selectors';
import ModalButtonCross from '../../../modals/modal-button-cross/modal-button-cross';
import ModalWrapper from '../../../modals/modal-wrapper/modal-wrapper';


function ModalSuccessReview(): JSX.Element | null {
  const dispatch = useDispatch();
  const isSuccessOpen = useSelector(getIsSuccessReviewOpened);

  const handleFormCloseClick = () => dispatch(toggleIsSuccessReviewOpened(false));

  if (!isSuccessOpen) {
    return null;
  }

  return (
    <ModalWrapper modalType={ModalType.Success}>
      <div className="modal__content">
        <svg className="modal__icon" width="26" height="20" aria-hidden="true">
          <use xlinkHref="#icon-success"></use>
        </svg>
        <p className="modal__message">Спасибо за ваш отзыв!</p>
        <div className="modal__button-container modal__button-container--review">
          <button className="button button--small modal__button modal__button--review"
            onClick={handleFormCloseClick}
          >
            К покупкам!
          </button>
        </div>
        <ModalButtonCross onClick={handleFormCloseClick}/>
      </div>
    </ModalWrapper>
  );
}

export default ModalSuccessReview;
