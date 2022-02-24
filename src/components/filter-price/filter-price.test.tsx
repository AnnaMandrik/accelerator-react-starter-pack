import { configureMockStore } from '@jedmao/redux-mock-store';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { MockMainData, MockUserData } from '../../mocks';
import { fetchFilterUserAction } from '../../store/api-actions';
import { customRenderWithProvider } from '../../render-test';
import FilterPrice from './filter-price';

const USER_PRICE = '150';
const PRICE_MIN = '100';
const PRICE_MAX = '200';

jest.mock('../../store/api-actions');
const fakeFetchFilteredProducts = fetchFilterUserAction as jest.MockedFunction<
  typeof fetchFilterUserAction
>;
const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');

const mockStore = configureMockStore();

const componentState = {
  MainData: MockMainData,
  UserData: MockUserData,
};
const FAKE_PAGE = 1;

describe('Component: FilterPrice', () => {
  afterEach(cleanup);

  it('should render correctly with placeholders value PRICE_MIN, PRICE_MAX', () => {
    const store = mockStore({...componentState, MainData: {...MockMainData, minDefaultPrice: PRICE_MIN, maxDefaultPrice: PRICE_MAX}});
    customRenderWithProvider(<FilterPrice page={FAKE_PAGE}/>, store);
    expect(screen.getByPlaceholderText(`${PRICE_MIN}`)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`${PRICE_MAX}`)).toBeInTheDocument();
  });

  it('should dispatch correctly & dispatch value < 0', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, MainData: {...MockMainData, minDefaultPrice: PRICE_MIN, maxDefaultPrice: PRICE_MAX}});
    customRenderWithProvider(<FilterPrice page={FAKE_PAGE}/>, store);
    expect(screen.getByTestId('priceMin')).toHaveValue(null);
    expect(screen.getByTestId('priceMax')).toHaveValue(null);
    userEvent.type(screen.getByTestId('priceMin'), '-1');
    fireEvent.focusOut(screen.getByTestId('priceMin'));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...MockUserData.filter, minPrice: PRICE_MIN}, FAKE_PAGE);
    userEvent.type(screen.getByTestId('priceMax'), '-1');
    fireEvent.focusOut(screen.getByTestId('priceMax'));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...MockUserData.filter, maxPrice: PRICE_MIN}, FAKE_PAGE);
  });

  it('should dispatch correctly when user type', () => {
    useDispatch.mockReturnValue(dispatch);
    const store = mockStore({...componentState, MainData: {...MockMainData, minDefaultPrice: PRICE_MIN, maxDefaultPrice: PRICE_MAX}});
    customRenderWithProvider(<FilterPrice page={FAKE_PAGE}/>, store);
    expect(screen.getByTestId('priceMin')).toHaveValue(null);
    expect(screen.getByTestId('priceMax')).toHaveValue(null);
    userEvent.type(screen.getByTestId('priceMax'), USER_PRICE);
    fireEvent.focusOut(screen.getByTestId('priceMax'));
    expect(fakeFetchFilteredProducts).toBeCalledWith({...MockUserData.filter, maxPrice: USER_PRICE}, FAKE_PAGE);
  });
});

