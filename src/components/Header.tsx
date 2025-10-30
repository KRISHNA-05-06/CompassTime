import { useState } from "react";
import { Bell, ArrowLeft, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { type Message } from "../utils/sharedState";

interface HeaderProps {
  title?: string; // If provided, shows simple header with title; if not, shows greeting with notification
  onNotificationClick?: () => void;
  unreadCount?: number;
  newMessages?: Message[];
  onMessageClick?: (messageId: string) => void;
  onViewAllClick?: () => void;
}

export function Header({ 
  title,
  unreadCount = 0, 
  newMessages = [],
  onMessageClick,
  onViewAllClick
}: HeaderProps) {
  const currentDate = new Date();
  const month = currentDate.toLocaleDateString('en-US', { month: 'short' });
  const day = currentDate.getDate().toString().padStart(2, '0');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleBackToList = () => {
    // Mark the message as read when going back to the list
    if (selectedMessage && onMessageClick) {
      onMessageClick(selectedMessage.id);
    }
    setSelectedMessage(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset selected message when closing
      setSelectedMessage(null);
    }
  };

  // If title is provided, show greeting with page name below
  if (title) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">MA</span>
            </div>
            <div>
              <h1 className="text-lg">{getGreeting()}, Manasa</h1>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-xs opacity-80">{month}</div>
            <div className="text-2xl font-medium">{day}</div>
          </div>
          <div>
            <span className="text-sm opacity-90">{title}</span>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show greeting with notification bell (HomePage)
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">MA</span>
          </div>
          <div>
            <h1 className="text-lg">{getGreeting()}, Manasa</h1>
          </div>
        </div>
        
        <Popover open={isOpen} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <button 
              className="relative hover:opacity-80 transition-opacity"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-80 p-0 mr-4" 
            align="end"
            sideOffset={8}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {selectedMessage ? (
                // Message Detail View
                <>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3">
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={handleBackToList}
                        className="flex items-center gap-2 hover:opacity-80"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Back to Messages</span>
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="hover:opacity-80 p-1"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <h3 className="font-medium">{selectedMessage.subject}</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto p-4">
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm text-gray-900">{selectedMessage.from}</div>
                          <div className="text-xs text-gray-500">To: Manasa Alla</div>
                        </div>
                        <span className="text-xs text-gray-500">{selectedMessage.timestamp}</span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 whitespace-pre-line">
                      {selectedMessage.content}
                    </div>
                  </div>
                </>
              ) : (
                // Message List View
                <>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">New Messages</h3>
                        <p className="text-xs opacity-90">{unreadCount} unread</p>
                      </div>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="hover:opacity-80 p-1"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {newMessages.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No new messages</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {newMessages.map((message) => (
                          <button
                            key={message.id}
                            onClick={() => handleMessageClick(message)}
                            className="w-full p-3 hover:bg-blue-50 transition-colors text-left"
                          >
                            <div className="flex items-start justify-between mb-1">
                              <span className="text-sm text-gray-900">{message.from}</span>
                              <span className="text-xs text-gray-500">{message.timestamp}</span>
                            </div>
                            <div className="text-sm text-blue-600 mb-1">{message.subject}</div>
                            <div className="text-xs text-gray-500 line-clamp-2">{message.preview}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {newMessages.length > 0 && (
                    <div className="border-t border-gray-100 p-2">
                      <button
                        onClick={onViewAllClick}
                        className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2"
                      >
                        View All Messages
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-xs opacity-80">{month}</div>
          <div className="text-2xl font-medium">{day}</div>
        </div>
        <div>
          <span className="text-sm opacity-90">No Schedules!</span>
        </div>
      </div>
    </div>
  );
}