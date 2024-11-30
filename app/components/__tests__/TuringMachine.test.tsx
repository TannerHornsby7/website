import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import TuringMachine from '../TuringMachine';

jest.useFakeTimers();

describe('TuringMachine Component', () => {
  const mockInitialCode = 'state0 0 1 R state1';

  it('renders with initial state', () => {
    render(<TuringMachine initialCode={mockInitialCode} />);
    expect(screen.getByText('Run')).toBeInTheDocument();
    expect(screen.getByText('Step')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(mockInitialCode);
  });

  it('executes single step correctly', () => {
    render(<TuringMachine initialCode={mockInitialCode} />);
    const stepButton = screen.getByText('Step');
    fireEvent.click(stepButton);
    
    // Check if tape was updated
    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('1');
  });

  it('handles continuous execution', () => {
    render(<TuringMachine initialCode={mockInitialCode} />);
    const runButton = screen.getByText('Run');
    fireEvent.click(runButton);
    
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('updates speed control', () => {
    render(<TuringMachine initialCode={mockInitialCode} />);
    const speedControl = screen.getByRole('slider');
    fireEvent.change(speedControl, { target: { value: '200' } });
    expect(speedControl).toHaveValue('200');
  });
}); 