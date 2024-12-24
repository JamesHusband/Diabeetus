'use client';

import { useState } from 'react';
import { Card, CardContent } from '@diabetus/ui/elements';
import {
  TimeRangeSelector,
  TimeRange,
} from './TimeRangeSelector/TimeRangeSelector';
import { ChartDisplay } from './ChartDisplay/ChartDisplay';

interface DataPoint {
  value: number;
  timestamp: string;
}

interface GraphProps {
  data: DataPoint[];
  targetRange?: { low: number; high: number };
  className?: string;
  yAxisLabel?: string;
  title?: string;
}

export function Graph({
  data,
  targetRange,
  className,
  yAxisLabel = 'Value',
  title,
}: GraphProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('24h');
  const [customRange, setCustomRange] = useState<{
    from: string;
    to: string;
  }>({
    from: new Date(Date.now() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    to: new Date().toISOString().split('T')[0],
  });

  const filterDataByTimeRange = (data: DataPoint[], range: TimeRange) => {
    const now = new Date();
    let startTime: Date;

    switch (range) {
      case '6h':
        startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '12h':
        startTime = new Date(now.getTime() - 12 * 60 * 60 * 1000);
        break;
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '3d':
        startTime = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'custom':
        startTime = new Date(customRange.from);
        now.setHours(23, 59, 59, 999);
        break;
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    return data.filter(
      (point) =>
        new Date(point.timestamp) >= startTime &&
        new Date(point.timestamp) <= now
    );
  };

  const filteredData = filterDataByTimeRange(data, selectedRange);

  return (
    <Card className={className}>
      <CardContent>
        <div className="space-y-4">
          <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            customRange={customRange}
            onCustomRangeChange={setCustomRange}
          />
          <ChartDisplay
            data={filteredData}
            targetRange={targetRange}
            yAxisLabel={yAxisLabel}
            title={title}
          />
        </div>
      </CardContent>
    </Card>
  );
}
