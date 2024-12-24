'use client';

import { GlucoseTracker } from '@diabetus/ui';
import { useAppState } from '@diabetus/shared/state';

export function GlucoseTrackerShell() {
  const { loading, error, readings, latestReading, patientInfo } =
    useAppState();

  return (
    <GlucoseTracker
      loading={loading}
      error={error}
      readings={readings}
      latestReading={latestReading}
      patientInfo={patientInfo}
    />
  );
}
