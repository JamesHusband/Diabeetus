'use client';

import React from 'react';
import { GlucoseTracker } from '@diabetus/ui';
import { useGlucoseTracker } from '../hooks/use-glucose-tracker';

export function GlucoseTrackerShell() {
  const { loading, error, readings, latestReading, patientInfo } =
    useGlucoseTracker();

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
