import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { customRenderWithProvider } from '../../render-test';
import userEvent from '@testing-library/user-event';
import { fetchFilterUserAction } from '../../store/api-actions';
import { MockMainData, MockUserData, TestReg } from '../../mocks';
import Filter from './filter';


jest.mock('../../store/api-actions');
const fakeFetchFilteredProducts = fetchFilterUserAction as jest.MockedFunction<
  typeof fetchFilterUserAction
>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();
const FAKE_PAGE = 1;

const componentState = {
  MainData: MockMainData,
  UserData: MockUserData,
};

const filterCurrent = {
  types: ['electric', 'ukulele'],
  strings: ['4', '6'],
  minPrice: '',
  maxPrice: '',
};

const currentState = {
  MainData: MockMainData,
  UserData: {...MockUserData, filter: filterCurrent},
};


describe('Component: Filter', () => {
  afterEach(cleanup);
  it('should render correctly with all  strings unchecked', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<Filter page = {FAKE_PAGE}/>, store);
    expect(screen.getByTestId('4-strings')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('6-strings')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('7-strings')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('12-strings')).not.toHaveAttribute('checked');
    expect(screen.getByText(TestReg.StringFour)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringSix)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringSeven)).toBeInTheDocument();
    expect(screen.getByText(TestReg.StringTwelve)).toBeInTheDocument();
  });

  it('should render correctly with all types unchecked', () => {
    const store = mockStore(componentState);
    customRenderWithProvider(<Filter page={FAKE_PAGE}/>, store);
    expect(screen.getByTestId('acoustic')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('ukulele')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('electric')).not.toHaveAttribute('checked');
    expect(screen.getByText(TestReg.Acoustic)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Electric)).toBeInTheDocument();
    expect(screen.getByText(TestReg.Ukulele)).toBeInTheDocument();
  });

  it('should render correctly with 4 & 6 checked and 12 disabled', () => {
    const store = mockStore(currentState);
    customRenderWithProvider(<Filter page = {FAKE_PAGE}/>, store);
    expect(screen.getByTestId('4-strings')).toHaveAttribute('checked');
    expect(screen.getByTestId('6-strings')).toHaveAttribute('checked');
    expect(screen.getByTestId('12-strings')).toHaveAttribute('disabled');
  });

  it('should render correctly with electric & ukulele checked', () => {
    const store = mockStore(currentState);
    customRenderWithProvider(<Filter page={FAKE_PAGE} />, store);
    expect(screen.getByTestId('acoustic')).not.toHaveAttribute('checked');
    expect(screen.getByTestId('ukulele')).toHaveAttribute('checked');
    expect(screen.getByTestId('electric')).toHaveAttribute('checked');
  });

  it('should dispatch correctly with strings: [4]', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(currentState);
    customRenderWithProvider(<Filter page = {FAKE_PAGE}/>, store);
    expect(screen.getByTestId('6-strings')).toHaveAttribute('checked');
    userEvent.click(screen.getByTestId('6-strings'));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...filterCurrent, strings: ['4']}, FAKE_PAGE);
  });

  it('should dispatch correctly with strings: [4] when only ukulele checked', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore(currentState);
    customRenderWithProvider(<Filter page={FAKE_PAGE} />, store);
    expect(screen.getByTestId('electric')).toHaveAttribute('checked');
    userEvent.click(screen.getByTestId('electric'));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...filterCurrent, types:['ukulele'], strings: ['4']}, FAKE_PAGE);
  });
});
