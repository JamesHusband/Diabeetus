'use client';

import { useState } from 'react';
import { Header, Footer } from '@diabetus/ui';
import { useAppState } from '@diabetus/shared/state';
import { StateProvider } from '@diabetus/shared/state';

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const { loading, error, patientInfo } = useAppState();
  const [activeSection, setActiveSection] = useState('home');

  return (
    <StateProvider>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header loading={loading} error={error} patientInfo={patientInfo} />
        {children}
        <Footer activeSection={activeSection} onNavigate={setActiveSection} />
      </div>
    </StateProvider>
  );
}
