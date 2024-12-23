'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { GlucoseReading } from '@diabetus/shared/types';
import { formatTimestamp } from './utils';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GlucoseChartProps {
  readings: GlucoseReading[];
  targetRange?: { low: number; high: number };
  className?: string;
}

type TimeRange = '6h' | '12h' | '24h' | '3d' | '7d' | 'custom';

export function GlucoseChart({
  readings,
  targetRange,
  className,
}: GlucoseChartProps) {
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

  const filterReadingsByTimeRange = (
    readings: GlucoseReading[],
    range: TimeRange
  ) => {
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

    return readings.filter(
      (reading) =>
        new Date(reading.Timestamp) >= startTime &&
        new Date(reading.Timestamp) <= now
    );
  };

  const filteredReadings = filterReadingsByTimeRange(readings, selectedRange);

  const data = {
    labels: [...filteredReadings]
      .reverse()
      .map((reading) => formatTimestamp(reading.Timestamp)),
    datasets: [
      {
        label: 'Glucose Level (mmol/L)',
        data: [...filteredReadings].reverse().map((reading) => reading.Value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      ...(targetRange
        ? [
            {
              label: 'Target Range',
              data: Array(filteredReadings.length).fill(targetRange.high),
              borderColor: 'rgba(234, 179, 8, 0.5)',
              borderDashed: [5, 5],
              pointRadius: 0,
            },
            {
              label: 'Target Range',
              data: Array(filteredReadings.length).fill(targetRange.low),
              borderColor: 'rgba(234, 179, 8, 0.5)',
              borderDashed: [5, 5],
              pointRadius: 0,
            },
          ]
        : []),
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: Math.min(...filteredReadings.map((r) => r.Value)) - 1,
        max: Math.max(...filteredReadings.map((r) => r.Value)) + 1,
      },
    },
  };

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
        <div className="flex gap-2">
          {(['6h', '12h', '24h', '3d', '7d'] as TimeRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
          <button
            onClick={() => setSelectedRange('custom')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedRange === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Custom
          </button>
        </div>
        {selectedRange === 'custom' && (
          <div className="flex items-center gap-2 ml-4">
            <input
              type="date"
              value={customRange.from}
              onChange={(e) =>
                setCustomRange((prev) => ({ ...prev, from: e.target.value }))
              }
              className="px-2 py-1 rounded border text-sm"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={customRange.to}
              onChange={(e) =>
                setCustomRange((prev) => ({ ...prev, to: e.target.value }))
              }
              className="px-2 py-1 rounded border text-sm"
            />
          </div>
        )}
      </div>
      <div className="h-[400px]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
