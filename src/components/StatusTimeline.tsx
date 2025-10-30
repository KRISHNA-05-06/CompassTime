interface StatusTimelineProps {
  clockInTime: Date | null;
  mealStartTime: Date | null;
  mealEndTime: Date | null;
  clockOutTime: Date | null;
  currentStatus: 'clocked-out' | 'clocked-in' | 'on-meal' | 'meal-ended';
}

export function StatusTimeline({ 
  clockInTime, 
  mealStartTime, 
  mealEndTime, 
  clockOutTime,
  currentStatus 
}: StatusTimelineProps) {
  const formatTime = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const statuses = [
    { 
      label: 'Clocked In', 
      time: formatTime(clockInTime),
      active: currentStatus === 'clocked-in' || currentStatus === 'on-meal' || currentStatus === 'meal-ended'
    },
    { 
      label: 'Meal Start', 
      time: formatTime(mealStartTime),
      active: currentStatus === 'on-meal' || currentStatus === 'meal-ended'
    },
    { 
      label: 'Meal End', 
      time: formatTime(mealEndTime),
      active: currentStatus === 'meal-ended'
    },
    { 
      label: 'Clocked Out', 
      time: formatTime(clockOutTime),
      active: false
    }
  ];

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
        
        {statuses.map((status) => (
          <div key={status.label} className="flex flex-col items-center relative z-10">
            <div className={`w-4 h-4 rounded-full mb-2 ${
              status.active ? 'bg-blue-500' : 'bg-gray-300'
            }`}></div>
            <span className={`text-xs whitespace-nowrap ${
              status.active ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {status.label}
            </span>
            {status.time && (
              <span className="text-xs text-gray-600 mt-1">
                {status.time}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
