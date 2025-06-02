import { User, Loader2 } from 'lucide-react';
import { PatientInfo as PatientInfoType } from '@diabetus/shared/types';
import { Graph } from '@diabetus/shared/utils';

const { formatTargetRange } = Graph;

interface PatientInfoProps {
  loading: boolean;
  error: string | null;
  patientInfo: PatientInfoType | null;
}

export function PatientInfo({ loading, error, patientInfo }: PatientInfoProps) {
  if (loading) {
    return (
      <div className="flex items-center">
        <Loader2 className="h-5 w-5 text-gray-500 animate-spin" />
        <span className="ml-2 text-sm text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  if (!patientInfo) {
    return null;
  }

  return (
    <div className="flex items-center">
      <User className="h-5 w-5 text-gray-500 mr-2" />
      <div>
        <p className="text-sm font-medium">{`${patientInfo.firstName} ${patientInfo.lastName}`}</p>
        <p className="text-xs text-gray-500">
          Target:{' '}
          {formatTargetRange(patientInfo.targetLow, patientInfo.targetHigh)}
        </p>
      </div>
    </div>
  );
}
