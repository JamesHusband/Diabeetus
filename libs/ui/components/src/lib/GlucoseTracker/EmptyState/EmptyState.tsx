import { Card, CardContent } from '@diabetus/ui/elements';

export function EmptyState() {
  return (
    <Card>
      <CardContent className="h-[400px] flex items-center justify-center">
        <p className="text-gray-500">No glucose data available.</p>
      </CardContent>
    </Card>
  );
}
