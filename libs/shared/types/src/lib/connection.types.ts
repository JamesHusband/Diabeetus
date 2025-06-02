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
