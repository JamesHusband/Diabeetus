'use client';

import { Chatbot } from '@diabetus/ui';
import { GlucoseTrackerShell } from '@diabetus/features/glucose-tracker';

export default function Dashboard() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <GlucoseTrackerShell />
          <Chatbot />
        </div>
      </div>
    </main>
  );
}
