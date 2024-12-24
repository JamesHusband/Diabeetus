import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import {
  LibreConfig,
  LogbookResponse,
  LoginResponse,
  ConnectionsResponse,
} from '@diabetus/shared/types';

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

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.message);
      throw error;
    }
  );

  return client;
};

const login =
  (client: AxiosInstance) =>
  async (email: string, password: string): Promise<LoginResponse> => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    try {
      const { data } = await client.post<LoginResponse>('/llu/auth/login', {
        email,
        password,
      });

      if (!data.data?.authTicket?.token) {
        throw new Error('No auth token received');
      }

      // Store auth ticket for future requests
      client.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.authTicket.token}`;

      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

const acceptTerms = (client: AxiosInstance) => async () =>
  await client.post('/auth/continue/tou');

const acceptPrivacyPolicy = (client: AxiosInstance) => async () =>
  await client.post('/auth/continue/pp');

const getLogbook = (client: AxiosInstance) => async () => {
  try {
    // First get connections to get patientId
    const connectionsResponse = await getConnections(client)();
    if (!connectionsResponse.data?.length) {
      throw new Error('No connections found');
    }

    const patientId = connectionsResponse.data[0].patientId;
    const path = `/llu/connections/${patientId}/logbook`;
    const { data } = await client.get<LogbookResponse>(path);
    return data;
  } catch (error) {
    console.error('Failed to get logbook:', error);
    throw error;
  }
};

const getConnections = (client: AxiosInstance) => async () => {
  try {
    const path = '/llu/connections';
    const { data } = await client.get<ConnectionsResponse>(path);
    return data;
  } catch (error) {
    console.error('Failed to get connections:', error);
    throw error;
  }
};

const updateToken = (client: AxiosInstance) => (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const createLibreService = (config: LibreConfig) => {
  if (!config.baseUrl) {
    throw new Error('Base URL is required');
  }

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
