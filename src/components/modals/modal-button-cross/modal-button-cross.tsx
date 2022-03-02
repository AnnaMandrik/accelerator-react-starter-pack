type ModalButtonCrossProps = {
  onClick: () => void;
};

function ModalButtonCross({onClick}: ModalButtonCrossProps) {
  return (
    <button
      className='modal__close-btn button-cross'
      type='button'
      aria-label='Закрыть'
      onClick={onClick}
    >
      <span className='button-cross__icon'></span>
      <span className='modal__close-btn-interactive-area'></span>
    </button>
  );
}

export default ModalButtonCross;
