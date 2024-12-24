interface ChatbotProps {
  className?: string;
}

export function Chatbot({ className }: ChatbotProps) {
  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className || ''}`}>
      <h3 className="text-xl font-semibold mb-4">Chatbot</h3>
      <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
        <p className="text-gray-600">
          Chatbot interface will be implemented here
        </p>
      </div>
    </div>
  );
}
