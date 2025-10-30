import { useState } from "react";
import { ChevronLeft, Mail, MailOpen, Send, Inbox, ChevronRight } from "lucide-react";
import { Header } from "../Header";
import { Button } from "../ui/button";
import { type Message } from "../../utils/sharedState";
import { toast } from "sonner";

interface MessagingSectionProps {
  onBack: () => void;
  newMessages: Message[];
  oldMessages: Message[];
  sentMessages: Message[];
  onMessageRead: (messageId: string) => void;
  onSendMessage: (recipient: string, subject: string, content: string) => void;
}

export function MessagingSection({ onBack, newMessages, oldMessages, sentMessages, onMessageRead, onSendMessage }: MessagingSectionProps) {
  const [activeView, setActiveView] = useState<'menu' | 'new' | 'write' | 'old' | 'sent'>('menu');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const unreadCount = newMessages.length;

  const menuItems = [
    { id: 'new', icon: Mail, label: 'New', description: 'Unread messages', count: unreadCount },
    { id: 'write', icon: Send, label: 'Write', description: 'Compose new message', count: 0 },
    { id: 'old', icon: MailOpen, label: 'Old', description: 'Read messages', count: 0 },
    { id: 'sent', icon: Inbox, label: 'Sent', description: 'Sent messages', count: 0 },
  ];

  const handleMessageClick = (message: Message) => {
    // Mark message as read if it's from new messages
    if (!message.read && activeView === 'new') {
      onMessageRead(message.id);
    }
    setSelectedMessage(message);
  };

  const MessageDetail = ({ message }: { message: Message }) => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title={message.subject} />
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <button 
            onClick={() => setSelectedMessage(null)} 
            className="flex items-center gap-2 text-blue-600 mb-4"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
            <div>
              <div className="text-gray-900">{message.from}</div>
              <div className="text-sm text-gray-500">{message.timestamp}</div>
            </div>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );

  const MessageList = ({ messages, title }: { messages: Message[], title: string }) => {
    const isSentMessages = title === 'Sent Messages';
    
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title={title} />
        <div className="bg-white border-b border-gray-200">
          <div className="p-4">
            <button onClick={() => setActiveView('menu')} className="flex items-center gap-2 text-blue-600 mb-4">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleMessageClick(message)}
                className={`bg-white rounded-lg p-4 cursor-pointer hover:bg-gray-50 border ${
                  message.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className={`${message.read ? 'text-gray-900' : 'text-blue-900'}`}>
                    {isSentMessages ? `To: ${message.to || 'Unknown'}` : message.from}
                  </span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <div className={`text-sm mb-1 ${message.read ? 'text-gray-700' : 'text-blue-800'}`}>
                  {message.subject}
                </div>
                <div className="text-sm text-gray-500 truncate">{message.preview}</div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const WriteMessage = () => {
    const [recipient, setRecipient] = useState("");
    const [subject, setSubject] = useState("");
    const [messageBody, setMessageBody] = useState("");

    const handleSend = () => {
      // Get recipient name for display
      const recipientNames: Record<string, string> = {
        'supervisor': 'My Supervisor',
        'michael': 'Michael Chen',
        'hr': 'HR Department',
        'jennifer': 'Jennifer Martinez'
      };
      
      const recipientName = recipientNames[recipient] || recipient;
      
      // Send the message
      onSendMessage(recipientName, subject, messageBody);
      
      // Show success toast
      toast.success("Message sent successfully!");
      
      // Clear form
      setRecipient("");
      setSubject("");
      setMessageBody("");
      
      // Navigate to sent messages after a brief delay
      setTimeout(() => {
        setActiveView('sent');
      }, 800);
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Write Message" />
        <div className="bg-white border-b border-gray-200">
          <div className="p-4">
            <button onClick={() => setActiveView('menu')} className="flex items-center gap-2 text-blue-600 mb-4">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">To</label>
              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select recipient</option>
                <option value="supervisor">My Supervisor</option>
                <option value="michael">Michael Chen</option>
                <option value="hr">HR Department</option>
                <option value="jennifer">Jennifer Martinez</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="Type your message here..."
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              onClick={handleSend}
              disabled={!recipient || !subject || !messageBody}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    // If a message is selected, show the detail view
    if (selectedMessage) {
      return <MessageDetail message={selectedMessage} />;
    }

    switch (activeView) {
      case 'new':
        return <MessageList messages={newMessages} title="New Messages" />;
      case 'write':
        return <WriteMessage />;
      case 'old':
        return <MessageList messages={oldMessages} title="Old Messages" />;
      case 'sent':
        return <MessageList messages={sentMessages} title="Sent Messages" />;
      default:
        return (
          <div className="min-h-screen bg-gray-50 pb-20">
            <Header title="Messaging" />
            <div className="bg-white border-b border-gray-200">
              <div className="p-4">
                <button onClick={onBack} className="flex items-center gap-2 text-blue-600 mb-4">
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <p className="text-sm text-gray-500 mt-1">Communicate with supervisors and co-workers</p>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as any)}
                    className="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-gray-900 flex items-center gap-2">
                          {item.label}
                          {item.id === 'new' && item.count > 0 && (
                            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                              {item.count}
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

  return renderContent();
}