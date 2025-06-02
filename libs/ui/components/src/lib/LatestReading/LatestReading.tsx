'use client';

import { Card, CardContent } from '@diabetus/ui/elements';
import { formatDistanceToNow } from 'date-fns';

interface Reading {
  Value: number;
  Timestamp: string;
}

interface LatestReadingProps {
  reading: Reading;
  className?: string;
}

export function LatestReading({ reading, className }: LatestReadingProps) {
  const readingDate = new Date(reading.Timestamp);
  const timeAgo = formatDistanceToNow(readingDate, { addSuffix: true });

  return (
    <Card className={className}>
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="text-4xl font-bold">{reading.Value}</div>
          <div className="text-sm text-gray-500">{timeAgo}</div>
        </div>
      </CardContent>
    </Card>
  );
}
