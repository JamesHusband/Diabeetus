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
import { useState, ChangeEvent } from 'react';
import { Button, Label, Input, Card, CardContent } from '@diabetus/ui/elements';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

type TimeRange = '6h' | '12h' | '24h' | '3d' | '7d' | 'custom';

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

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const chartData = {
    labels: [...filteredData]
      .reverse()
      .map((point) => formatTimestamp(point.timestamp)),
    datasets: [
      {
        label: yAxisLabel,
        data: [...filteredData].reverse().map((point) => point.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
      ...(targetRange
        ? [
            {
              label: 'Target Range',
              data: Array(filteredData.length).fill(targetRange.high),
              borderColor: 'rgba(234, 179, 8, 0.5)',
              borderDashed: [5, 5],
              pointRadius: 0,
            },
            {
              label: 'Target Range',
              data: Array(filteredData.length).fill(targetRange.low),
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
        display: !!title,
        text: title,
      },
    },
    scales: {
      y: {
        min: Math.min(...filteredData.map((r) => r.value)) - 1,
        max: Math.max(...filteredData.map((r) => r.value)) + 1,
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return (
    <Card className={className}>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
            <div className="flex gap-2">
              {(['6h', '12h', '24h', '3d', '7d'] as TimeRange[]).map(
                (range) => (
                  <Button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    variant={selectedRange === range ? 'default' : 'ghost'}
                    size="sm"
                  >
                    {range}
                  </Button>
                )
              )}
              <Button
                onClick={() => setSelectedRange('custom')}
                variant={selectedRange === 'custom' ? 'default' : 'ghost'}
                size="sm"
              >
                Custom
              </Button>
            </div>
            {selectedRange === 'custom' && (
              <div className="flex items-center gap-4 ml-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="date-from">From</Label>
                  <Input
                    id="date-from"
                    type="date"
                    value={customRange.from}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCustomRange((prev) => ({
                        ...prev,
                        from: e.target.value,
                      }))
                    }
                    className="w-[160px]"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="date-to">To</Label>
                  <Input
                    id="date-to"
                    type="date"
                    value={customRange.to}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCustomRange((prev) => ({
                        ...prev,
                        to: e.target.value,
                      }))
                    }
                    className="w-[160px]"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="h-[400px]">
            <Line options={options} data={chartData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
