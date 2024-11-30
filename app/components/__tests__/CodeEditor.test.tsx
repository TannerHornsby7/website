import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CodeEditor from '../CodeEditor';

describe('CodeEditor Component', () => {
  const mockProps = {
    code: '<div>Test</div>',
    language: 'html-css',
    description: 'Test description'
  };

  it('renders with initial props', () => {
    render(<CodeEditor {...mockProps} />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue(mockProps.code);
  });

  it('updates textarea value on change', () => {
    render(<CodeEditor {...mockProps} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'new code' } });
    expect(textarea).toHaveValue('new code');
  });

  it('executes HTML/CSS code when run button is clicked', () => {
    render(<CodeEditor {...mockProps} />);
    fireEvent.click(screen.getByText('Run Code'));
    expect(screen.getByRole('iframe')).toBeInTheDocument();
  });

  it('handles JavaScript code execution', () => {
    render(<CodeEditor {...mockProps} language="javascript" />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'return "test result"' } });
    fireEvent.click(screen.getByText('Run Code'));
    expect(screen.getByText('test result')).toBeInTheDocument();
  });

  it('handles JavaScript execution errors', () => {
    render(<CodeEditor {...mockProps} language="javascript" />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'invalid code' } });
    fireEvent.click(screen.getByText('Run Code'));
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });
}); 