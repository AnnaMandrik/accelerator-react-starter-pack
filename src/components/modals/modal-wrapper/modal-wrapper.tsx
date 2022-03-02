import { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { isEscEvent } from '../../../utils';
import { closeAllModals } from '../../../store/action';


type ModalWrapperProps = {
  modalType: string;
  children: ReactElement;
};

function ModalWrapper({modalType, children}: ModalWrapperProps): JSX.Element {
  const dispatch = useDispatch();

  const handleEscKeyDown = (evt: KeyboardEvent) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      dispatch(closeAllModals());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKeyDown);
    return () => {
      document.removeEventListener('keydown', handleEscKeyDown);
    };
  });

  return (
    <RemoveScroll>
      <FocusLock>
        <div className={`modal is-active ${modalType}`}>
          <div className="modal__wrapper">
            <div className="modal__overlay"
              data-close-modal
              onClick={() => dispatch(closeAllModals())}
            >
            </div>
            {children}
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}

export default ModalWrapper;
