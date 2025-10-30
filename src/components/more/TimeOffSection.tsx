import { useState } from "react";
import { ChevronLeft, Plus, Calendar as CalendarIcon, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Header } from "../Header";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

interface TimeOffSectionProps {
  onBack: () => void;
}

interface TimeOffRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: 'approved' | 'pending' | 'denied';
  reason: string;
  requestedOn: string;
}

export function TimeOffSection({ onBack }: TimeOffSectionProps) {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [requestType, setRequestType] = useState("vacation");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [startCalendarOpen, setStartCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);

  // Helper function to check if a date has passed
  const isDatePassed = (dateString: string): boolean => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    return date < today;
  };

  // Helper function to parse date string and return Date object

  const [timeOffRequests, setTimeOffRequests] = useState<TimeOffRequest[]>([
    {
      id: "1",
      type: "Vacation",
      startDate: "Nov 15, 2025",
      endDate: "Nov 16, 2025",
      days: 2,
      status: "pending",
      reason: "Personal travel",
      requestedOn: "Oct 10, 2025"
    },
    {
      id: "2",
      type: "Sick Leave",
      startDate: "Oct 20, 2025",
      endDate: "Oct 20, 2025",
      days: 1,
      status: "approved",
      reason: "Medical appointment",
      requestedOn: "Oct 15, 2025"
    },
    {
      id: "3",
      type: "Personal",
      startDate: "Sep 15, 2025",
      endDate: "Sep 15, 2025",
      days: 1,
      status: "approved",
      reason: "Family event",
      requestedOn: "Sep 05, 2025"
    }
  ]);

  const timeOffBalance = {
    vacation: { available: 40, used: 16 },
    sick: { available: 24, used: 8 },
    personal: { available: 16, used: 4 }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'denied':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'denied':
        return 'bg-red-100 text-red-700';
    }
  };

  // Calculate days between two dates
  const calculateDays = (start: string, end: string): number => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff + 1; // Include both start and end date
  };

  // Format date to readable string
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Convert date string to Date object for calendar
  const stringToDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined;
    return new Date(dateString);
  };

  // Convert Date object to string for input
  const dateToString = (date: Date | undefined): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmitRequest = () => {
    if (!startDate || !endDate) return;

    const days = calculateDays(startDate, endDate);
    const typeLabel = requestType.charAt(0).toUpperCase() + requestType.slice(1);
    const today = new Date();
    const todayFormatted = formatDate(today.toISOString().split('T')[0]);

    // Determine status based on whether the end date has passed
    const requestStatus: 'approved' | 'pending' = isDatePassed(endDate) ? 'approved' : 'pending';

    const newRequest: TimeOffRequest = {
      id: String(Date.now()),
      type: typeLabel,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      days: days,
      status: requestStatus,
      reason: reason,
      requestedOn: todayFormatted
    };

    // Add new request to the beginning of the list
    setTimeOffRequests([newRequest, ...timeOffRequests]);

    // Reset form and close
    setShowNewRequest(false);
    setStartDate("");
    setEndDate("");
    setReason("");
    setRequestType("vacation");
  };

  if (showNewRequest) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="New Time Off Request" />
        <div className="bg-white border-b border-gray-200">
          <div className="p-4">
            <button onClick={() => setShowNewRequest(false)} className="flex items-center gap-2 text-blue-600 mb-4">
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-white rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Request Type</label>
              <select
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="vacation">Vacation</option>
                <option value="sick">Sick Leave</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Start Date</label>
              <div className="relative flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Popover open={startCalendarOpen} onOpenChange={setStartCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <CalendarIcon className="h-4 w-4 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={stringToDate(startDate)}
                      onSelect={(date: Date | undefined) => {
                        setStartDate(dateToString(date));
                        setStartCalendarOpen(false);
                      }}
                      disabled={(date: number) => {
                        // Disable dates before today
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">End Date</label>
              <div className="relative flex gap-2">
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || undefined}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Popover open={endCalendarOpen} onOpenChange={setEndCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <CalendarIcon className="h-4 w-4 text-gray-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={stringToDate(endDate)}
                      onSelect={(date: Date | undefined) => {
                        setEndDate(dateToString(date));
                        setEndCalendarOpen(false);
                      }}
                      disabled={(date: number) => {
                        // Disable dates before start date
                        if (startDate) {
                          return date < new Date(startDate);
                        }
                        return false;
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Reason</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Optional: Provide a reason for your request"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <Button
              onClick={handleSubmitRequest}
              disabled={!startDate || !endDate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300"
            >
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Time Off" />
      <div className="bg-white border-b border-gray-200">
        <div className="p-4">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-600 mb-4">
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <p className="text-sm text-gray-500 mt-1">Request and manage time off</p>
        </div>
      </div>

      <div className="p-4">
        {/* Time Off Balance */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h2 className="text-gray-900 mb-3">Available Hours</h2>
          <div className="space-y-3">
            {Object.entries(timeOffBalance).map(([type, balance]) => (
              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900 capitalize">{type}</div>
                  <div className="text-sm text-gray-500">Used: {balance.used} hrs</div>
                </div>
                <div className="text-right">
                  <div className="text-blue-600">{balance.available} hrs</div>
                  <div className="text-xs text-gray-500">available</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Request Button */}
        <Button
          onClick={() => setShowNewRequest(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Time Off Request
        </Button>

        {/* Time Off Requests */}
        <div className="space-y-3">
          <h2 className="text-gray-900">Recent Requests</h2>
          {timeOffRequests.map((request) => {
            // Dynamically determine status based on end date
            const endDatePassed = isDatePassed(request.endDate);
            const displayStatus = endDatePassed ? 'approved' : 'pending';
            
            return (
              <div key={request.id} className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-gray-900">{request.type}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {request.startDate} - {request.endDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(displayStatus)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{request.days} {request.days === 1 ? 'day' : 'days'}</span>
                  </div>
                  {request.reason && (
                    <div className="text-sm text-gray-600 pl-6">
                      Reason: {request.reason}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Requested: {request.requestedOn}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(displayStatus)}`}>
                      {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
