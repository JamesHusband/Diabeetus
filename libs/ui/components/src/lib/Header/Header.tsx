import { useState } from 'react';
import Image from 'next/image';
import { Bell, User, Loader2 } from 'lucide-react';
import { PatientInfo } from '@diabetus/shared/types';
import { Graph } from '@diabetus/shared/utils';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@diabetus/ui/elements';

const { formatTargetRange } = Graph;

interface HeaderProps {
  loading: boolean;
  error: string | null;
  patientInfo: PatientInfo | null;
}

export function Header({ loading, error, patientInfo }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Image
          src="/assets/logo.webp"
          alt="Diabetus"
          width={150}
          height={32}
          className="h-8 w-auto"
          priority
        />
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="flex items-center">
              <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">{error}</div>
          ) : (
            patientInfo && (
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-sm font-medium">{`${patientInfo.firstName} ${patientInfo.lastName}`}</p>
                  <p className="text-xs text-gray-500">
                    Target:{' '}
                    {formatTargetRange(
                      patientInfo.targetLow,
                      patientInfo.targetHigh
                    )}
                  </p>
                </div>
              </div>
            )
          )}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-blue-600"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
            </Button>
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Notification/Alarm Component */}
      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <p className="font-medium">Glucose Level Alert</p>
              <p className="text-sm text-gray-600">
                Your glucose level is above target range.
              </p>
              <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
            </div>
            <div className="p-4 border-b border-gray-200">
              <p className="font-medium">Medication Reminder</p>
              <p className="text-sm text-gray-600">
                It's time to take your evening medication.
              </p>
              <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
            </div>
            <div className="p-4">
              <p className="font-medium">Weekly Report</p>
              <p className="text-sm text-gray-600">
                Your weekly health report is ready to view.
              </p>
              <p className="text-xs text-gray-500 mt-1">1 day ago</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
