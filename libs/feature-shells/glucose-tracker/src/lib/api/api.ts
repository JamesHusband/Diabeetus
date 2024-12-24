import { PatientInfo, LogbookEntry } from '@diabetus/shared/types';

const API_BASE_URL = 'http://localhost:3333/api/libre';

async function fetchWithCredentials(url: string): Promise<Response> {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 429) {
    const retryAfter = response.headers.get('retry-after');
    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 1000;
    console.log(`Rate limited. Waiting ${waitTime}ms before retrying...`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return fetchWithCredentials(url);
  }

  return response;
}

export async function fetchPatientInfo(): Promise<PatientInfo | null> {
  try {
    const response = await fetchWithCredentials(`${API_BASE_URL}/connections`);
    if (!response.ok) {
      throw new Error('Failed to fetch patient info');
    }
    const data = await response.json();
    return data.data[0] || null;
  } catch (error) {
    console.error('Error fetching patient info:', error);
    return null;
  }
}

export async function fetchLogbook(): Promise<LogbookEntry[]> {
  try {
    const response = await fetchWithCredentials(`${API_BASE_URL}/logbook`);
    if (!response.ok) {
      throw new Error('Failed to fetch logbook');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching logbook:', error);
    return [];
  }
}
