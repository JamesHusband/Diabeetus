export const getReadingColor = (
  value: number,
  targetLow: number,
  targetHigh: number
) => {
  if (value < targetLow) return 'text-red-500';
  if (value > targetHigh) return 'text-yellow-500';
  return 'text-green-500';
};

export const getTrendArrowLabel = (trendArrow: number): string => {
  switch (trendArrow) {
    case 1:
      return '↑↑'; // Rising quickly
    case 2:
      return '↑'; // Rising
    case 3:
      return '→'; // Stable
    case 4:
      return '↓'; // Falling
    case 5:
      return '↓↓'; // Falling quickly
    default:
      return '?';
  }
};

export const formatTimestamp = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
