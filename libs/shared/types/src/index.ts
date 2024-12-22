export * from './lib/glucose.types';
export * from './lib/auth.types';
export * from './lib/connection.types';
export * from './lib/config.types';

export interface LogbookEntry {
  FactoryTimestamp: string;
  Timestamp: string;
  type: number;
  ValueInMgPerDl: number;
  TrendArrow: number;
  TrendMessage: string | null;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

export interface PatientInfo {
  id: string;
  patientId: string;
  country: string;
  status: number;
  firstName: string;
  lastName: string;
  targetLow: number;
  targetHigh: number;
  uom: number;
  sensor: {
    deviceId: string;
    sn: string;
    a: number;
    w: number;
    pt: number;
    s: boolean;
    lj: boolean;
  };
  glucoseMeasurement: LogbookEntry;
}

export interface ApiResponse<T> {
  status: number;
  data: T[];
  ticket?: {
    token: string;
    expires: number;
    duration: number;
  };
}
