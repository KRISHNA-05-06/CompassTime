import { Card } from "./ui/card";

export function UpcomingShifts() {
  // Get Saturday's upcoming shift
  const getNextShift = () => {
    const today = new Date();
    const saturday = new Date(today);
    const daysUntilSaturday = (6 - today.getDay() + 7) % 7;
    saturday.setDate(today.getDate() + (daysUntilSaturday || 7));
    
    return {
      day: saturday.toLocaleDateString('en-US', { weekday: 'short' }),
      date: saturday.getDate().toString().padStart(2, '0'),
      location: 'Central Garden Mid',
      time: '5:00 PM - 9:00 PM'
    };
  };

  const shifts = [getNextShift()];

  return (
    <Card className="mx-4 mb-4">
      <div className="p-4">
        <h3 className="font-medium mb-3 text-gray-700">Upcoming Shifts</h3>
        
        {shifts.map((shift, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500">{shift.day}</div>
              <div className="text-xl">{shift.date}</div>
            </div>
            
            <div className="flex-1">
              <div className="text-gray-800">{shift.location}</div>
              <div className="text-sm text-gray-600">{shift.time}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
