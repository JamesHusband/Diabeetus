export enum MeasurementColor {
  InRange = 1,
  SlightlyHigh = 2,
  High = 3,
  Low = 4,
  Critical = 5,
}

export enum TrendArrow {
  RisingQuickly = 1,
  Rising = 2,
  Stable = 3,
  Falling = 4,
  FallingQuickly = 5,
}

export enum GlucoseUnit {
  MmolL = 0,
  MgDl = 1,
}

export interface GlucoseReading {
  /** Timestamp from the factory calibration */
  FactoryTimestamp: string;
  /** Local device timestamp */
  Timestamp: string;
  /** Reading type (1 = normal reading) */
  type: number;
  /** Glucose value in mg/dL */
  ValueInMgPerDl: number;
  /** Trend direction of glucose levels */
  TrendArrow: TrendArrow;
  /** Optional trend message */
  TrendMessage: string | null;
  /** Color indicator for glucose range */
  MeasurementColor: MeasurementColor;
  /** Unit of measurement (0 = mmol/L, 1 = mg/dL) */
  GlucoseUnits: GlucoseUnit;
  /** Glucose value in the current unit */
  Value: number;
  /** Whether the reading is above target range */
  isHigh: boolean;
  /** Whether the reading is below target range */
  isLow: boolean;
}

export interface LogbookResponse {
  /** Response status (0 = success) */
  status: number;
  /** Array of glucose readings */
  data: GlucoseReading[];
}
