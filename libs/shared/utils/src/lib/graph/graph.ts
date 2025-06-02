import { TrendArrow } from '@diabetus/shared/types';
import { Units } from '../units/units';

const { mgDlToMmol } = Units;

/**
 * Converts a trend arrow value to its corresponding symbol
 * @param trendArrow - Trend arrow value from the TrendArrow enum
 * @returns String representation of the trend arrow
 */
const getTrendArrowLabel = (trendArrow: TrendArrow): string => {
  switch (trendArrow) {
    case TrendArrow.RisingQuickly:
      return '↑↑';
    case TrendArrow.Rising:
      return '↑';
    case TrendArrow.Stable:
      return '→';
    case TrendArrow.Falling:
      return '↓';
    case TrendArrow.FallingQuickly:
      return '↓↓';
    default:
      return '?';
  }
};

/**
 * Formats target range values in mmol/L
 * @param low - Lower target range in mg/dL
 * @param high - Upper target range in mg/dL
 * @returns Formatted string with range in mmol/L
 */
const formatTargetRange = (low: number, high: number): string => {
  return `${mgDlToMmol(low)}-${mgDlToMmol(high)} mmol/L`;
};

/**
 * Determines the color class for a glucose reading based on target range
 * @param value - Glucose value in mg/dL
 * @param targetLow - Lower target range in mg/dL
 * @param targetHigh - Upper target range in mg/dL
 * @returns Tailwind color class
 */
const getReadingColor = (
  value: number,
  targetLow: number,
  targetHigh: number
): string => {
  const mmolValue = mgDlToMmol(value);
  const mmolLow = mgDlToMmol(targetLow);
  const mmolHigh = mgDlToMmol(targetHigh);

  if (mmolValue < mmolLow) return 'text-red-500';
  if (mmolValue > mmolHigh) return 'text-yellow-500';
  return 'text-green-500';
};

export const Graph = {
  getTrendArrowLabel,
  formatTargetRange,
  getReadingColor,
} as const;
