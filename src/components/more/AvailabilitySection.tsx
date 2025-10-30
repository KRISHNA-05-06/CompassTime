import { useState } from "react";
import { ChevronLeft, Clock, Save } from "lucide-react";
import { Header } from "../Header";
import { Button } from "../ui/button";

interface AvailabilitySectionProps {
  onBack: () => void;
}

interface DayAvailability {
  available: boolean;
  startTime: string;
  endTime: string;
}

export function AvailabilitySection({ onBack }: AvailabilitySectionProps) {
  const [availability, setAvailability] = useState<Record<string, DayAvailability>>({
    monday: { available: true, startTime: '09:00', endTime: '17:00' },
    tuesday: { available: true, startTime: '09:00', endTime: '17:00' },
    wednesday: { available: true, startTime: '09:00', endTime: '17:00' },
    thursday: { available: true, startTime: '09:00', endTime: '17:00' },
    friday: { available: true, startTime: '09:00', endTime: '17:00' },
    saturday: { available: false, startTime: '09:00', endTime: '17:00' },
    sunday: { available: false, startTime: '09:00', endTime: '17:00' },
  });

  const [saved, setSaved] = useState(false);

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const handleAvailabilityChange = (day: string, field: keyof DayAvailability, value: boolean | string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Availability" />
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-600 mb-4">
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <p className="text-sm text-gray-500 mt-1">Set your weekly availability for shifts</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {days.map(({ key, label }) => (
          <div key={key} className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-900">{label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={availability[key].available}
                  onChange={(e) => handleAvailabilityChange(key, 'available', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {availability[key].available && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Start Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={availability[key].startTime}
                      onChange={(e) => handleAvailabilityChange(key, 'startTime', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">End Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="time"
                      value={availability[key].endTime}
                      onChange={(e) => handleAvailabilityChange(key, 'endTime', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <Button 
          onClick={handleSave}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Save className="w-4 h-4 mr-2" />
          {saved ? 'Saved!' : 'Save Availability'}
        </Button>
      </div>
    </div>
  );
}
