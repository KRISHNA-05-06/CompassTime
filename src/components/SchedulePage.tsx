import { useState, useMemo, type MouseEvent, type SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { ShiftDetailModal } from "./ShiftDetailModal";
import { DayDetailModal } from "./DayDetailModal";
import { Header } from "./Header";

export function SchedulePage() {
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, -1 = previous, 1 = next

  // Generate dynamic week data
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday
    
    // Get the start of the week (Sunday) with offset
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay + (weekOffset * 7));
    
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayNamesFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    // Base employee data that rotates
    const employeePool = [
      { name: "Alex R.", position: "Server", time: "9:00 AM - 5:00 PM", id: "65470", location: "Central Garden Mid" },
      { name: "Emma S.", position: "Cook", time: "8:00 AM - 4:00 PM", id: "65471", location: "Central Garden Mid" },
      { name: "Ryan T.", position: "Host", time: "11:00 AM - 7:00 PM", id: "65472", location: "World Table" },
      { name: "Jessica P.", position: "Manager", time: "8:00 AM - 4:00 PM", id: "65473", location: "Central Garden Mid" },
      { name: "Kevin M.", position: "Server", time: "10:00 AM - 6:00 PM", id: "65474", location: "Central Garden Mid" },
      { name: "Rachel L.", position: "Bartender", time: "5:00 PM - 1:00 AM", id: "65475", location: "World Table" },
      { name: "Manasa A.", position: "Server", time: "8:15 AM - 4:15 PM", id: "65462", location: "Central Garden Mid" },
      { name: "John D.", position: "Cook", time: "7:00 AM - 3:00 PM", id: "65463", location: "Central Garden Mid" },
      { name: "Sarah M.", position: "Host", time: "10:00 AM - 6:00 PM", id: "65464", location: "Central Garden Mid" },
      { name: "Mike R.", position: "Server", time: "2:00 PM - 10:00 PM", id: "65465", location: "World Table" },
    ];

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      
      const dayOfWeek = date.getDay();
      const formattedDate = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleDateString('en-US', { month: 'long' });
      const year = date.getFullYear();
      
      // Add ordinal suffix
      const getOrdinalSuffix = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
      };
      
      const dayNum = date.getDate();
      const fullDate = `${dayNamesFull[dayOfWeek]}, ${month} ${dayNum}${getOrdinalSuffix(dayNum)}, ${year}`;
      
      // Add shifts based on week offset
      const shifts = [];
      
      if (weekOffset === -1) {
        // PREVIOUS WEEK: All 20 hours completed
        if (i === 1) { // Monday - 6 hours with meal (COMPLETED)
          shifts.push({
            location: 'Central Garden Mid',
            time: '8:00 AM - 2:30 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '8:00 AM',
            scheduleEnd: '2:30 PM',
            mealStart: '11:00 AM',
            mealEnd: '11:30 AM',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        } else if (i === 3) { // Wednesday - 6 hours with meal (COMPLETED)
          shifts.push({
            location: 'World Table',
            time: '9:00 AM - 3:30 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '9:00 AM',
            scheduleEnd: '3:30 PM',
            mealStart: '12:00 PM',
            mealEnd: '12:30 PM',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        } else if (i === 5) { // Friday - 4 hours no meal (COMPLETED)
          shifts.push({
            location: 'Central Garden Mid',
            time: '2:00 PM - 6:00 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '2:00 PM',
            scheduleEnd: '6:00 PM',
            mealStart: '0:00',
            mealEnd: '0:00',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        } else if (i === 6) { // Saturday - 4 hours no meal (COMPLETED)
          shifts.push({
            location: 'World Table',
            time: '5:00 PM - 9:00 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '5:00 PM',
            scheduleEnd: '9:00 PM',
            mealStart: '0:00',
            mealEnd: '0:00',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        }
      } else if (weekOffset === 0) {
        // CURRENT WEEK: 16 hours completed + 4 hours upcoming = 20 total
        if (i === 0) { // Sunday - 6 hours with meal (COMPLETED)
          shifts.push({
            location: 'Central Garden Mid',
            time: '8:00 AM - 2:30 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '8:00 AM',
            scheduleEnd: '2:30 PM',
            mealStart: '11:00 AM',
            mealEnd: '11:30 AM',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        } else if (i === 3) { // Wednesday - 6 hours with meal (COMPLETED)
          shifts.push({
            location: 'Central Garden Mid',
            time: '9:00 AM - 3:30 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '9:00 AM',
            scheduleEnd: '3:30 PM',
            mealStart: '12:00 PM',
            mealEnd: '12:30 PM',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        } else if (i === 4) { // Thursday - 4 hours no meal (COMPLETED)
          shifts.push({
            location: 'World Table',
            time: '10:00 AM - 2:00 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '10:00 AM',
            scheduleEnd: '2:00 PM',
            mealStart: '0:00',
            mealEnd: '0:00',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: true
          });
        } else if (i === 6) { // Saturday - 4 hours upcoming
          shifts.push({
            location: 'Central Garden Mid',
            time: '5:00 PM - 9:00 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '5:00 PM',
            scheduleEnd: '9:00 PM',
            mealStart: '0:00',
            mealEnd: '0:00',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: false
          });
        }
      } else if (weekOffset === 1) {
        // NEXT WEEK: All 20 hours upcoming
        if (i === 0) { // Sunday - 6 hours with meal (UPCOMING)
          shifts.push({
            location: 'World Table',
            time: '8:00 AM - 2:30 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '8:00 AM',
            scheduleEnd: '2:30 PM',
            mealStart: '11:00 AM',
            mealEnd: '11:30 AM',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: false
          });
        } else if (i === 2) { // Tuesday - 6 hours with meal (UPCOMING)
          shifts.push({
            location: 'Central Garden Mid',
            time: '1:00 PM - 7:30 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '1:00 PM',
            scheduleEnd: '7:30 PM',
            mealStart: '4:00 PM',
            mealEnd: '4:30 PM',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: false
          });
        } else if (i === 4) { // Thursday - 4 hours no meal (UPCOMING)
          shifts.push({
            location: 'Central Garden Mid',
            time: '3:00 PM - 7:00 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '3:00 PM',
            scheduleEnd: '7:00 PM',
            mealStart: '0:00',
            mealEnd: '0:00',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: false
          });
        } else if (i === 6) { // Saturday - 4 hours no meal (UPCOMING)
          shifts.push({
            location: 'World Table',
            time: '10:00 AM - 2:00 PM',
            employeeId: '65462 - USF Juniper Dining',
            scheduleStart: '10:00 AM',
            scheduleEnd: '2:00 PM',
            mealStart: '0:00',
            mealEnd: '0:00',
            address: '12030 USF Board Drive, Tampa, FL 33620',
            date: fullDate,
            completed: false
          });
        }
      }
      
      // Assign 3-6 employees per day
      const numEmployees = Math.floor(Math.random() * 4) + 3;
      const employees = [];
      for (let j = 0; j < numEmployees; j++) {
        employees.push(employeePool[(i * 3 + j) % employeePool.length]);
      }
      
      days.push({
        day: dayNames[dayOfWeek],
        date: formattedDate,
        fullDate: fullDate,
        shifts: shifts,
        employees: employees
      });
    }
    
    return days;
  }, [weekOffset]);

  // Calculate hours from time string (e.g., "8:00 AM - 2:30 PM")
  const calculateHours = (startTime: string, endTime: string, mealStart: string, mealEnd: string) => {
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      return hours + minutes / 60;
    };
    
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    let totalHours = end - start;
    
    // Handle overnight shifts
    if (totalHours < 0) totalHours += 24;
    
    // Subtract meal break if exists
    if (mealStart !== '0:00' && mealEnd !== '0:00') {
      const mealStartHours = parseTime(mealStart);
      const mealEndHours = parseTime(mealEnd);
      const mealDuration = mealEndHours - mealStartHours;
      totalHours -= mealDuration;
    }
    
    return totalHours;
  };

  // Calculate total scheduled and worked hours for the current week
  const { scheduledHours, workedHours } = useMemo(() => {
    let scheduled = 0;
    let worked = 0;
    
    weekDays.forEach(day => {
      day.shifts.forEach(shift => {
        const hours = calculateHours(
          shift.scheduleStart,
          shift.scheduleEnd,
          shift.mealStart,
          shift.mealEnd
        );
        scheduled += hours;
        if (shift.completed) {
          worked += hours;
        }
      });
    });
    
    return { scheduledHours: scheduled, workedHours: worked };
  }, [weekDays]);

  // Calculate week range for header
  const weekRange = useMemo(() => {
    if (weekDays.length === 0) return '';
    
    const firstDay = new Date();
    firstDay.setDate(firstDay.getDate() - firstDay.getDay() + (weekOffset * 7));
    
    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 6);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    };
    
    return `${formatDate(firstDay)} - ${formatDate(lastDay)}, ${firstDay.getFullYear()}`;
  }, [weekDays]);

  const handleShiftClick = (shift: SetStateAction<null>, e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSelectedShift(shift);
    setIsShiftModalOpen(true);
  };

  const handleDayClick = (day: SetStateAction<null>) => {
    setSelectedDay(day);
    setIsDayModalOpen(true);
  };

  const handleCloseShiftModal = () => {
    setIsShiftModalOpen(false);
    setSelectedShift(null);
  };

  const handleCloseDayModal = () => {
    setIsDayModalOpen(false);
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="Schedule" />
      
      {/* Date Navigation */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
        <div className="flex items-center justify-between">
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80"
            onClick={() => setWeekOffset(weekOffset - 1)}
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="text-sm">Previous</span>
          </button>
          <span className="text-sm">{weekRange}</span>
          <button 
            className="flex items-center gap-1 cursor-pointer hover:opacity-80"
            onClick={() => setWeekOffset(weekOffset + 1)}
          >
            <span className="text-sm">Next</span>
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hours Summary */}
      <div className="bg-white p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-3xl text-gray-800">{scheduledHours.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Scheduled Hours</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl text-gray-800">{workedHours.toFixed(2)}</div>
            <div className="text-sm text-gray-500">Worked Hours</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600">Completed Shifts</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-sm text-gray-600">Upcoming Shifts</span>
          </div>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="px-4 pb-20">
        {weekDays.map((day, index) => (
          <Card key={index} className="mb-2">
            <div className="w-full p-4 flex items-center">
              <button
                onClick={() => handleDayClick(day)}
                className="text-center mr-4 min-w-[40px] hover:opacity-80 transition-opacity"
              >
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <div className="text-xl">{day.date}</div>
              </button>
              
              <div className="flex-1">
                {day.shifts.length > 0 ? (
                  day.shifts.map((shift, shiftIndex) => (
                    <div key={shiftIndex} className="relative">
                      <button 
                        onClick={(e) => handleShiftClick(shift, e)}
                        className={`w-full text-left p-3 rounded transition-colors ${
                          shift.completed 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white">{shift.location}</div>
                            <div className="text-sm opacity-90">{shift.time}</div>
                          </div>
                          {shift.completed && (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No Shifts</div>
                )}
              </div>

              <button
                onClick={() => handleDayClick(day)}
                className="hover:opacity-80 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </Card>
        ))}
      </div>
      
      <ShiftDetailModal 
        isOpen={isShiftModalOpen}
        onClose={handleCloseShiftModal}
        shift={selectedShift}
      />
      
      <DayDetailModal 
        isOpen={isDayModalOpen}
        onClose={handleCloseDayModal}
        day={selectedDay}
      />
    </div>
  );
}