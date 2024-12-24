'use client';

import { useState, useEffect } from 'react';
import {
  PatientInfo,
  LogbookEntry,
  GlucoseReading,
} from '@diabetus/shared/types';
import { fetchPatientInfo, fetchLogbook } from '../api/api';

// Convert mg/dL to mmol/L
const mgDlToMmol = (mgDl: number): number => {
  return Number((mgDl / 18.0182).toFixed(1));
};

export function useGlucoseTracker() {
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [latestReading, setLatestReading] = useState<LogbookEntry | null>(null);
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch patient info first (this will ensure we're initialized)
        const info = await fetchPatientInfo();
        if (!info) {
          throw new Error('Failed to load patient information');
        }
        setPatientInfo(info);

        // Then fetch logbook
        const logbook = await fetchLogbook();
        if (logbook.length > 0) {
          setLatestReading(logbook[0]); // Assuming the first entry is the latest
          setReadings(logbook); // Store all readings for the chart
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Convert readings to mmol/L for display and format for graph
  const processedReadings = readings.map((reading) => ({
    value: mgDlToMmol(reading.ValueInMgPerDl),
    timestamp: reading.Timestamp,
  }));

  // Convert latest reading to mmol/L if it exists
  const processedLatestReading = latestReading
    ? {
        ...latestReading,
        Value: mgDlToMmol(latestReading.ValueInMgPerDl),
      }
    : null;

  // Convert target range to mmol/L if patient info exists
  const processedPatientInfo = patientInfo
    ? {
        ...patientInfo,
        targetLow: mgDlToMmol(patientInfo.targetLow),
        targetHigh: mgDlToMmol(patientInfo.targetHigh),
      }
    : null;

  return {
    patientInfo: processedPatientInfo,
    latestReading: processedLatestReading,
    readings: processedReadings,
    loading,
    error,
  };
}
