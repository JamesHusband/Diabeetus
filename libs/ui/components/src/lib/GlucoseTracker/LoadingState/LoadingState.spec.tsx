import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingState } from './LoadingState';

describe('LoadingState', () => {
  it('renders loading skeletons for latest reading', () => {
    render(<LoadingState />);
    expect(screen.getByText('Latest Reading')).toBeInTheDocument();

    const skeletons = screen.getAllByTestId('skeleton');
    expect(skeletons).toHaveLength(13); // 5 for latest reading + 7 for glucose chart + 1 for chart area
  });

  it('renders loading skeletons for glucose chart', () => {
    render(<LoadingState />);
    expect(screen.getByText('Glucose History')).toBeInTheDocument();

    const timeRangeSkeletons = screen.getAllByTestId('time-range-skeleton');
    expect(timeRangeSkeletons).toHaveLength(6);

    const chartSkeleton = screen.getByTestId('chart-skeleton');
    expect(chartSkeleton).toHaveClass('h-[400px]', 'w-full');
  });

  it('maintains consistent layout with grid structure', () => {
    render(<LoadingState />);
    const latestReadingGrid = screen.getByTestId('latest-reading-grid');
    expect(latestReadingGrid).toHaveClass('grid-cols-2', 'gap-4');
  });

  it('renders with correct spacing', () => {
    render(<LoadingState />);
    expect(screen.getByTestId('loading-container')).toHaveClass('space-y-6');
    expect(screen.getByTestId('latest-reading-left')).toHaveClass('space-y-2');
    expect(screen.getByTestId('chart-container')).toHaveClass('space-y-4');
  });
});
