'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@diabetus/ui/elements';
import { LogbookEntry, PatientInfo } from '@diabetus/shared/types';
import dynamic from 'next/dynamic';

interface TimeDisplayProps {
  timestamp: string;
}

const TimeDisplay = ({ timestamp }: TimeDisplayProps) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
};

const ClientTimeDisplay = dynamic(() => Promise.resolve(TimeDisplay), {
  ssr: false,
});

interface LatestReadingProps {
  reading: LogbookEntry;
  patientInfo: PatientInfo;
}

export function LatestReading({ reading, patientInfo }: LatestReadingProps) {
  if (!reading || !patientInfo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              <ClientTimeDisplay timestamp={reading.Timestamp} />
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
