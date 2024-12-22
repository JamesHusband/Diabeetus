export interface GlucoseReading {
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

export interface LogbookResponse {
  status: number;
  data: GlucoseReading[];
}

export interface LoginResponse {
  status: number;
  data: {
    authTicket: {
      token: string;
      expires: number;
      duration: number;
    };
    user: {
      id: string;
      firstName: string;
      lastName: string;
      country: string;
      email: string;
    };
  };
}

export interface Connection {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  targetLow: number;
  targetHigh: number;
  uom: number;
}

export interface ConnectionsResponse {
  status: number;
  data: Connection[];
  ticket: {
    token: string;
    expires: number;
    duration: number;
  };
}

export interface LibreConfig {
  baseUrl: string;
  token?: string;
}

export interface LibreService {
  login: (email: string, password: string) => Promise<LoginResponse>;
  acceptTerms: () => Promise<any>;
  acceptPrivacyPolicy: () => Promise<any>;
  getLogbook: () => Promise<LogbookResponse>;
  getConnections: () => Promise<ConnectionsResponse>;
  updateToken: (token: string) => void;
}
