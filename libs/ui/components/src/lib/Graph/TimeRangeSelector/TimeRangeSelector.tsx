import { ChangeEvent } from 'react';
import { Button, Label, Input } from '@diabetus/ui/elements';

export type TimeRange = '6h' | '12h' | '24h' | '3d' | '7d' | 'custom';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  customRange: {
    from: string;
    to: string;
  };
  onCustomRangeChange: (range: { from: string; to: string }) => void;
}

export function TimeRangeSelector({
  selectedRange,
  onRangeChange,
  customRange,
  onCustomRangeChange,
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
      <div className="flex gap-2">
        {(['6h', '12h', '24h', '3d', '7d'] as TimeRange[]).map((range) => (
          <Button
            key={range}
            onClick={() => onRangeChange(range)}
            variant={selectedRange === range ? 'default' : 'ghost'}
            size="sm"
          >
            {range}
          </Button>
        ))}
        <Button
          onClick={() => onRangeChange('custom')}
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
                onCustomRangeChange({
                  ...customRange,
                  from: e.target.value,
                })
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
                onCustomRangeChange({
                  ...customRange,
                  to: e.target.value,
                })
              }
              className="w-[160px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
