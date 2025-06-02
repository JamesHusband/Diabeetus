import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PatientInfo, LogbookEntry } from '@diabetus/shared/types';

export interface AppState {
  // State
  loading: boolean;
  error: string | null;
  authToken: string | null;
  isAuthenticated: boolean;
  patientInfo: PatientInfo | null;
  readings: LogbookEntry[];
  latestReading: LogbookEntry | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAuthToken: (token: string | null) => void;
  setPatientInfo: (info: PatientInfo | null) => void;
  setReadings: (readings: LogbookEntry[]) => void;
  setLatestReading: (reading: LogbookEntry | null) => void;
}

export const useAppState = create<AppState>()(
  devtools(
    (set) => ({
      // Initial state
      loading: false,
      error: null,
      authToken: null,
      isAuthenticated: false,
      patientInfo: null,
      readings: [],
      latestReading: null,

      // Actions
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setAuthToken: (token) =>
        set({ authToken: token, isAuthenticated: !!token }),
      setPatientInfo: (info) => set({ patientInfo: info }),
      setReadings: (readings) => set({ readings }),
      setLatestReading: (reading) => set({ latestReading: reading }),
    }),
    {
      name: 'Diabetus Store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);
