import { useState } from "react";
import { ChevronRight, Users, MapPin, Clock, Calendar } from "lucide-react";
import { Header } from "./Header";

interface Shift {
  id: string;
  position: string;
  location: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  appliedCount: number;
  isOnCampus: boolean;
}

// Generate mock data for open shifts with dynamic dates
const generateMockShifts = (): Shift[] => {
  const positions = ["Cashier", "Server", "Kitchen Staff", "Barista", "Food Prep", "Wok Cook", "Event Staff", "Delivery Driver", "Bartender"];
  const onCampusLocations = ["Chick-fil-A", "Argos", "Juniper", "Flip Kitchen", "Star Bucks", "Subway", "Pannera Bread", "Panda Express"];
  const offCampusLocations = ["Downtown Branch", "Off-Campus Restaurant", "Local Cafe"];
  const times = [
    { start: "8:00 AM", end: "4:00 PM" },
    { start: "12:00 PM", end: "8:00 PM" },
    { start: "10:00 AM", end: "6:00 PM" },
    { start: "6:00 AM", end: "2:00 PM" },
    { start: "9:00 AM", end: "5:00 PM" },
    { start: "1:00 PM", end: "9:00 PM" },
    { start: "5:00 PM", end: "11:00 PM" },
    { start: "4:00 PM", end: "10:00 PM" },
    { start: "2:00 PM", end: "10:00 PM" },
  ];

  const shifts: Shift[] = [];
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Generate 11 shifts over the next week
  for (let i = 0; i < 11; i++) {
    const shiftDate = new Date(today);
    shiftDate.setDate(today.getDate() + (i % 7) + 1); // Next 7 days, cycling

    const isOnCampus = i < 8; // First 8 are on campus
    const location = isOnCampus 
      ? onCampusLocations[i % onCampusLocations.length]
      : offCampusLocations[i % offCampusLocations.length];
    
    const timeSlot = times[i % times.length];
    
    shifts.push({
      id: (i + 1).toString(),
      position: positions[i % positions.length],
      location: location,
      day: dayNames[shiftDate.getDay()],
      date: shiftDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      startTime: timeSlot.start,
      endTime: timeSlot.end,
      appliedCount: Math.floor(Math.random() * 8) + 1,
      isOnCampus: isOnCampus
    });
  }

  return shifts;
};

const mockShifts: Shift[] = generateMockShifts();

export function OpenShiftsPage() {
  const [view, setView] = useState<'menu' | 'all' | 'oncampus'>('menu');
  const [appliedShifts, setAppliedShifts] = useState<Set<string>>(new Set());
  const [appliedCounts, setAppliedCounts] = useState<Record<string, number>>({});

  const handleApply = (shiftId: string) => {
    setAppliedShifts(prev => new Set([...prev, shiftId]));
    setAppliedCounts(prev => ({
      ...prev,
      [shiftId]: (prev[shiftId] || 0) + 1
    }));
  };

  const renderMenu = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header title="Open Shifts" />
      
      <div className="p-6 space-y-4">
        
        <button
          onClick={() => setView('all')}
          className="w-full bg-white rounded-lg p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-gray-800">All Open Shifts</div>
              <div className="text-sm text-gray-500">On campus & off campus</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => setView('oncampus')}
          className="w-full bg-white rounded-lg p-5 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-gray-800">On Campus Open Shifts</div>
              <div className="text-sm text-gray-500">Campus locations only</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  );

  const renderShiftsList = (shifts: Shift[]) => (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header title={view === 'all' ? 'All Open Shifts' : 'On Campus Open Shifts'} />
      
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setView('menu')}
            className="text-blue-600 hover:text-blue-700"
          >
            ← Back
          </button>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          {shifts.length} shift{shifts.length !== 1 ? 's' : ''} available
        </div>

        <div className="space-y-3">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-gray-800 mb-1">{shift.position}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {shift.location}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  shift.isOnCampus 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-orange-100 text-orange-700'
                }`}>
                  {shift.isOnCampus ? 'On Campus' : 'Off Campus'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <div>{shift.day}</div>
                    <div className="text-xs text-gray-500">{shift.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <div>
                    <div>{shift.startTime}</div>
                    <div className="text-xs text-gray-500">to {shift.endTime}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{shift.appliedCount + (appliedCounts[shift.id] || 0)} applied</span>
                </div>
                <button 
                  onClick={() => handleApply(shift.id)}
                  disabled={appliedShifts.has(shift.id)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    appliedShifts.has(shift.id)
                      ? 'bg-green-600 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {appliedShifts.has(shift.id) ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (view === 'menu') {
    return renderMenu();
  }

  const filteredShifts = view === 'all' 
    ? mockShifts 
    : mockShifts.filter(shift => shift.isOnCampus);

  return renderShiftsList(filteredShifts);
}
