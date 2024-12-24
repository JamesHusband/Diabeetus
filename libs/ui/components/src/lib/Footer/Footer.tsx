import {
  Home,
  TrendingUp,
  Activity,
  PieChart,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@diabetus/ui/elements';

interface FooterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Footer({ activeTab, onTabChange }: FooterProps) {
  return (
    <nav className="bg-white shadow-lg fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around">
          <Button
            onClick={() => onTabChange('home')}
            variant="ghost"
            className={activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'}
            aria-label="Home"
          >
            <Home className="h-6 w-6 mx-auto" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            onClick={() => onTabChange('trends')}
            variant="ghost"
            className={
              activeTab === 'trends' ? 'text-blue-500' : 'text-gray-500'
            }
            aria-label="Trends"
          >
            <TrendingUp className="h-6 w-6 mx-auto" />
            <span className="text-xs">Trends</span>
          </Button>
          <Button
            onClick={() => onTabChange('glucose')}
            variant="ghost"
            className={
              activeTab === 'glucose' ? 'text-blue-500' : 'text-gray-500'
            }
            aria-label="Glucose"
          >
            <Activity className="h-6 w-6 mx-auto" />
            <span className="text-xs">Glucose</span>
          </Button>
          <Button
            onClick={() => onTabChange('carbs')}
            variant="ghost"
            className={
              activeTab === 'carbs' ? 'text-blue-500' : 'text-gray-500'
            }
            aria-label="Carbs"
          >
            <PieChart className="h-6 w-6 mx-auto" />
            <span className="text-xs">Carbs</span>
          </Button>
          <Button
            onClick={() => onTabChange('chat')}
            variant="ghost"
            className={activeTab === 'chat' ? 'text-blue-500' : 'text-gray-500'}
            aria-label="Chat"
          >
            <MessageSquare className="h-6 w-6 mx-auto" />
            <span className="text-xs">Chat</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
