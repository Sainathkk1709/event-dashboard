import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Tag, DollarSign } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, registerForEvent } = useEvents();
  const { isAuthenticated, user } = useAuth();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/events')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            Browse Events
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${id}` } });
      return;
    }

    // Check if user is already registered
    if (user && user.registeredEvents.includes(id)) {
      setRegistrationError('You are already registered for this event.');
      return;
    }

    const success = registerForEvent(id, ticketQuantity);
    if (success) {
      setRegistrationSuccess(true);
      setRegistrationError('');
    } else {
      setRegistrationError('Unable to register. Not enough tickets available.');
    }
  };

  const isUserRegistered = user && user.registeredEvents.includes(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Event Header with Image */}
        <div className="relative h-64 md:h-96">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div className="flex items-center text-white mb-2">
              <Tag size={16} className="mr-2" />
              <span className="text-sm">{event.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">{event.title}</h1>
          </div>
        </div>
        
        {/* Event Details */}
        <div className="p-6 md:p-8">
          {/* Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start">
              <Calendar size={24} className="text-indigo-600 mt-1 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">Date & Time</h3>
                <p className="text-gray-600">{formatDate(event.date)}</p>
                <p className="text-gray-600">{formatTime(event.time)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin size={24} className="text-indigo-600 mt-1 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Users size={24} className="text-indigo-600 mt-1 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-900">Organizer</h3>
                <p className="text-gray-600">{event.organizer}</p>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {event.description}
            </p>
          </div>
          
          {/* Registration */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Registration</h3>
              <div className="flex items-center">
                <DollarSign size={20} className="text-green-600" />
                <span className="text-xl font-bold">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">
              {event.availableTickets} tickets remaining
            </p>
            
            {registrationSuccess ? (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
                <p>You have successfully registered for this event!</p>
              </div>
            ) : isUserRegistered ? (
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
                <p>You are already registered for this event.</p>
              </div>
            ) : registrationError ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
                <p>{registrationError}</p>
              </div>
            ) : null}
            
            {!isUserRegistered && !registrationSuccess && (
              <>
                <div className="flex items-center mb-4">
                  <label htmlFor="quantity" className="block mr-4 font-medium">
                    Tickets:
                  </label>
                  <select
                    id="quantity"
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={event.availableTickets === 0}
                  >
                    {[...Array(Math.min(10, event.availableTickets))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={handleRegister}
                  disabled={event.availableTickets === 0}
                  className={`w-full py-3 px-4 rounded-md font-medium ${
                    event.availableTickets === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white transition-colors'
                  }`}
                >
                  {event.availableTickets === 0 ? 'Sold Out' : 'Register Now'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;