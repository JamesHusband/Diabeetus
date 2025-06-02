import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chatbot } from './Chatbot';

describe('Chatbot', () => {
  it('renders successfully', () => {
    render(<Chatbot />);
    expect(screen.getByText('Chatbot')).toBeInTheDocument();
    expect(
      screen.getByText('Chatbot interface will be implemented here')
    ).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Chatbot className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});
