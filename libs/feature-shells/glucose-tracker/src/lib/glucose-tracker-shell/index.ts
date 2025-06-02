'use client';

import { GlucoseTracker } from '@diabetus/ui';
import { useGlucoseTracker } from '../hooks/use-glucose-tracker';

export function GlucoseTrackerShell() {
  const { loading, error, readings, latestReading, patientInfo } =
    useGlucoseTracker();

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

  return (
    <GlucoseTracker
      loading={false}
      error={null}
      readings={readings ?? []}
      latestReading={latestReading ?? null}
      patientInfo={patientInfo ?? null}
    />
  );
}
