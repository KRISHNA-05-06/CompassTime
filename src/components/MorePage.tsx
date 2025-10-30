import { useState } from "react";
import { Header } from "./Header";
import { ProfileSection } from "./more/ProfileSection";
import { AvailabilitySection } from "./more/AvailabilitySection";
import { StaffDirectorySection } from "./more/StaffDirectorySection";
import { MessagingSection } from "./more/MessagingSection";
import { PaystubsSection } from "./more/PaystubsSection";
import { TimeOffSection } from "./more/TimeOffSection";
import { type Message } from "../utils/sharedState";
import { 
  User, 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  UmbrellaOff,
  ChevronRight
} from "lucide-react";

interface MorePageProps {
  newMessages: Message[];
  oldMessages: Message[];
  sentMessages: Message[];
  onMessageRead: (messageId: string) => void;
  onSendMessage: (recipient: string, subject: string, content: string) => void;
}

export function MorePage({ newMessages, oldMessages, sentMessages, onMessageRead, onSendMessage }: MorePageProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile', description: 'View your personal information' },
    { id: 'availability', icon: Calendar, label: 'Availability', description: 'Set your shift availability' },
    { id: 'staff', icon: Users, label: 'Staff Directory', description: 'View all team members' },
    { id: 'messaging', icon: MessageSquare, label: 'Messaging', description: 'Messages and communication' },
    { id: 'paystubs', icon: FileText, label: 'Paystubs', description: 'View pay documents' },
    { id: 'timeoff', icon: UmbrellaOff, label: 'Time Off', description: 'Request time off' },
  ];

  const unreadCount = newMessages.length;

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection onBack={() => setActiveSection(null)} />;
      case 'availability':
        return <AvailabilitySection onBack={() => setActiveSection(null)} />;
      case 'staff':
        return <StaffDirectorySection onBack={() => setActiveSection(null)} />;
      case 'messaging':
        return <MessagingSection 
          onBack={() => setActiveSection(null)}
          newMessages={newMessages}
          oldMessages={oldMessages}
          sentMessages={sentMessages}
          onMessageRead={onMessageRead}
          onSendMessage={onSendMessage}
        />;
      case 'paystubs':
        return <PaystubsSection onBack={() => setActiveSection(null)} />;
      case 'timeoff':
        return <TimeOffSection onBack={() => setActiveSection(null)} />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="More" />
            <div className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-gray-900 flex items-center gap-2">
                          {item.label}
                          {item.id === 'messaging' && unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {unreadCount}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                );
              })}
            </div>
          </div>
        );
    }
  };

  return renderSection();
}
