import React, { createContext, useContext, useState } from 'react';
import { Event, Registration } from '../types';
import { events as mockEvents, registrations as mockRegistrations } from '../data/mockData';
import { useAuth } from './AuthContext';

interface EventContextType {
  events: Event[];
  featuredEvents: Event[];
  userEvents: Event[];
  registrations: Registration[];
  getEventById: (id: string) => Event | undefined;
  registerForEvent: (eventId: string, ticketQuantity: number) => boolean;
  createEvent: (event: Omit<Event, 'id'>) => void;
  searchEvents: (query: string) => Event[];
  filterEventsByCategory: (category: string) => Event[];
}

const EventContext = createContext<EventContextType>({
  events: [],
  featuredEvents: [],
  userEvents: [],
  registrations: [],
  getEventById: () => undefined,
  registerForEvent: () => false,
  createEvent: () => {},
  searchEvents: () => [],
  filterEventsByCategory: () => []
});

export const useEvents = () => useContext(EventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [registrations, setRegistrations] = useState<Registration[]>(mockRegistrations);
  const { user } = useAuth();

  const featuredEvents = events.filter(event => event.isFeatured);
  
  const userEvents = user 
    ? events.filter(event => 
        user.registeredEvents.includes(event.id) || 
        event.organizer === user.name
      )
    : [];

  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  const registerForEvent = (eventId: string, ticketQuantity: number): boolean => {
    if (!user) return false;

    const event = events.find(e => e.id === eventId);
    if (!event) return false;
    
    if (event.availableTickets < ticketQuantity) return false;

    // Create new registration
    const newRegistration: Registration = {
      id: `reg_${Date.now()}`,
      eventId,
      userId: user.id,
      ticketQuantity,
      totalPrice: event.price * ticketQuantity,
      registrationDate: new Date().toISOString().split('T')[0]
    };

    // Update registrations
    setRegistrations([...registrations, newRegistration]);

    // Update event available tickets
    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        return { ...e, availableTickets: e.availableTickets - ticketQuantity };
      }
      return e;
    });

    setEvents(updatedEvents);

    // Update user's registered events
    if (user && !user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
    }

    return true;
  };

  const createEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}`
    };

    setEvents([...events, newEvent]);
  };

  const searchEvents = (query: string): Event[] => {
    if (!query) return events;
    
    const lowercasedQuery = query.toLowerCase();
    return events.filter(
      event => 
        event.title.toLowerCase().includes(lowercasedQuery) ||
        event.description.toLowerCase().includes(lowercasedQuery) ||
        event.location.toLowerCase().includes(lowercasedQuery) ||
        event.category.toLowerCase().includes(lowercasedQuery)
    );
  };

  const filterEventsByCategory = (category: string): Event[] => {
    if (!category || category === 'All') return events;
    return events.filter(event => event.category === category);
  };

  return (
    <EventContext.Provider value={{
      events,
      featuredEvents,
      userEvents,
      registrations,
      getEventById,
      registerForEvent,
      createEvent,
      searchEvents,
      filterEventsByCategory
    }}>
      {children}
    </EventContext.Provider>
  );
};