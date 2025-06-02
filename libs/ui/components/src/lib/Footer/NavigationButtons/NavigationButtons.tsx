import { Button } from '@diabetus/ui/elements';
import {
  Home,
  TrendingUp,
  Activity,
  PieChart,
  MessageSquare,
} from 'lucide-react';

interface NavigationButtonsProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function NavigationButtons({
  activeSection,
  onNavigate,
}: NavigationButtonsProps) {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'glucose', label: 'Glucose', icon: Activity },
    { id: 'carbs', label: 'Carbs', icon: PieChart },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
  ];

  return (
    <div className="grid grid-cols-5 w-full">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <Button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex flex-col items-center py-4 h-auto min-h-[4rem] rounded-none border-r last:border-r-0 border-border ${
              isActive
                ? 'bg-white text-black hover:bg-gray-100'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={item.label}
          >
            <Icon className="h-7 w-7 mb-1.5" />
            <span className="text-sm font-medium">{item.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
