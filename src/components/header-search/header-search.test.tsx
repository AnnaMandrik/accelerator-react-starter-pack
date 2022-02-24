import { screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HeaderSearch from './header-search';
import * as Redux from 'react-redux';
import { customRenderWithProvider } from '../../render-test';
import { MockUserData, TestReg } from '../../mocks';


const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const componentState = {
  MainData: {},
  UserData: MockUserData,
};

describe('Component: HeaderSearch', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(componentState);
    customRenderWithProvider(<HeaderSearch />, store);
    expect(screen.getByPlaceholderText(TestReg.SearchPlaceholder)).toBeInTheDocument();
    expect(screen.getByLabelText(TestReg.SearchLabel)).toBeInTheDocument();
    expect(screen.getByRole('list', { hidden: true })).toBeInTheDocument();
  });
});
