import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
  LibreConfig,
  LogbookResponse,
  LoginResponse,
  ConnectionsResponse,
} from './types';

const createClient = (config: LibreConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Content-Type': 'application/json',
      product: 'llu.ios',
      version: '4.7',
    },
  });

  // Ensure headers are sent with every request
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (config.headers) {
      config.headers['product'] = 'llu.ios';
      config.headers['version'] = '4.7';
    }
    return config;
  });

  return client;
};

const login =
  (client: AxiosInstance) =>
  async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await client.post<LoginResponse>('/llu/auth/login', {
      email,
      password,
    });
    // Store auth ticket for future requests
    if (data.data?.authTicket?.token) {
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.authTicket.token}`;
    }
    return data;
  };

const acceptTerms = (client: AxiosInstance) => async () =>
  await client.post('/auth/continue/tou');

const acceptPrivacyPolicy = (client: AxiosInstance) => async () =>
  await client.post('/auth/continue/pp');

const getLogbook = (client: AxiosInstance) => async () => {
  // First get connections to get patientId
  const connectionsResponse = await getConnections(client)();
  if (!connectionsResponse.data?.length) {
    throw new Error('No connections found');
  }

  const patientId = connectionsResponse.data[0].patientId;
  const path = `/llu/connections/${patientId}/logbook`;
  const { data } = await client.get<LogbookResponse>(path);
  return data;
};

const getConnections = (client: AxiosInstance) => async () => {
  const path = '/llu/connections';
  const { data } = await client.get<ConnectionsResponse>(path);
  return data;
};

const updateToken = (client: AxiosInstance) => (token: string) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const createLibreService = (config: LibreConfig) => {
  const client = createClient(config);

  return {
    login: login(client),
    acceptTerms: acceptTerms(client),
    acceptPrivacyPolicy: acceptPrivacyPolicy(client),
    getLogbook: getLogbook(client),
    getConnections: getConnections(client),
    updateToken: updateToken(client),
  };
};

export {
  login,
  acceptTerms,
  acceptPrivacyPolicy,
  getLogbook,
  getConnections,
  updateToken,
  createLibreService,
};
