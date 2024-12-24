import { formatTimestamp } from './dates';

describe('dates', () => {
  it('should format timestamp to 12-hour time', () => {
    const morning = new Date('2024-03-22T09:30:00');
    const afternoon = new Date('2024-03-22T14:30:00');
    const midnight = new Date('2024-03-22T00:00:00');
    const noon = new Date('2024-03-22T12:00:00');

    expect(formatTimestamp(morning.toISOString())).toBe('9:30 AM');
    expect(formatTimestamp(afternoon.toISOString())).toBe('2:30 PM');
    expect(formatTimestamp(midnight.toISOString())).toBe('12:00 AM');
    expect(formatTimestamp(noon.toISOString())).toBe('12:00 PM');
  });

  it('should handle invalid dates', () => {
    expect(formatTimestamp('invalid-date')).toBe('Invalid Date');
  });
});
