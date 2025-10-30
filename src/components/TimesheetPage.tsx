import { CheckCircle, Clock, Calendar } from "lucide-react";
import { SCHEDULED_HOURS } from "../utils/sharedState";
import { Header } from "./Header";

interface TimeCard {
  id: string;
  date: string;
  day: string;
  clockIn: string;
  clockOut: string;
  mealStart?: string;
  mealEnd?: string;
  totalHours: number;
  status: 'approved' | 'pending';
  location: string;
}

export function TimesheetPage() {
  // Generate time cards for the week - 16 total worked hours (3 approved cards)
  const generateTimeCards = (): TimeCard[] => {
    const cards: TimeCard[] = [];
    const today = new Date();
    
    // Card 1 - Sunday - 6 hours with meal - APPROVED
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay()); // Get this week's Sunday
    cards.push({
      id: 'card-1',
      date: sunday.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      day: sunday.toLocaleDateString('en-US', { weekday: 'long' }),
      clockIn: '8:00 AM',
      clockOut: '2:30 PM',
      mealStart: '11:00 AM',
      mealEnd: '11:30 AM',
      totalHours: 6.0,
      status: 'approved',
      location: 'Central Garden Mid'
    });
    
    // Card 2 - Wednesday - 6 hours with meal - APPROVED
    const wednesday = new Date(sunday);
    wednesday.setDate(sunday.getDate() + 3);
    cards.push({
      id: 'card-2',
      date: wednesday.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      day: wednesday.toLocaleDateString('en-US', { weekday: 'long' }),
      clockIn: '9:00 AM',
      clockOut: '3:30 PM',
      mealStart: '12:00 PM',
      mealEnd: '12:30 PM',
      totalHours: 6.0,
      status: 'approved',
      location: 'Central Garden Mid'
    });
    
    // Card 3 - Thursday - 4 hours no meal - APPROVED
    const thursday = new Date(sunday);
    thursday.setDate(sunday.getDate() + 4);
    cards.push({
      id: 'card-3',
      date: thursday.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      day: thursday.toLocaleDateString('en-US', { weekday: 'long' }),
      clockIn: '10:00 AM',
      clockOut: '2:00 PM',
      mealStart: '0:00',
      mealEnd: '0:00',
      totalHours: 4.0,
      status: 'approved',
      location: 'World Table'
    });
    
    return cards;
  };

  const timeCards = generateTimeCards();
  const approvedCards = timeCards.filter(card => card.status === 'approved');
  const pendingCards = timeCards.filter(card => card.status === 'pending');

  const renderTimeCard = (card: TimeCard) => (
    <div 
      key={card.id}
      className={`bg-white rounded-lg p-4 shadow-sm border ${
        card.status === 'approved' ? 'border-green-200' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-gray-800 mb-1">{card.day}</div>
          <div className="text-sm text-gray-500">{card.date}</div>
        </div>
        <div className="flex items-center gap-1">
          {card.status === 'approved' ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">Approved</span>
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs text-orange-500">Pending</span>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Clock In:</span>
          <span className="text-gray-800">{card.clockIn}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Meal Start:</span>
          <span className="text-gray-800">{card.mealStart || '0:00'}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Meal End:</span>
          <span className="text-gray-800">{card.mealEnd || '0:00'}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Clock Out:</span>
          <span className="text-gray-800">{card.clockOut}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-sm text-gray-600">{card.location}</div>
        <div className="text-blue-600">{card.totalHours.toFixed(2)} hrs</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <Header title="Timesheet" />
      
      <div className="p-6">

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 mb-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5" />
            <span className="text-sm opacity-90">This Week</span>
          </div>
          <div className="text-3xl mb-1">
            {SCHEDULED_HOURS.toFixed(2)} hrs
          </div>
          <div className="text-sm opacity-90">
            Scheduled Hours • {approvedCards.length} time cards
          </div>
          <div className="text-sm opacity-90 mt-2">
            Worked: {timeCards.reduce((sum, card) => sum + card.totalHours, 0).toFixed(2)} hrs
          </div>
        </div>

        {/* Time Cards */}
        {approvedCards.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-700 mb-3">Time Cards</h3>
            <div className="space-y-3">
              {approvedCards.map(renderTimeCard)}
            </div>
          </div>
        )}

        {/* Pending Time Cards */}
        {pendingCards.length > 0 && (
          <div>
            <h3 className="text-gray-700 mb-3">Pending Approval</h3>
            <div className="space-y-3">
              {pendingCards.map(renderTimeCard)}
            </div>
          </div>
        )}

        {timeCards.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No time cards available
          </div>
        )}
      </div>
    </div>
  );
}
