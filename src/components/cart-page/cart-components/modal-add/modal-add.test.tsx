import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MakeFakeGuitar, MockMainData, MockProcessData, MockUserData, TestReg } from '../../../../mocks';
import ModalAdd from './modal-add';
import { customRenderWithProvider } from '../../../../render-test';
import { clearTemporaryProductsInCart, toggleIsAddOpened} from '../../../../store/action';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const NAME = 'name';
const fakeProduct = { ...MakeFakeGuitar(), id: 1, name: NAME };

const mockStore = configureMockStore();
const componentState = {
  MainData: { ...MockMainData, temporaryProductsInCart: fakeProduct },
  UserData: MockUserData,
  ProcessData: { ...MockProcessData,  isAddOpened: true},
};

describe('Component: ModalAdd', () => {
  afterAll(cleanup);
  it('should not render', () => {
    const store = mockStore({...componentState, ProcessData: {isAddOpened: false}});
    customRenderWithProvider(<ModalAdd/>, store);
    expect(screen.queryByText(TestReg.CartAddBtn)).not.toBeInTheDocument();
    expect(screen.queryByAltText(`${fakeProduct.name}`)).not.toBeInTheDocument();
  });
  it('should render correctly', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalAdd />, store);
    expect(screen.getByText(TestReg.CartAddTitle)).toBeInTheDocument();
    expect(screen.getByText(TestReg.CartAddBtn)).toBeInTheDocument();
    expect(screen.getByAltText(`${fakeProduct.name}`)).toBeInTheDocument();
  });

  it('should dispatch correctly if click close', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<ModalAdd />, store);
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(dispatch).toBeCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(clearTemporaryProductsInCart());
    expect(dispatch).toHaveBeenCalledWith(toggleIsAddOpened(false));
  });
});
