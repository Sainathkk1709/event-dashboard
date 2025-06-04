import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';
import { Event } from '../../types';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
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

  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${
        featured ? 'md:col-span-2 md:flex' : ''
      }`}
    >
      <div className={`relative ${featured ? 'md:w-1/2' : ''}`}>
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className={`w-full h-48 ${featured ? 'md:h-full' : ''} object-cover`}
        />
        {event.isFeatured && (
          <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
        {event.price === 0 ? (
          <div className="absolute top-4 right-4 bg-green-600 text-white text-xs px-2 py-1 rounded">
            Free
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            ${event.price}
          </div>
        )}
      </div>
      
      <div className={`p-5 ${featured ? 'md:w-1/2' : ''}`}>
        <div className="flex items-center text-xs text-indigo-600 mb-2">
          <Tag size={14} className="mr-1" />
          <span>{event.category}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={16} className="mr-2 text-indigo-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-2 text-indigo-500" />
            <span>{formatTime(event.time)}</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={16} className="mr-2 text-indigo-500" />
            <span>{event.location}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {event.availableTickets} tickets left
          </span>
          <Link 
            to={`/events/${event.id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;