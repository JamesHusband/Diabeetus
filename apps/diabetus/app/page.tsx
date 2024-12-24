'use client';

import { useState, useEffect } from 'react';
import { GlucoseTracker, Header, Chatbot, Footer } from '@diabetus/ui';
import {
  PatientInfo,
  LogbookEntry,
  GlucoseReading,
} from '@diabetus/shared/types';
import { fetchPatientInfo, fetchLogbook } from './api/api';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header loading={loading} error={error} patientInfo={patientInfo} />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <GlucoseTracker
              loading={loading}
              error={error}
              readings={readings}
              latestReading={latestReading}
              patientInfo={patientInfo}
            />
            <Chatbot />
          </div>
        </div>
      </main>

      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
