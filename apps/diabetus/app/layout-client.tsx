'use client';

import { useState, useEffect } from 'react';
import { Header, Footer } from '@diabetus/ui';
import { PatientInfo } from '@diabetus/shared/types';
import { fetchPatientInfo } from './api/api';

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  useEffect(() => {
    const loadPatientInfo = async () => {
      try {
        setLoading(true);
        setError(null);
        const info = await fetchPatientInfo();
        if (!info) {
          throw new Error('Failed to load patient information');
        }
        setPatientInfo(info);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPatientInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header loading={loading} error={error} patientInfo={patientInfo} />
      {children}
      <Footer activeSection={activeSection} onNavigate={setActiveSection} />
    </div>
  );
}
