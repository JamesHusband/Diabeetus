import { Graph } from '../Graph/Graph';
import {
  GlucoseReading,
  LogbookEntry,
  PatientInfo,
} from '@diabetus/shared/types';
import { LoadingState } from './LoadingState/LoadingState';
import { ErrorState } from './ErrorState/ErrorState';
import { EmptyState } from './EmptyState/EmptyState';

interface GlucoseTrackerProps {
  loading: boolean;
  error: string | null;
  readings: GlucoseReading[];
  latestReading: LogbookEntry | null;
  patientInfo: PatientInfo | null;
}

export function GlucoseTracker({
  loading,
  error,
  readings,
  latestReading,
  patientInfo,
}: GlucoseTrackerProps) {
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!readings.length || !latestReading || !patientInfo) {
    return <EmptyState />;
  }

  const graphData = readings.map((reading) => ({
    value: reading.Value,
    timestamp: reading.Timestamp,
  }));

  return (
    <div className="space-y-6">
      <Graph
        data={graphData}
        targetRange={{
          low: patientInfo.targetLow,
          high: patientInfo.targetHigh,
        }}
        yAxisLabel="Glucose Level (mmol/L)"
        title="Glucose History"
      />
    </div>
  );
}
