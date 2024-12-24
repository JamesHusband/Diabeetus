import { create } from 'zustand';
import { PatientInfo, LogbookEntry } from '@diabetus/shared/types';

interface AppState {
  // Auth State
  isAuthenticated: boolean;
  authToken: string | null;
  // Existing State
  patientInfo: PatientInfo | null;
  readings: LogbookEntry[];
  latestReading: LogbookEntry | null;
  loading: boolean;
  error: string | null;

  // Auth Actions
  setAuthToken: (token: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  // Existing Actions
  setPatientInfo: (info: PatientInfo | null) => void;
  setReadings: (readings: LogbookEntry[]) => void;
  setLatestReading: (reading: LogbookEntry | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppState = create<AppState>((set) => ({
  // Auth Initial State
  isAuthenticated: false,
  authToken: null,
  // Existing Initial State
  patientInfo: null,
  readings: [],
  latestReading: null,
  loading: false,
  error: null,

  // Auth Actions
  setAuthToken: (token) => set({ authToken: token, isAuthenticated: !!token }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  // Existing Actions
  setPatientInfo: (info) => set({ patientInfo: info }),
  setReadings: (readings) => set({ readings }),
  setLatestReading: (reading) => set({ latestReading: reading }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
