import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalButtonCross from './modal-button-cross';

const onClick = jest.fn();


describe('Component: ModalCloseBtn', () => {
  it('should render correctly', () => {
    render(<ModalButtonCross onClick ={onClick}/>);
    expect(screen.getByTestId('modalCloseBtn')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('modalCloseBtn'));
    expect(onClick).toBeCalled();
  });
});
