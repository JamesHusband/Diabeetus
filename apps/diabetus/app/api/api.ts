import { ApiResponse, PatientInfo, LogbookEntry } from '@diabetus/shared';

const API_BASE_URL = 'http://localhost:3333/api';

// Track login state
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithCredentials = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Ensure we're initialized before making any requests
  if (!isInitialized) {
    await initialize();
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  // Handle rate limiting
  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after');
    if (retryAfter) {
      const delaySeconds = parseInt(retryAfter, 10);
      console.log(
        `Rate limited. Waiting ${delaySeconds} seconds before retrying...`
      );
      await sleep(delaySeconds * 1000);
      return fetchWithCredentials(url, options);
    }
  }

  return response;
};

// Initialize the application - runs only once
const initialize = async (): Promise<void> => {
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    try {
      console.log('Initializing application...');
      const loginResponse = await fetch(`${API_BASE_URL}/libre/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (loginResponse.status === 430) {
        console.log('Accepting terms...');
        const termsResponse = await fetch(`${API_BASE_URL}/libre/terms`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!termsResponse.ok) {
          throw new Error(`Failed to accept terms: ${termsResponse.status}`);
        }

        console.log('Retrying login...');
        const retryResponse = await fetch(`${API_BASE_URL}/libre/login`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!retryResponse.ok) {
          throw new Error(`Login retry failed: ${retryResponse.status}`);
        }
      } else if (!loginResponse.ok) {
        throw new Error(`Login failed: ${loginResponse.status}`);
      }

      console.log('Application initialized successfully');
      isInitialized = true;
    } catch (error) {
      console.error('Initialization error:', error);
      initializationPromise = null;
      throw error;
    }
  })();

  return initializationPromise;
};

export const fetchLogbook = async (): Promise<LogbookEntry[]> => {
  try {
    const response = await fetchWithCredentials(
      `${API_BASE_URL}/libre/logbook`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch logbook: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching logbook:', error);
    return [];
  }
};

export const fetchPatientInfo = async (): Promise<PatientInfo | null> => {
  try {
    const response = await fetchWithCredentials(
      `${API_BASE_URL}/libre/connections`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch patient info: ${response.status}`);
    }

    const data: ApiResponse<PatientInfo> = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching patient info:', error);
    return null;
  }
};
