import { mgDlToMmol } from './units';

describe('units', () => {
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
});
