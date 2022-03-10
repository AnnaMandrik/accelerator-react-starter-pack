import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toggleIsReviewFormOpened } from '../../../../store/action';
import { getCurrentProduct } from '../../../../store/main-data/selectors';
import { getIsReviewFormOpened } from '../../../../store/process-data/selectors';
import { CommentData } from '../../../../types/comment';
import React, { useEffect } from 'react';
import { ModalType, RATING_NUMBERS, StarTitle } from '../../../../const';
import { postCommentAction } from '../../../../store/api-actions';
import ModalButtonCross from '../../../modals/modal-button-cross/modal-button-cross';
import ModalWrapper from '../../../modals/modal-wrapper/modal-wrapper';
import './modal-review.css';


function ModalReviewForm(): JSX.Element | null {
  const dispatch = useDispatch();
  const isReviewFormOpen = useSelector(getIsReviewFormOpened);
  const {name, id} = useSelector(getCurrentProduct);

  const handleFormCloseClick = () => dispatch(toggleIsReviewFormOpened(false));

  const {register, formState: {errors}, handleSubmit, reset} = useForm<CommentData>({
    mode: 'onBlur',
    defaultValues: {
      userName: '',
      advantage: '',
      disadvantage: '',
      comment: '',
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<CommentData> = (comment) => {
    dispatch(
      postCommentAction({
        ...comment,
        guitarId: id,
        rating: Number(comment.rating),
      }),
    );};

  useEffect(() => {
    if (!isReviewFormOpen) {
      reset();
    }
  }, [isReviewFormOpen, reset]);

  if (!isReviewFormOpen) {
    return null;
  }


  return (
    <ModalWrapper modalType={ModalType.Review}>
      <div className="modal__content">
        <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
        <h3 className="modal__product-name title title--medium-20 title--uppercase">{name}</h3>
        <form className="form-review"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-review__wrapper">
            <div className="form-review__name-wrapper">
              <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
              <input className="form-review__input form-review__input--name"
                id="user-name"
                type="text"
                autoComplete="off"
                {...register('userName', {
                  required: true,
                })}
                data-testid = 'userName'
              />
              <span className="form-review__warning"
                style={{ visibility: errors.userName ? 'visible' : 'hidden' }}
              >
                Заполните поле
              </span>
            </div>
            <div>
              <span className="form-review__label form-review__label--required">Ваша Оценка</span>
              <div className="new-rate">
                {RATING_NUMBERS.map((starNumber)=> (
                  <React.Fragment key = {starNumber}>
                    <input
                      className='visually-hidden new-rate_input'
                      style={{order:starNumber}}
                      type='radio'
                      id={`star-${starNumber}`}
                      value = {starNumber}
                      {...register('rating', {
                        required: true,
                        value: starNumber,
                      })}
                      data-testid = 'star'
                    />
                    <label
                      className='new-rate__label'
                      htmlFor={`star-${starNumber}`}
                      title={StarTitle[starNumber]}
                    >
                    </label>
                  </React.Fragment>
                ))}
                <span className="rate__count"></span>
                <span className="rate__message"
                  style={{ visibility: errors.rating ? 'visible' : 'hidden' }}
                >
                  Поставьте оценку
                </span>
              </div>
            </div>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Достоинства
            </label>
            <input
              className='form-review__input form-review__input-other'
              id='pros'
              type='tex'
              autoComplete='off'
              {...register('advantage', {
                required: true,
              })}
              data-testid = 'adv'
            />
            <span className='form-review__warning form-review__other-warning'
              style={{ visibility: errors.advantage ? 'visible' : 'hidden' }}
            >Заполните поле
            </span>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Недостатки
            </label>
            <input
              className='form-review__input form-review__input-other'
              id='user-name'
              type='text'

              autoComplete='off'
              {...register('disadvantage', {
                required: true,
              })}
              data-testid = 'disadv'
            />
            <span className='form-review__warning form-review__other-warning'
              style={{ visibility: errors.disadvantage ? 'visible' : 'hidden' }}
            >Заполните поле
            </span>
          </div>
          <div className='form-review__other-wrapper'>
            <label className='form-review__label form-review__label--required' htmlFor='user-name'>
              Комментарий
            </label>
            <textarea
              className='form-review__input form-review__input--textarea form-review__input-other'
              id='user-name'

              rows={10}
              autoComplete='off'
              {...register('comment', {
                required: true,
              })}
              data-testid = 'comment'
            >
            </textarea>
            <span className='form-review__warning form-review__other-warning'
              style={{ visibility: errors.comment ? 'visible' : 'hidden' }}
            >Заполните поле
            </span>
          </div>
          <button
            className='button button--medium-20 form-review__button'
            type='submit'
            data-testid = 'submit'
          >
            Отправить отзыв
          </button>
        </form>
        <ModalButtonCross onClick={handleFormCloseClick}/>
      </div>
    </ModalWrapper>
  );
}

export default ModalReviewForm;


