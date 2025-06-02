import { render, screen } from '@testing-library/react';
import { NotificationList } from './NotificationList';

const mockNotifications = [
  {
    title: 'Test Alert',
    message: 'This is a test alert',
    timestamp: '2 minutes ago',
  },
  {
    title: 'Another Alert',
    message: 'This is another test alert',
    timestamp: '1 hour ago',
  },
];

describe('NotificationList', () => {
  const mockOnOpenChange = jest.fn();

  beforeEach(() => {
    mockOnOpenChange.mockClear();
  });

  it('renders notifications when open', () => {
    render(
      <NotificationList
        open={true}
        onOpenChange={mockOnOpenChange}
        notifications={mockNotifications}
      />
    );

    expect(screen.getByText('Notifications')).toBeTruthy();
    expect(screen.getByText('Test Alert')).toBeTruthy();
    expect(screen.getByText('This is a test alert')).toBeTruthy();
    expect(screen.getByText('Another Alert')).toBeTruthy();
    expect(screen.getByText('This is another test alert')).toBeTruthy();
  });

  it('renders timestamps', () => {
    render(
      <NotificationList
        open={true}
        onOpenChange={mockOnOpenChange}
        notifications={mockNotifications}
      />
    );

    expect(screen.getByText('2 minutes ago')).toBeTruthy();
    expect(screen.getByText('1 hour ago')).toBeTruthy();
  });

  it('renders empty list when no notifications', () => {
    render(
      <NotificationList
        open={true}
        onOpenChange={mockOnOpenChange}
        notifications={[]}
      />
    );

    expect(screen.getByText('Notifications')).toBeTruthy();
    expect(screen.queryByRole('listitem')).toBeNull();
  });

  it('does not render content when closed', () => {
    render(
      <NotificationList
        open={false}
        onOpenChange={mockOnOpenChange}
        notifications={mockNotifications}
      />
    );

    expect(screen.queryByText('Notifications')).toBeNull();
  });
});
