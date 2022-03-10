import { customRenderWithProvider} from '../../../../render-test';
import { screen } from '@testing-library/react';
import { MakeFakeGuitar, fakeComments, MockMainData, MockUserData, TestReg } from '../../../../mocks';
import ProductInfo from './product-info';
import { configureMockStore } from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';


const fakeCurrentProduct = MakeFakeGuitar();
const mockStore = configureMockStore();
const componentState = {
  MainData: {...MockMainData, currentComments: fakeComments},
  MainUser: MockUserData,
};
const store = mockStore(componentState);

describe('Component: ProductInfo', () => {
  it('should render & swich correctly', () => {
    customRenderWithProvider(<ProductInfo currentProduct = {fakeCurrentProduct}/>, store);
    expect(screen.getByText('Характеристики')).toBeInTheDocument();
    expect(screen.getByText('Описание')).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeCurrentProduct.description}`)).not.toBeInTheDocument();
    userEvent.click(screen.getByText('Описание'));
    expect(screen.getByText(`${fakeCurrentProduct.description}`)).toBeInTheDocument();
    expect(screen.queryByText(`${fakeCurrentProduct.vendorCode}`)).not.toBeInTheDocument();
    expect(screen.getByText(TestReg.AddCartBtn)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Price)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.price} ₽`)).toBeInTheDocument();
  });
});
