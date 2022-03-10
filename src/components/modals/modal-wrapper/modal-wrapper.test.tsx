import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalWrapper from './modal-wrapper';
import * as Redux from 'react-redux';
import {ROOT} from '../../../mocks';
import { closeAllModals } from '../../../store/action';

const dispatch = jest.fn();
const useDispatch = jest.spyOn(Redux, 'useDispatch');
const CLASS = 'class-modal';

describe('Component: ModalWrapper', () => {
  it('should render correctly', () => {
    useDispatch.mockReturnValue(dispatch);
    render(
      <ModalWrapper modalType={CLASS}>
        <p>{ROOT}</p>
      </ModalWrapper>);
    expect(screen.getByTestId('modalWrap')).toHaveClass(CLASS);
    expect(screen.getByTestId('modalOverlay')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('modalOverlay'));
    fireEvent.keyDown(screen.getByTestId('modalWrap'), {key:'Esc'});
    expect(dispatch).toBeCalledWith(closeAllModals());
    expect(dispatch).toBeCalledTimes(2);
  });
});
