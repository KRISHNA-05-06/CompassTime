import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChevronRight, MapPin, Clock, Calendar, ArrowLeftRight } from "lucide-react";

interface Shift {
  id: string;
  position: string;
  location: string;
  organization: string;
  day: string;
  date: string;
  startTime: string;
  endTime: string;
}

// Generate mock data for open shifts in Juniper Poplar organization
const generateJuniperPoplarShifts = (): Shift[] => {
  const positions = ["Cashier", "Server", "Barista", "Food Prep", "Host/Hostess"];
  const juniperLocations = ["Juniper Poplar - Main", "Juniper Poplar - Café", "Juniper Poplar - Express"];
  const times = [
    { start: "8:00 AM", end: "4:00 PM" },
    { start: "12:00 PM", end: "8:00 PM" },
    { start: "10:00 AM", end: "6:00 PM" },
    { start: "9:00 AM", end: "5:00 PM" },
    { start: "1:00 PM", end: "9:00 PM" },
  ];

  const shifts: Shift[] = [];
  const today = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Generate 5 shifts over the next week
  for (let i = 0; i < 5; i++) {
    const shiftDate = new Date(today);
    shiftDate.setDate(today.getDate() + (i % 7) + 1);

    const timeSlot = times[i % times.length];
    
    shifts.push({
      id: (i + 1).toString(),
      position: positions[i % positions.length],
      location: juniperLocations[i % juniperLocations.length],
      organization: "Juniper Poplar",
      day: dayNames[shiftDate.getDay()],
      date: shiftDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      startTime: timeSlot.start,
      endTime: timeSlot.end,
    });
  }

  return shifts;
};

const juniperShifts: Shift[] = generateJuniperPoplarShifts();

export function ShiftTradeRequests() {
  const [expanded, setExpanded] = useState(false);
  const [requestedShifts, setRequestedShifts] = useState<Set<string>>(new Set());

  const handleTradeRequest = (shiftId: string) => {
    setRequestedShifts(prev => new Set(prev).add(shiftId));
  };

  if (!expanded) {
    return (
      <Card className="mx-4 mb-4">
        <button
          onClick={() => setExpanded(true)}
          className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <h3 className="text-gray-700">Shift Trade Requests</h3>
            <Badge variant="destructive" className="bg-blue-600">
              {juniperShifts.length}
            </Badge>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </Card>
    );
  }

  return (
    <Card className="mx-4 mb-4">
      <div className="p-4">
        <button
          onClick={() => setExpanded(false)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-700">Available Shifts - Juniper Poplar</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-90" />
        </button>

        <div className="text-xs text-gray-500 mb-3 bg-blue-50 p-2 rounded">
          Showing open shifts only in your current organization
        </div>

        <div className="space-y-3">
          {juniperShifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-gray-50 rounded-lg p-3 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-gray-800 mb-1">{shift.position}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    {shift.location}
                  </div>
                </div>
                <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                  {shift.organization}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <div>
                    <div>{shift.day}</div>
                    <div className="text-xs text-gray-500">{shift.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  <div>
                    <div>{shift.startTime}</div>
                    <div className="text-xs text-gray-500">to {shift.endTime}</div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleTradeRequest(shift.id)}
                disabled={requestedShifts.has(shift.id)}
                className={`w-full px-3 py-2 rounded-lg text-xs transition-colors ${
                  requestedShifts.has(shift.id)
                    ? 'bg-green-100 text-green-700 border border-green-300 cursor-default'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {requestedShifts.has(shift.id) ? 'Trade Requested' : 'Request Trade'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}