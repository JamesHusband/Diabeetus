'use client';

import { GlucoseTracker } from '@diabetus/ui';
import { useAppState } from '@diabetus/shared/state';

export function GlucoseTrackerShell() {
  const { loading, error, readings, latestReading, patientInfo } =
    useAppState();

  if (loading) {
    return (
      <GlucoseTracker
        loading={true}
        error={null}
        readings={[]}
        latestReading={null}
        patientInfo={null}
      />
    );
  }

  if (error) {
    return (
      <GlucoseTracker
        loading={false}
        error={error}
        readings={[]}
        latestReading={null}
        patientInfo={null}
      />
    );
  }

  if (!latestReading || !patientInfo) {
    return (
      <GlucoseTracker
        loading={false}
        error="No data available"
        readings={[]}
        latestReading={null}
        patientInfo={null}
      />
    );
  }

  return (
    <GlucoseTracker
      loading={false}
      error={null}
      readings={readings}
      latestReading={latestReading}
      patientInfo={patientInfo}
    />
  );
}
