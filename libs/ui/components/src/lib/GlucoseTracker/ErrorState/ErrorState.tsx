import { Card, CardContent } from '@diabetus/ui/elements';

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Card>
      <CardContent className="h-[400px] flex items-center justify-center">
        <p className="text-red-500">{message}</p>
      </CardContent>
    </Card>
  );
}
