import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import { Event } from '../types';

const CalendarPage: React.FC = () => {
  const { events } = useEvents();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper functions for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Get events for the current month
  const eventsInMonth = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === currentDate.getFullYear() &&
      eventDate.getMonth() === currentDate.getMonth()
    );
  });

  // Group events by date
  const eventsByDate = eventsInMonth.reduce((acc: Record<number, Event[]>, event) => {
    const day = new Date(event.date).getDate();
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(event);
    return acc;
  }, {});

  // Navigate to previous/next month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Calendar rendering
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  // Calendar days array
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty cells for days before the 1st of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Format date for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Check if a day is today
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Calendar Header */}
          <div className="bg-indigo-600 text-white p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold flex items-center">
                <CalendarIcon size={24} className="mr-2" />
                Event Calendar
              </h1>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold">
                  {formatMonthYear(currentDate)}
                </h2>
                <button 
                  onClick={goToNextMonth}
                  className="p-2 rounded-full hover:bg-indigo-500 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="p-6">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={index} className="text-center font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div 
                  key={index} 
                  className={`min-h-[100px] border rounded-md p-2 ${
                    day === null 
                      ? 'bg-gray-50' 
                      : isToday(day as number)
                        ? 'bg-indigo-50 border-indigo-200'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  {day !== null && (
                    <>
                      <div className={`text-right mb-1 ${
                        isToday(day) ? 'text-indigo-600 font-bold' : ''
                      }`}>
                        {day}
                      </div>
                      
                      {/* Events for this day */}
                      <div className="space-y-1 overflow-y-auto max-h-[70px]">
                        {eventsByDate[day as number]?.map((event, eventIndex) => (
                          <Link 
                            key={eventIndex}
                            to={`/events/${event.id}`}
                            className="block text-xs p-1 rounded truncate bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
                            title={event.title}
                          >
                            {event.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="border-t p-6">
            <h3 className="text-lg font-bold mb-4">Upcoming Events This Month</h3>
            
            {eventsInMonth.length === 0 ? (
              <p className="text-gray-500">No events scheduled for this month.</p>
            ) : (
              <div className="space-y-3">
                {eventsInMonth
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map(event => (
                    <Link 
                      key={event.id}
                      to={`/events/${event.id}`}
                      className="flex items-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <div className="bg-indigo-100 text-indigo-800 w-12 h-12 rounded-md flex items-center justify-center mr-4">
                        <div className="text-center">
                          <div className="text-xs font-bold">
                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                          <div className="text-lg font-bold">
                            {new Date(event.date).getDate()}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;