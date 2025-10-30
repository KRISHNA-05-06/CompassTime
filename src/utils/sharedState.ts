// Shared state for hours across the application
export const SCHEDULED_HOURS = 20.0;
export const INITIAL_WORKED_HOURS = 16.0;
export const HOURLY_RATE = 14;

// Message interface
export interface Message {
  id: string;
  from: string;
  to?: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Initial messages state
export const INITIAL_NEW_MESSAGES: Message[] = [
  {
    id: "1",
    from: "Michael Chen",
    subject: "Schedule Update",
    preview: "Your schedule for next week has been updated. Please review the changes and let me know if you have any conflicts.",
    content: "Hi Manasa,\n\nYour schedule for next week has been updated. Please review the changes and let me know if you have any conflicts.\n\nChanges include:\n- Monday: 9:00 AM - 5:00 PM (was 10:00 AM - 6:00 PM)\n- Wednesday: 12:00 PM - 8:00 PM (was off)\n- Friday: Off (was 9:00 AM - 5:00 PM)\n\nPlease confirm that these changes work for you.\n\nThanks,\nMichael",
    timestamp: "2 hours ago",
    read: false
  },
  {
    id: "2",
    from: "HR Department",
    subject: "Time Off Request Approved",
    preview: "Your time off request for Oct 25-26 has been approved. Enjoy your time off!",
    content: "Dear Manasa,\n\nYour time off request for October 25-26 has been approved.\n\nDetails:\n- Start Date: October 25, 2025\n- End Date: October 26, 2025\n- Total Days: 2\n- Remaining PTO Balance: 8 days\n\nEnjoy your time off!\n\nBest regards,\nHR Department",
    timestamp: "5 hours ago",
    read: false
  },
  {
    id: "3",
    from: "Jennifer Martinez",
    subject: "Team Meeting Reminder",
    preview: "Reminder: Team meeting tomorrow at 10:00 AM in the main conference room. Please bring your weekly reports.",
    content: "Hi Team,\n\nThis is a reminder about our team meeting tomorrow.\n\nDetails:\n- Date: Tomorrow\n- Time: 10:00 AM\n- Location: Main Conference Room\n- Duration: 1 hour\n\nPlease bring:\n- Weekly reports\n- Project updates\n- Any questions or concerns\n\nLooking forward to seeing everyone there!\n\nBest,\nJennifer",
    timestamp: "1 day ago",
    read: false
  }
];

export const INITIAL_OLD_MESSAGES: Message[] = [
  {
    id: "4",
    from: "Michael Chen",
    subject: "Shift Coverage",
    preview: "Thanks for covering the shift last Friday. Really appreciate your help with the last-minute change.",
    content: "Hi Manasa,\n\nThanks for covering the shift last Friday. Really appreciate your help with the last-minute change.\n\nYour flexibility is invaluable to the team!\n\nBest,\nMichael",
    timestamp: "3 days ago",
    read: true
  },
  {
    id: "5",
    from: "Emily Davis",
    subject: "Training Session",
    preview: "Don't forget about the training session next week on Tuesday at 2:00 PM. Attendance is mandatory.",
    content: "Hello,\n\nDon't forget about the training session next week on Tuesday at 2:00 PM. Attendance is mandatory.\n\nTopics covered:\n- New safety protocols\n- Updated customer service guidelines\n- System updates\n\nSee you there!\n\nEmily",
    timestamp: "5 days ago",
    read: true
  }
];

export const INITIAL_SENT_MESSAGES: Message[] = [
  {
    id: "6",
    from: "You",
    to: "Emily Davis",
    subject: "Shift Trade Request",
    preview: "Hi, I was wondering if you'd be interested in trading shifts this weekend. I can take your Sunday shift if you take my Saturday.",
    content: "Hi,\n\nI was wondering if you'd be interested in trading shifts this weekend. I can take your Sunday shift if you take my Saturday.\n\nLet me know if this works for you!\n\nThanks,\nManasa",
    timestamp: "2 days ago",
    read: true
  },
  {
    id: "7",
    from: "You",
    to: "HR Department",
    subject: "Time Off Request",
    preview: "I would like to request time off for Oct 25-26 for a family event. Please let me know if this is possible.",
    content: "Dear HR,\n\nI would like to request time off for Oct 25-26 for a family event. Please let me know if this is possible.\n\nThank you for your consideration.\n\nBest regards,\nManasa Alla",
    timestamp: "1 week ago",
    read: true
  }
];
