import { GlucoseChart } from '../GlucoseChart/GlucoseChart';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Skeleton,
} from '@diabetus/ui/elements';
import {
  GlucoseReading,
  LogbookEntry,
  PatientInfo,
} from '@diabetus/shared/types';

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
    return (
      <div className="space-y-6">
        {/* Latest Reading Card Loading State */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Reading</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-3 w-40" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-36" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Glucose Chart Loading State */}
        <Card>
          <CardHeader>
            <CardTitle>Glucose History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-12" />
                ))}
              </div>
              <Skeleton className="h-[400px] w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!readings.length || !latestReading || !patientInfo) {
    return (
      <Card>
        <CardContent className="h-[400px] flex items-center justify-center">
          <p className="text-gray-500">No glucose data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Latest Reading Card */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Glucose Level</p>
              <p className="text-2xl font-bold">{latestReading.Value} mmol/L</p>
              <p className="text-xs text-gray-500">
                {new Date(latestReading.Timestamp).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Target Range</p>
              <p className="text-lg">
                {patientInfo.targetLow} - {patientInfo.targetHigh} mmol/L
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Glucose Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Glucose History</CardTitle>
        </CardHeader>
        <CardContent>
          <GlucoseChart
            readings={readings}
            targetRange={{
              low: patientInfo.targetLow,
              high: patientInfo.targetHigh,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
