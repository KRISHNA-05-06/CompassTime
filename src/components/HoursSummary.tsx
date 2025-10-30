interface HoursSummaryProps {
  scheduledHours: number;
  workedHours: number;
  currentPay: number;
}

export function HoursSummary({ scheduledHours, workedHours, currentPay }: HoursSummaryProps) {
  // Calculate current pay period (assuming weekly, Sunday to Saturday)
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Get Sunday of current week
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - currentDay);
  
  // Get Saturday of current week
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  };

  return (
    <div className="px-4 mb-6">
      <div className="text-center mb-4">
        <h3 className="text-gray-600 mb-1">
          Pay Period: {formatDate(sunday)} - {formatDate(saturday)}
        </h3>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-center flex-1">
          <div className="text-3xl text-gray-800">{scheduledHours.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Scheduled Hours</div>
        </div>
        
        <div className="text-center flex-1">
          <div className="text-3xl text-gray-800">{workedHours.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Worked Hours</div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-gray-200">
        <div className="text-2xl text-green-600">${currentPay.toFixed(2)}</div>
        <div className="text-sm text-gray-500">Current Pay</div>
      </div>
    </div>
  );
}
