import { Home, Calendar, Clock, Briefcase, MoreHorizontal } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Calendar, label: 'Schedule', id: 'schedule' },
    { icon: Clock, label: 'Timesheet', id: 'timesheet' },
    { icon: Briefcase, label: 'Open Shifts', id: 'openshifts' },
    { icon: MoreHorizontal, label: 'More', id: 'more' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={index}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 p-2 ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}