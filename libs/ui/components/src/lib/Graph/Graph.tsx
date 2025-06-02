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
    if (!data.length) return [];

    // Sort data by timestamp in descending order (newest first)
    const sortedData = [...data].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    let filteredData: DataPoint[] = [];
    let startTime: Date;
    let endTime: Date;

    switch (range) {
      case '6h':
        filteredData = sortedData.slice(0, 6); // Take the 6 most recent readings
        break;
      case '12h':
        filteredData = sortedData.slice(0, 12); // Take the 12 most recent readings
        break;
      case '24h':
        filteredData = sortedData.slice(0, 24); // Take the 24 most recent readings
        break;
      case '3d':
        filteredData = sortedData.slice(0, 72); // Take the 72 most recent readings (3 days)
        break;
      case '7d':
        filteredData = sortedData.slice(0, 168); // Take the 168 most recent readings (7 days)
        break;
      case 'custom':
        startTime = new Date(customRange.from);
        endTime = new Date(customRange.to);
        endTime.setHours(23, 59, 59, 999);

        filteredData = sortedData.filter((point) => {
          const pointTime = new Date(point.timestamp);
          return pointTime >= startTime && pointTime <= endTime;
        });
        break;
      default:
        filteredData = sortedData.slice(0, 24); // Default to 24 most recent readings
    }

    // Sort chronologically for display (oldest to newest)
    filteredData.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Debug logging
    console.log('Time Range:', {
      range,
      totalPoints: data.length,
      filteredPoints: filteredData.length,
      firstPoint: filteredData[0]?.timestamp,
      lastPoint: filteredData[filteredData.length - 1]?.timestamp,
    });

    return filteredData;
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
