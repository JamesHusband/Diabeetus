import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@diabetus/ui/elements';

interface ChatbotProps {
  className?: string;
}

export function Chatbot({ className }: ChatbotProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Chatbot</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
          <p className="text-gray-600">
            Chatbot interface will be implemented here
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
