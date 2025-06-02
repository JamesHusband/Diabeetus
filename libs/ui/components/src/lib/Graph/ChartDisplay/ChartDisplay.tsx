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

interface ChartDisplayProps {
  data: DataPoint[];
  targetRange?: { low: number; high: number };
  yAxisLabel?: string;
  title?: string;
}

export function ChartDisplay({
  data,
  targetRange,
  yAxisLabel = 'Value',
  title,
}: ChartDisplayProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const chartData = {
    labels: [...data]
      .reverse()
      .map((point) => formatTimestamp(point.timestamp)),
    datasets: [
      {
        label: yAxisLabel,
        data: [...data].reverse().map((point) => point.value),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
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
        min: Math.min(...data.map((r) => r.value)) - 1,
        max: Math.max(...data.map((r) => r.value)) + 1,
        title: {
          display: true,
          text: yAxisLabel,
        },
      },
    },
  };

  return (
    <div className="h-[400px]">
      <Line options={options} data={chartData} />
    </div>
  );
}
