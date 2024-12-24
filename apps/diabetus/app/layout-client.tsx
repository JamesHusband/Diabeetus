'use client';

import { useEffect, useState } from 'react';
import { Header, Footer } from '@diabetus/ui';
import { useAppState } from '@diabetus/shared/state';
import { fetchPatientInfo, fetchLogbook } from './api/api';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const {
    setLoading,
    setError,
    setAuthToken,
    setPatientInfo,
    setReadings,
    setLatestReading,
    loading,
    error,
    patientInfo,
    authToken,
    isAuthenticated,
  } = useAppState();

  const [activeSection, setActiveSection] = useState('home');

  // First effect just for authentication
  useEffect(() => {
    const authenticate = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3333/api/libre/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();
        setAuthToken(data.data.authTicket.token);
      } catch (err) {
        setError('Authentication failed. Please try again.');
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!isAuthenticated) {
      authenticate();
    }
  }, [setLoading, setError, setAuthToken, isAuthenticated]);

  // Separate effect for data loading that depends on authentication
  useEffect(() => {
    const loadData = async () => {
      if (!isAuthenticated || !authToken) return;

      try {
        setLoading(true);
        setError(null);

        const info = await fetchPatientInfo();
        if (!info) {
          throw new Error('Failed to load patient information');
        }
        setPatientInfo(info);

        const logbook = await fetchLogbook();
        if (logbook.length > 0) {
          setLatestReading(logbook[0]);
          setReadings(logbook);
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [
    isAuthenticated,
    authToken,
    setLoading,
    setError,
    setPatientInfo,
    setReadings,
    setLatestReading,
  ]);

  useEffect(() => {
    console.log('Auth Token from state:', authToken);
  }, [authToken]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header loading={loading} error={error} patientInfo={patientInfo} />
      {children}
      <Footer activeSection={activeSection} onNavigate={setActiveSection} />
    </div>
  );
}
