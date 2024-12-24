import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Skeleton,
} from '@diabetus/ui/elements';

export function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Latest Reading Card Loading State */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-36" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Glucose Chart Loading State */}
      <Card>
        <CardHeader>
          <CardTitle>Glucose History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-12" />
              ))}
            </div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
