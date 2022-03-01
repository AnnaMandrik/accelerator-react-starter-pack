import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCommentsCounter, increaseCommentsCounter } from '../../../../store/action';
import { getCommentsCounter, getCurrentComments } from '../../../../store/main-data/selectors';
import ReviewProduct from '../review-product/review-product';

function ReviewsWrapper(): JSX.Element {
  const currentComments = useSelector(getCurrentComments);
  const commentsCounter = useSelector(getCommentsCounter);
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(clearCommentsCounter());
  }, [dispatch]);


  return (
    <section className="reviews">
      <h3 className='reviews__title title title--bigger'> {currentComments.length===0 ? 'Отзывов ещё нет' : 'Отзывы'}</h3>
      <a className="button button--red-border button--big reviews__sumbit-button" href='todo'>Оставить отзыв</a>

      {currentComments.slice(0, commentsCounter).map((comment) => (
        <ReviewProduct key={comment.id} review={comment} />
      ))}
      {commentsCounter < currentComments.length && (
        <button className="button button--medium reviews__more-button"
          onClick={() => dispatch(increaseCommentsCounter())}
        >
        Показать еще отзывы
        </button>
      )}
      {currentComments.length!==0 &&
    (
      <a className="button button--up button--red-border button--big reviews__up-button"
        style={{zIndex: 1000}}
        href="#header"
        onClick={(evt) => {
          evt.preventDefault();
          window.scrollTo(0, 0);
        }}
      >
        Наверх
      </a>
    )}
    </section>
  );
}

export default ReviewsWrapper;
