import { useDispatch } from 'react-redux';
import { addTemporaryProductsInCart, toggleIsAddOpened } from '../../../store/action';
import { Product } from '../../../types/guitar';

type ProductCardButtonToCartProps = {
  product: Product;
};
function ProductCardButtonToCart({ product }: ProductCardButtonToCartProps): JSX.Element {
  const { comments, ...guitar } = product;
  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    dispatch(addTemporaryProductsInCart(guitar));
    dispatch(toggleIsAddOpened(true));
  };

  return (
    <button
      onClick={handleAddToCartClick}
      className='button button--red button--mini button--add-to-cart'
    >
      Купить
    </button>
  );
}

export default ProductCardButtonToCart;
