import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { SchedulePage } from "./components/SchedulePage";
import { TimesheetPage } from "./components/TimesheetPage";
import { OpenShiftsPage } from "./components/OpenShiftsPage";
import { MorePage } from "./components/MorePage";
import { BottomNavigation } from "./components/BottomNavigation";
import { INITIAL_NEW_MESSAGES, INITIAL_OLD_MESSAGES, INITIAL_SENT_MESSAGES, type Message } from "./utils/sharedState";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [newMessages, setNewMessages] = useState<Message[]>(INITIAL_NEW_MESSAGES);
  const [oldMessages, setOldMessages] = useState<Message[]>(INITIAL_OLD_MESSAGES);
  const [sentMessages, setSentMessages] = useState<Message[]>(INITIAL_SENT_MESSAGES);

  const handleMessageRead = (messageId: string) => {
    // Find the message in new messages
    const message = newMessages.find(m => m.id === messageId);
    if (message) {
      // Move to old messages
      setOldMessages(prev => [{ ...message, read: true }, ...prev]);
      // Remove from new messages
      setNewMessages(prev => prev.filter(m => m.id !== messageId));
    }
  };

  const handleSendMessage = (recipient: string, subject: string, content: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    
    const newMessage: Message = {
      id: `sent-${Date.now()}`,
      from: 'You',
      to: recipient,
      subject: subject,
      preview: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
      content: content,
      timestamp: timestamp,
      read: true
    };

    setSentMessages(prev => [newMessage, ...prev]);
  };

  const handleViewAllMessages = () => {
    setActiveTab('more');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage 
          unreadCount={newMessages.length}
          newMessages={newMessages}
          onMessageClick={handleMessageRead}
          onViewAllMessages={handleViewAllMessages}
        />;
      case 'schedule':
        return <SchedulePage />;
      case 'timesheet':
        return <TimesheetPage />;
      case 'openshifts':
        return <OpenShiftsPage />;
      case 'more':
        return <MorePage 
          newMessages={newMessages}
          oldMessages={oldMessages}
          sentMessages={sentMessages}
          onMessageRead={handleMessageRead}
          onSendMessage={handleSendMessage}
        />;
      default:
        return <HomePage 
          unreadCount={newMessages.length}
          newMessages={newMessages}
          onMessageClick={handleMessageRead}
          onViewAllMessages={handleViewAllMessages}
        />;
    }
  };

  return (
    <div>
      {renderPage()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Toaster position="top-center" />
    </div>
  );
}