import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

const mockPatientInfo = {
  id: '123',
  patientId: '456',
  firstName: 'John',
  lastName: 'Doe',
  country: 'US',
  status: 'active',
  targetLow: 70,
  targetHigh: 180,
  glucoseUnit: 'mg/dL',
};

describe('Header', () => {
  it('renders loading state', () => {
    render(<Header loading={true} error={null} patientInfo={null} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = 'Failed to load data';
    render(<Header loading={false} error={error} patientInfo={null} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('renders patient info', () => {
    render(
      <Header loading={false} error={null} patientInfo={mockPatientInfo} />
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Target:/)).toBeInTheDocument();
  });

  it('toggles notifications dialog', () => {
    render(
      <Header loading={false} error={null} patientInfo={mockPatientInfo} />
    );

    // Open dialog
    fireEvent.click(screen.getByRole('button', { name: /notifications/i }));
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Glucose Level Alert')).toBeInTheDocument();

    // Close dialog
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });

  it('renders logo', () => {
    render(
      <Header loading={false} error={null} patientInfo={mockPatientInfo} />
    );
    expect(screen.getByAltText('Diabetus')).toBeInTheDocument();
  });
});
