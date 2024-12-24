import { render, screen } from '@testing-library/react';
import { PatientInfo } from './PatientInfo';

const mockPatientInfo = {
  id: '123',
  patientId: 'P123',
  firstName: 'John',
  lastName: 'Doe',
  country: 'US',
  status: 'active',
  targetLow: 4.0,
  targetHigh: 10.0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('PatientInfo', () => {
  it('renders loading state', () => {
    render(<PatientInfo loading={true} error={null} patientInfo={null} />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('renders error state', () => {
    const error = 'Failed to load patient info';
    render(<PatientInfo loading={false} error={error} patientInfo={null} />);
    expect(screen.getByText(error)).toBeTruthy();
  });

  it('renders patient information', () => {
    render(
      <PatientInfo loading={false} error={null} patientInfo={mockPatientInfo} />
    );
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText(/Target: 4.0 - 10.0 mmol\/L/)).toBeTruthy();
  });

  it('renders nothing when no patient info and no error', () => {
    const { container } = render(
      <PatientInfo loading={false} error={null} patientInfo={null} />
    );
    expect(container.firstChild).toBeNull();
  });
});
