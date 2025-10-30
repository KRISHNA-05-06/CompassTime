import { useState } from "react";
import { X, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface ShiftDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  shift: {
    location: string;
    time: string;
    date: string;
    employeeId: string;
    scheduleStart: string;
    scheduleEnd: string;
    mealStart: string;
    mealEnd: string;
    address: string;
  } | null;
}

export function ShiftDetailModal({ isOpen, onClose, shift }: ShiftDetailModalProps) {
  const [actionType, setActionType] = useState<'release' | 'swap' | 'offer' | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [actionComplete, setActionComplete] = useState(false);

  const handleAction = (type: 'release' | 'swap' | 'offer') => {
    setActionType(type);
    setShowConfirmation(true);
  };

  const confirmAction = () => {
    setShowConfirmation(false);
    setActionComplete(true);
    setTimeout(() => {
      setActionComplete(false);
      setActionType(null);
      onClose();
    }, 2000);
  };

  const cancelAction = () => {
    setShowConfirmation(false);
    setActionType(null);
  };

  const getActionText = () => {
    switch (actionType) {
      case 'release':
        return {
          title: 'Release Shift',
          description: 'Are you sure you want to release this shift? It will be made available to other employees.',
          confirmText: 'Release Shift',
          successText: 'Shift released successfully!'
        };
      case 'swap':
        return {
          title: 'Swap Shift',
          description: 'Are you sure you want to request a swap for this shift? Other employees will be able to offer their shifts in exchange.',
          confirmText: 'Request Swap',
          successText: 'Swap request sent successfully!'
        };
      case 'offer':
        return {
          title: 'Offer Shift',
          description: 'Are you sure you want to offer this shift? It will be available for other employees to pick up.',
          confirmText: 'Offer Shift',
          successText: 'Shift offered successfully!'
        };
      default:
        return { title: '', description: '', confirmText: '', successText: '' };
    }
  };
  const employeesWorkingToday = [
    { name: "Manasa A.", position: "Server", time: "8:15 AM - 4:15 PM", id: "65462" },
    { name: "John D.", position: "Cook", time: "7:00 AM - 3:00 PM", id: "65463" },
    { name: "Sarah M.", position: "Host", time: "10:00 AM - 6:00 PM", id: "65464" },
    { name: "Mike R.", position: "Server", time: "2:00 PM - 10:00 PM", id: "65465" },
    { name: "Lisa K.", position: "Manager", time: "9:00 AM - 5:00 PM", id: "65466" },
    { name: "Tom B.", position: "Dishwasher", time: "8:00 AM - 4:00 PM", id: "65467" },
    { name: "Amy C.", position: "Server", time: "11:00 AM - 7:00 PM", id: "65468" },
    { name: "David L.", position: "Bartender", time: "4:00 PM - 12:00 AM", id: "65469" }
  ];

  if (!isOpen || !shift) return null;

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
          
          {/* Week Navigation */}
          <div className="flex items-center justify-center">
            <span className="text-sm">{shift.date}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Shift Details */}
          <div className="p-4 border-b">
            <h3 className="font-medium text-lg mb-2">{shift.location}</h3>
            <p className="text-sm text-gray-600 mb-4">{shift.employeeId}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">Schedule Start</div>
                <div className="font-medium">{shift.scheduleStart}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Schedule End</div>
                <div className="font-medium">{shift.scheduleEnd}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Meal Start</div>
                <div className="font-medium">{shift.mealStart}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Meal End</div>
                <div className="font-medium">{shift.mealEnd}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-1">Address:</div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                <a href="#" className="text-blue-600 text-sm underline">
                  {shift.address}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                onClick={() => handleAction('release')}
              >
                Release
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                onClick={() => handleAction('swap')}
              >
                Swap
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-green-50 hover:text-green-600 hover:border-green-300"
                onClick={() => handleAction('offer')}
              >
                Offer
              </Button>
            </div>
          </div>

          {/* All Employees Working Today */}
          <div className="p-4">
            <h4 className="font-medium mb-3 text-gray-700">All Staff Working Today</h4>
            <div className="space-y-3">
              {employeesWorkingToday.map((employee, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">{employee.name}</div>
                        <div className="text-xs text-gray-500">ID: {employee.id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{employee.position}</div>
                    <div className="text-xs text-gray-500">{employee.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg w-full max-w-sm p-6">
              <h3 className="text-lg mb-2">{getActionText().title}</h3>
              <p className="text-sm text-gray-600 mb-6">
                {getActionText().description}
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={cancelAction}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={confirmAction}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {getActionText().confirmText}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {actionComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-lg w-full max-w-sm p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-900">{getActionText().successText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}