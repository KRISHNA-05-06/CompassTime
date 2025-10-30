import { useState } from "react";
import { Header } from "./Header";
import { ClockInButton } from "./ClockInButton";
import { StatusTimeline } from "./StatusTimeline";
import { HoursSummary } from "./HoursSummary";
import { UpcomingShifts } from "./UpcomingShifts";
import { ShiftTradeRequests } from "./ShiftTradeRequests";
import { SCHEDULED_HOURS, INITIAL_WORKED_HOURS, HOURLY_RATE, type Message } from "../utils/sharedState";

type ClockState = 'clocked-out' | 'clocked-in' | 'on-meal' | 'meal-ended';

interface HomePageProps {
  unreadCount: number;
  newMessages: Message[];
  onMessageClick: (messageId: string) => void;
  onViewAllMessages: () => void;
}

export function HomePage({ unreadCount, newMessages, onMessageClick, onViewAllMessages }: HomePageProps) {
  const [workedHours, setWorkedHours] = useState(INITIAL_WORKED_HOURS);
  const [currentPay, setCurrentPay] = useState(HOURLY_RATE * INITIAL_WORKED_HOURS);
  const [clockState, setClockState] = useState<ClockState>('clocked-out');
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [mealStartTime, setMealStartTime] = useState<Date | null>(null);
  const [mealEndTime, setMealEndTime] = useState<Date | null>(null);
  const [clockOutTime, setClockOutTime] = useState<Date | null>(null);

  const handleClockOut = (additionalHours: number) => {
    const newWorkedHours = workedHours + additionalHours;
    const newCurrentPay = newWorkedHours * HOURLY_RATE;
    setWorkedHours(newWorkedHours);
    setCurrentPay(newCurrentPay);
  };

  const handleStateChange = (
    state: ClockState,
    times: {
      clockIn?: Date | null;
      mealStart?: Date | null;
      mealEnd?: Date | null;
      clockOut?: Date | null;
    }
  ) => {
    setClockState(state);
    if (times.clockIn !== undefined) setClockInTime(times.clockIn);
    if (times.mealStart !== undefined) setMealStartTime(times.mealStart);
    if (times.mealEnd !== undefined) setMealEndTime(times.mealEnd);
    if (times.clockOut !== undefined) setClockOutTime(times.clockOut);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        unreadCount={unreadCount}
        newMessages={newMessages}
        onMessageClick={onMessageClick}
        onViewAllClick={onViewAllMessages}
      />
      
      <div className="bg-white">
        <ClockInButton 
          onClockOut={handleClockOut}
          onStateChange={handleStateChange}
        />
        <StatusTimeline 
          clockInTime={clockInTime}
          mealStartTime={mealStartTime}
          mealEndTime={mealEndTime}
          clockOutTime={clockOutTime}
          currentStatus={clockState}
        />
        <HoursSummary 
          scheduledHours={SCHEDULED_HOURS} 
          workedHours={workedHours} 
          currentPay={currentPay}
        />
      </div>
      
      <div className="pt-4 pb-20">
        <UpcomingShifts />
        <ShiftTradeRequests />
      </div>
    </div>
  );
}
