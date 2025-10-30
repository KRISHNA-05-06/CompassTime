import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Clock, Coffee } from "lucide-react";

interface ClockInButtonProps {
  onClockOut: (additionalHours: number) => void;
  onStateChange: (
    state: 'clocked-out' | 'clocked-in' | 'on-meal' | 'meal-ended',
    times: {
      clockIn?: Date | null;
      mealStart?: Date | null;
      mealEnd?: Date | null;
      clockOut?: Date | null;
    }
  ) => void;
}

type ClockState = 'clocked-out' | 'clocked-in' | 'on-meal' | 'meal-ended';

export function ClockInButton({ onClockOut, onStateChange }: ClockInButtonProps) {
  const [clockState, setClockState] = useState<ClockState>('clocked-out');
  const [workSeconds, setWorkSeconds] = useState(0);
  const [mealSeconds, setMealSeconds] = useState(0);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [mealStartTime, setMealStartTime] = useState<Date | null>(null);
  const [mealEndTime, setMealEndTime] = useState<Date | null>(null);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);

  // Timer for work hours
  useEffect(() => {
    if (clockState === 'clocked-in' || clockState === 'meal-ended') {
      const interval = setInterval(() => {
        setWorkSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clockState]);

  // Timer for meal
  useEffect(() => {
    if (clockState === 'on-meal') {
      const interval = setInterval(() => {
        setMealSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [clockState]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const handleClockIn = () => {
    const now = new Date();
    setClockInTime(now);
    setClockState('clocked-in');
    onStateChange('clocked-in', { clockIn: now });
  };

  const handleMealStart = () => {
    const now = new Date();
    setMealStartTime(now);
    setClockState('on-meal');
    onStateChange('on-meal', { mealStart: now });
  };

  const handleMealEnd = () => {
    const now = new Date();
    setMealEndTime(now);
    setClockState('meal-ended');
    onStateChange('meal-ended', { mealEnd: now });
  };

  const handleClockOut = () => {
    const now = new Date();
    setClockOutTime(now);
    onStateChange('clocked-out', { clockOut: now });
    setShowSummaryDialog(true);
  };

  const confirmClockOut = () => {
    const totalHours = workSeconds / 3600;
    const scheduledHours = 20;
    
    // Check if exceeded scheduled hours
    if (totalHours > scheduledHours) {
      alert(`Warning: You have exceeded your scheduled hours! Worked: ${totalHours.toFixed(2)} hours, Scheduled: ${scheduledHours} hours`);
    }
    
    // Update worked hours and current pay
    onClockOut(totalHours);
    
    // Reset state
    setClockState('clocked-out');
    setWorkSeconds(0);
    setMealSeconds(0);
    setClockInTime(null);
    setMealStartTime(null);
    setMealEndTime(null);
    setClockOutTime(null);
    setShowSummaryDialog(false);
    onStateChange('clocked-out', { 
      clockIn: null, 
      mealStart: null, 
      mealEnd: null, 
      clockOut: null 
    });
  };

  const cancelClockOut = () => {
    setClockOutTime(null);
    setShowSummaryDialog(false);
    // Revert to previous state
    if (mealEndTime) {
      setClockState('meal-ended');
      onStateChange('meal-ended', {});
    } else if (mealStartTime) {
      setClockState('on-meal');
      onStateChange('on-meal', {});
    } else {
      setClockState('clocked-in');
      onStateChange('clocked-in', {});
    }
  };

  return (
    <div className="flex flex-col items-center py-8">
      {/* Main Clock In/Out Button */}
      <div className="mb-4">
        {clockState === 'clocked-out' ? (
          <Button
            onClick={handleClockIn}
            className="w-32 h-32 rounded-full text-white shadow-lg transition-all duration-200 bg-blue-400 hover:bg-blue-500"
          >
            Clock In
          </Button>
        ) : (
          <Button
            onClick={handleClockOut}
            className="w-32 h-32 rounded-full text-white shadow-lg transition-all duration-200 bg-red-500 hover:bg-red-600"
          >
            Clock Out
          </Button>
        )}
      </div>

      {/* Work Timer Display */}
      {(clockState === 'clocked-in' || clockState === 'meal-ended') && (
        <div className="bg-blue-50 px-6 py-3 rounded-lg mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-xs text-gray-600">Work Time</div>
            <div className="text-xl text-blue-600">{formatTime(workSeconds)}</div>
          </div>
        </div>
      )}

      {/* Meal Timer Display */}
      {clockState === 'on-meal' && (
        <div className="bg-orange-50 px-6 py-3 rounded-lg mb-4 flex items-center gap-2">
          <Coffee className="w-5 h-5 text-orange-600" />
          <div>
            <div className="text-xs text-gray-600">Meal Break</div>
            <div className="text-xl text-orange-600">{formatTime(mealSeconds)}</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {clockState === 'clocked-in' && (
          <Button
            onClick={handleMealStart}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Coffee className="w-4 h-4" />
            Meal Start
          </Button>
        )}
        
        {clockState === 'on-meal' && (
          <Button
            onClick={handleMealEnd}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Coffee className="w-4 h-4" />
            Meal End
          </Button>
        )}
      </div>

      {/* Clock Out Summary Dialog */}
      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clock Out Summary</DialogTitle>
            <DialogDescription>
              Review your work session details
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Clocked In:</span>
                <span className="text-gray-800">{clockInTime && formatDateTime(clockInTime)}</span>
              </div>
              
              {mealStartTime && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Meal Start:</span>
                  <span className="text-gray-800">{formatDateTime(mealStartTime)}</span>
                </div>
              )}
              
              {mealEndTime && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Meal End:</span>
                  <span className="text-gray-800">{formatDateTime(mealEndTime)}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Clocked Out:</span>
                <span className="text-gray-800">{clockOutTime && formatDateTime(clockOutTime)}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Total Work Time:</span>
                <span className="text-blue-600">{formatTime(workSeconds)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Hours:</span>
                <span className="text-blue-600">{(workSeconds / 3600).toFixed(2)} hrs</span>
              </div>
            </div>

            {mealSeconds > 0 && (
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Meal Time:</span>
                  <span className="text-orange-600">{formatTime(mealSeconds)}</span>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                onClick={cancelClockOut}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmClockOut}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Confirm Clock Out
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
