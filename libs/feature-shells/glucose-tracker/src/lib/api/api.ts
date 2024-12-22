import { PatientInfo, LogbookEntry } from '@diabetus/shared/types';

export async function fetchPatientInfo(): Promise<PatientInfo> {
  const response = await fetch('http://localhost:3333/api/libre/connections');
  if (!response.ok) {
    throw new Error('Failed to fetch patient info');
  }
  const data = await response.json();
  return data.data[0]; // Assuming first connection is the current patient
}

export async function fetchLogbook(): Promise<LogbookEntry[]> {
  const response = await fetch('http://localhost:3333/api/libre/logbook');
  if (!response.ok) {
    throw new Error('Failed to fetch logbook');
  }
  const data = await response.json();
  return data.data;
}
