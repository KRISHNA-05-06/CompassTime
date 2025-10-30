import { X } from "lucide-react";

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: {
    day: string;
    date: string;
    fullDate: string;
    employees: Array<{
      name: string;
      position: string;
      time: string;
      id: string;
      location: string;
    }>;
  } | null;
}

export function DayDetailModal({ isOpen, onClose, day }: DayDetailModalProps) {
  if (!isOpen || !day) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg">Schedule</h2>
            <button onClick={onClose} className="p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Date */}
          <div className="flex items-center justify-center">
            <span className="text-sm">{day.fullDate}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Day Header */}
          <div className="p-4 border-b">
            <h3 className="font-medium text-lg text-center">
              {day.day}, October {day.date}
            </h3>
          </div>

          {/* All Employees Working Today */}
          <div className="p-4">
            <h4 className="font-medium mb-3 text-gray-700">
              All Staff Working Today ({day.employees.length})
            </h4>
            
            {day.employees.length > 0 ? (
              <div className="space-y-3">
                {day.employees.map((employee, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{employee.name}</div>
                          <div className="text-sm text-gray-500">ID: {employee.id}</div>
                        </div>
                      </div>
                      <div className="ml-13">
                        <div className="text-sm text-gray-600 mb-1">{employee.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{employee.position}</div>
                      <div className="text-sm text-gray-500">{employee.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No staff scheduled for this day</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}