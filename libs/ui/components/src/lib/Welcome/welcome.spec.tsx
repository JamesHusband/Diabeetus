import { render, screen } from '@testing-library/react';
import { Welcome } from './welcome';

describe('Welcome', () => {
  it('should render successfully with project name', () => {
    render(<Welcome project="Test Project" />);

    expect(screen.getByRole('heading')).toBeTruthy();
    expect(screen.getByText('Hello there,')).toBeTruthy();
    expect(screen.getByText('Welcome to Test Project')).toBeTruthy();
  });

  it('should have welcome container', () => {
    const { container } = render(<Welcome project="Test Project" />);

    expect(container.querySelector('#welcome')).toBeTruthy();
  });
});
