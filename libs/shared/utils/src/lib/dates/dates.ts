/**
 * Formats a timestamp into a 12-hour time string
 * @param timestamp - ISO timestamp string
 * @returns Formatted time string (e.g., "2:30 PM")
 */
const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const Dates = {
  formatTimestamp,
} as const;
