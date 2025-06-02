import { TrendArrow } from '@diabetus/shared/types';
import {
  mgDlToMmol,
  getTrendArrowLabel,
  formatTargetRange,
  getReadingColor,
} from './graph';

describe('graph utils', () => {
  describe('mgDlToMmol', () => {
    it('should convert mg/dL to mmol/L correctly', () => {
      expect(mgDlToMmol(180)).toBe(10.0);
      expect(mgDlToMmol(72)).toBe(4.0);
      expect(mgDlToMmol(126)).toBe(7.0);
    });

    it('should handle decimal values', () => {
      expect(mgDlToMmol(181)).toBe(10.0);
      expect(mgDlToMmol(73)).toBe(4.1);
      expect(mgDlToMmol(127)).toBe(7.0);
    });

    it('should handle zero', () => {
      expect(mgDlToMmol(0)).toBe(0.0);
    });
  });

  describe('getTrendArrowLabel', () => {
    it('should return correct symbol for rising quickly', () => {
      expect(getTrendArrowLabel(TrendArrow.RisingQuickly)).toBe('↑↑');
    });

    it('should return correct symbol for rising', () => {
      expect(getTrendArrowLabel(TrendArrow.Rising)).toBe('↑');
    });

    it('should return correct symbol for stable', () => {
      expect(getTrendArrowLabel(TrendArrow.Stable)).toBe('→');
    });

    it('should return correct symbol for falling', () => {
      expect(getTrendArrowLabel(TrendArrow.Falling)).toBe('↓');
    });

    it('should return correct symbol for falling quickly', () => {
      expect(getTrendArrowLabel(TrendArrow.FallingQuickly)).toBe('↓↓');
    });

    it('should return question mark for unknown values', () => {
      expect(getTrendArrowLabel(99 as TrendArrow)).toBe('?');
    });
  });

  describe('formatTargetRange', () => {
    it('should format target range correctly', () => {
      expect(formatTargetRange(70, 180)).toBe('3.9-10.0 mmol/L');
    });

    it('should handle zero values', () => {
      expect(formatTargetRange(0, 0)).toBe('0.0-0.0 mmol/L');
    });

    it('should handle decimal values', () => {
      expect(formatTargetRange(72, 181)).toBe('4.0-10.0 mmol/L');
    });
  });

  describe('getReadingColor', () => {
    const targetLow = 70; // 3.9 mmol/L
    const targetHigh = 180; // 10.0 mmol/L

    it('should return red for low readings', () => {
      expect(getReadingColor(60, targetLow, targetHigh)).toBe('text-red-500');
    });

    it('should return yellow for high readings', () => {
      expect(getReadingColor(200, targetLow, targetHigh)).toBe(
        'text-yellow-500'
      );
    });

    it('should return green for in-range readings', () => {
      expect(getReadingColor(120, targetLow, targetHigh)).toBe(
        'text-green-500'
      );
    });

    it('should handle boundary values correctly', () => {
      // At lower boundary
      expect(getReadingColor(70, targetLow, targetHigh)).toBe('text-green-500');
      // At upper boundary
      expect(getReadingColor(180, targetLow, targetHigh)).toBe(
        'text-green-500'
      );
    });
  });
});
