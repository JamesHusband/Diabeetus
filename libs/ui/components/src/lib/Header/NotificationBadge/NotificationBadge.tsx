import { Bell } from 'lucide-react';
import { Button, Badge } from '@diabetus/ui/elements';

interface NotificationBadgeProps {
  count: number;
  onClick: () => void;
}

export function NotificationBadge({ count, onClick }: NotificationBadgeProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-blue-600"
        aria-label="Notifications"
        onClick={onClick}
      >
        <Bell className="h-6 w-6" />
      </Button>
      {count > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
        >
          {count}
        </Badge>
      )}
    </div>
  );
}
