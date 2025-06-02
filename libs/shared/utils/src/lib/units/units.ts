/**
 * Converts glucose reading from mg/dL to mmol/L
 * @param mgDl - Glucose value in mg/dL
 * @returns Glucose value in mmol/L, rounded to 1 decimal place
 */
const mgDlToMmol = (mgDl: number): number => {
  return Number((mgDl / 18.0182).toFixed(1));
};

export const Units = {
  mgDlToMmol,
} as const;
