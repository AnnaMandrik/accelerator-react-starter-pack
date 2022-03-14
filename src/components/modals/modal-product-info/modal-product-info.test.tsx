import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { customRenderWithProvider } from '../../../render-test';
import { GuitarsType } from '../../../const';
import { MakeFakeGuitar, MockMainData, MockUserData } from '../../../mocks';
import ModalProductInfo from './modal-product-info';


const fakeCurrentProduct = MakeFakeGuitar();
const mockStore = configureMockStore();
const componentState = {
  MainData: { ...MockMainData, temporaryProductsInCart: fakeCurrentProduct },
  UserData: MockUserData,
};
const store = mockStore(componentState);
const fakeProductType = GuitarsType.get(fakeCurrentProduct.type)?.type;

describe('Component: ModalInfo', () => {
  it('should render & swich correctly', () => {
    customRenderWithProvider(<ModalProductInfo />, store);
    expect(screen.getByAltText(`${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Гитара ${fakeCurrentProduct.name}`)).toBeInTheDocument();
    expect(screen.getByText(`Артикул: ${fakeCurrentProduct.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeProductType}, ${fakeCurrentProduct.stringCount} струнная`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCurrentProduct.price} ₽`)).toBeInTheDocument();
  });
});

