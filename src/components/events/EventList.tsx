import React from 'react';
import EventCard from './EventCard';
import { Event } from '../../types';

interface EventListProps {
  events: Event[];
  title?: string;
  showFeatured?: boolean;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  title = 'Upcoming Events', 
  showFeatured = false 
}) => {
  if (events.length === 0) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-500">No events found</p>
      </div>
    );
  }

  // If showFeatured is true, render featured events differently
  const featuredEvents = showFeatured ? events.filter(event => event.isFeatured) : [];
  const regularEvents = showFeatured ? events.filter(event => !event.isFeatured) : events;

  return (
    <div className="py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}

      {/* Featured Events */}
      {showFeatured && featuredEvents.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Featured Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        </div>
      )}

      {/* Regular Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventList;