import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import ReviewsWrapper from './product-components/reviews-wrapper/reviews-wrapper';
import ProductInfo from './product-components/product-info/product-info';
import { getCurrentProduct } from '../../store/main-data/selectors';
import { fetchCurrentProductAction } from '../../store/api-actions';
import { clearCurrentComments, clearCurrentProduct } from '../../store/action';
import Spinner from '../spinner/spinner';


function ProductPage(): JSX.Element {
  const currentProduct = useSelector(getCurrentProduct);
  const {id} = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentProductAction(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
      dispatch(clearCurrentComments());
    };
  }, [dispatch, id]);

  if (!currentProduct.id) {
    return <Spinner />;
  }


  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">{currentProduct.name}</h1>
      <Breadcrumbs />
      <ProductInfo currentProduct={currentProduct} />
      <ReviewsWrapper />
    </div>
  );
}

export default ProductPage;
