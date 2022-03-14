import { screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fakeProducts, MockMainData, MockUserData, TestReg} from '../../mocks';
import ProductCardsList from './product-cards-list';
import { customRenderWithProvider } from '../../render-test';


const mockStore = configureMockStore();
const componentState = {
  MainData: {...MockMainData, productsList: fakeProducts, isDataLoaded: true},
  UserData: MockUserData,
};
const store = mockStore(componentState);

describe('Component: ProductCardsList', () => {
  it('should render all product cards correctly', () => {
    customRenderWithProvider(<ProductCardsList />, store);
    expect(screen.queryAllByText(TestReg.AboutProduct).length).toEqual(9);
  });
});
