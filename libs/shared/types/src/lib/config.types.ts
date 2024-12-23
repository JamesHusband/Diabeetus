import { LoginResponse } from './auth.types';
import { LogbookResponse } from './glucose.types';
import { ConnectionsResponse } from './connection.types';

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
