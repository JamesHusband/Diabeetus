import { Clock, Loader2 } from 'lucide-react';
import { GlucoseChart } from '../GlucoseChart/GlucoseChart';
import {
  PatientInfo,
  LogbookEntry,
  GlucoseReading,
} from '@diabetus/shared/types';
import { Graph, Units, Dates } from '@diabetus/shared/utils';

const { getTrendArrowLabel, getReadingColor } = Graph;
const { mgDlToMmol } = Units;
const { formatTimestamp } = Dates;

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Glucose Level Tracker */}
      <div className="md:col-span-3 bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Glucose Level Tracker</h3>
        {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>
        ) : readings.length === 0 && !loading ? (
          <div className="p-4 text-gray-500 text-center">
            No glucose readings available
          </div>
        ) : (
          <GlucoseChart readings={readings} className="bg-white rounded-lg" />
        )}
      </div>

      {/* Latest Reading Section */}
      <div className="md:col-span-1 bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Latest Reading</h3>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center text-red-500 text-center">
            {error}
          </div>
        ) : latestReading && patientInfo ? (
          <div className="h-64 flex flex-col items-center justify-center">
            <div
              className={`text-4xl font-bold mb-2 ${getReadingColor(
                latestReading.ValueInMgPerDl,
                patientInfo.targetLow,
                patientInfo.targetHigh
              )}`}
            >
              {mgDlToMmol(latestReading.ValueInMgPerDl)}
              <span className="text-lg ml-1">mmol/L</span>
            </div>
            <div className="text-2xl text-gray-600 mb-4">
              {getTrendArrowLabel(latestReading.TrendArrow)}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {formatTimestamp(latestReading.Timestamp)}
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            No reading available
          </div>
        )}
      </div>
    </div>
  );
}
