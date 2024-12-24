import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@diabetus/ui/elements';
import { LogbookEntry, PatientInfo } from '@diabetus/shared/types';

interface LatestReadingProps {
  reading: LogbookEntry;
  patientInfo: PatientInfo;
}

export function LatestReading({ reading, patientInfo }: LatestReadingProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Reading</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Glucose Level</p>
            <p className="text-2xl font-bold">{reading.Value} mmol/L</p>
            <p className="text-xs text-gray-500">
              {new Date(reading.Timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}
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
  );
}
