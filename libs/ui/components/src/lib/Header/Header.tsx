import { useState } from 'react';
import Image from 'next/image';
import { PatientInfo } from './PatientInfo/PatientInfo';
import { NotificationBadge } from './NotificationBadge/NotificationBadge';
import { NotificationList } from './NotificationList/NotificationList';
import { PatientInfo as PatientInfoType } from '@diabetus/shared/types';

interface HeaderProps {
  loading: boolean;
  error: string | null;
  patientInfo: PatientInfoType | null;
}

const mockNotifications = [
  {
    title: 'Glucose Level Alert',
    message: 'Your glucose level is above target range.',
    timestamp: '2 minutes ago',
  },
  {
    title: 'Medication Reminder',
    message: "It's time to take your evening medication.",
    timestamp: '1 hour ago',
  },
  {
    title: 'Weekly Report',
    message: 'Your weekly health report is ready to view.',
    timestamp: '1 day ago',
  },
];

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
          <PatientInfo
            loading={loading}
            error={error}
            patientInfo={patientInfo}
          />
          <NotificationBadge
            count={mockNotifications.length}
            onClick={() => setShowNotifications(true)}
          />
        </div>
      </div>

      <NotificationList
        open={showNotifications}
        onOpenChange={setShowNotifications}
        notifications={mockNotifications}
      />
    </header>
  );
}
