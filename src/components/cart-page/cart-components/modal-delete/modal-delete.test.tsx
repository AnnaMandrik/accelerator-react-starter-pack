import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MakeFakeGuitar, MockMainData, MockProcessData, MockUserData, TestReg } from '../../../../mocks';
import ModalDelete from './modal-delete';
import { customRenderWithProvider } from '../../../../render-test';
import { clearTemporaryProductsInCart, deleteFromCart, deleteProductsFromCart, toggleIsDeleteOpened } from '../../../../store/action';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...MakeFakeGuitar(), id: 1, name: NAME };
const mockStore = configureMockStore();
const componentState = {
  MainData: { ...MockMainData, temporaryProductsInCart: fakeProduct },
  UserData: MockUserData,
  ProcessData: { ...MockProcessData, isDeleteOpened: true},
};

describe('Component: ModalCartDelete', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, ProcessData: {isDeleteOpened: false}});
    customRenderWithProvider(<ModalDelete />, store);
    expect(screen.queryByText(TestReg.CartDeleteRemove)).not.toBeInTheDocument();
    expect(screen.queryByAltText(`${fakeProduct.name}`)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalDelete />, store);
    expect(screen.getByText(TestReg.CartDeleteTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartDeleteRemove)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartResume)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
  it('should dispatch correctly if click on DeleteBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalDelete />, store);
    userEvent.click(screen.getByText(TestReg.CartDeleteRemove));
    expect(dispatch).toBeCalledTimes(4);
    expect(dispatch).toHaveBeenCalledWith(deleteFromCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(deleteProductsFromCart(fakeProduct.id));
    expect(dispatch).toHaveBeenCalledWith(clearTemporaryProductsInCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsDeleteOpened(false));
  });
  it('should dispatch correctly if click  on ResumeBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalDelete />, store);
    userEvent.click(screen.getByText(TestReg.CartResume));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(clearTemporaryProductsInCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsDeleteOpened(false));
  });
  it('should dispatch correctly if click CloseBtn', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalDelete />, store);
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(clearTemporaryProductsInCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsDeleteOpened(false));
  });
});
