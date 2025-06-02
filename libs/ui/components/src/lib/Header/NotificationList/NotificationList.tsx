import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  ScrollArea,
  Separator,
} from '@diabetus/ui/elements';

interface Notification {
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  notifications: Notification[];
}

export function NotificationList({
  open,
  onOpenChange,
  notifications,
}: NotificationListProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index}>
                <div className="p-4">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-gray-600">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                {index < notifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
