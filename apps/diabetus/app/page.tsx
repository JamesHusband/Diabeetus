'use client';

import { Chatbot, LatestReading } from '@diabetus/ui';
import {
  GlucoseTrackerShell,
  useGlucoseTracker,
} from '@diabetus/features/glucose-tracker';

export default function Dashboard() {
  const { loading, error, latestReading, patientInfo } = useGlucoseTracker();

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <GlucoseTrackerShell />
            <Chatbot />
          </div>
          <div className="lg:col-span-1">
            {!loading && !error && latestReading && patientInfo && (
              <LatestReading
                reading={latestReading}
                patientInfo={patientInfo}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
