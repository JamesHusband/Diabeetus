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

export function GlucoseChart({
  readings,
  targetRange,
  className,
}: GlucoseChartProps) {
  const data = {
    labels: readings.map((reading) => formatTimestamp(reading.Timestamp)),
    datasets: [
      {
        label: 'Glucose Level (mmol/L)',
        data: readings.map((reading) => reading.Value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      ...(targetRange
        ? [
            {
              label: 'Target Range',
              data: Array(readings.length).fill(targetRange.high),
              borderColor: 'rgba(234, 179, 8, 0.5)',
              borderDashed: [5, 5],
              pointRadius: 0,
            },
            {
              label: 'Target Range',
              data: Array(readings.length).fill(targetRange.low),
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
        min: Math.min(...readings.map((r) => r.Value)) - 1,
        max: Math.max(...readings.map((r) => r.Value)) + 1,
      },
    },
  };

  return (
    <div className={`h-[400px] ${className || ''}`}>
      <Line options={options} data={data} />
    </div>
  );
}
