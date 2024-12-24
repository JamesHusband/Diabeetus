import { ApiResponse, PatientInfo, LogbookEntry } from '@diabetus/shared/types';

const API_BASE_URL = 'http://localhost:3333/api';

export const fetchLogbook = async (): Promise<LogbookEntry[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/libre/logbook`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
    const response = await fetch(`${API_BASE_URL}/libre/connections`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
