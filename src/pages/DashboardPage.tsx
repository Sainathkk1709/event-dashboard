import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Calendar, Clock, Users, Settings, Grid, List, ChevronRight, MapPin, Ticket, BarChart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../context/EventContext';
import EventCard from '../components/events/EventCard';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { userEvents, events, registrations } = useEvents();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'created'>('upcoming');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Filter events based on active tab
  const today = new Date();
  
  const upcomingEvents = userEvents.filter(
    event => new Date(event.date) >= today
  );
  
  const pastEvents = userEvents.filter(
    event => new Date(event.date) < today
  );
  
  const createdEvents = user?.role === 'organizer' || user?.role === 'admin'
    ? events.filter(event => event.organizer === user.name)
    : [];

  // Get user's registrations
  const userRegistrations = registrations.filter(reg => 
    user && reg.userId === user.id
  );

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen pt-8 pb-12">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="md:flex md:justify-between md:items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
                <p className="text-gray-600 mb-4">
                  Manage your events and registrations
                </p>
              </div>
              
              {(user?.role === 'organizer' || user?.role === 'admin') && (
                <Link
                  to="/create-event"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors inline-block"
                >
                  Create New Event
                </Link>
              )}
            </div>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <Calendar size={24} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Upcoming Events</p>
                  <h3 className="text-2xl font-bold">{upcomingEvents.length}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Clock size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Past Events</p>
                  <h3 className="text-2xl font-bold">{pastEvents.length}</h3>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Ticket size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Registrations</p>
                  <h3 className="text-2xl font-bold">{userRegistrations.length}</h3>
                </div>
              </div>
            </div>
            
            {(user?.role === 'organizer' || user?.role === 'admin') && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <BarChart size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Created Events</p>
                    <h3 className="text-2xl font-bold">{createdEvents.length}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Events Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-3 font-medium ${
                  activeTab === 'upcoming'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Upcoming Events
              </button>
              
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-3 font-medium ${
                  activeTab === 'past'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Past Events
              </button>
              
              {(user?.role === 'organizer' || user?.role === 'admin') && (
                <button
                  onClick={() => setActiveTab('created')}
                  className={`px-4 py-3 font-medium ${
                    activeTab === 'created'
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  Created Events
                </button>
              )}
            </div>
            
            <div className="p-6">
              {/* Upcoming Events Tab */}
              {activeTab === 'upcoming' && (
                <>
                  {upcomingEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Upcoming Events</h3>
                      <p className="text-gray-500 mb-4">You haven't registered for any upcoming events yet.</p>
                      <Link
                        to="/events"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Browse Events
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {upcomingEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {/* Past Events Tab */}
              {activeTab === 'past' && (
                <>
                  {pastEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Past Events</h3>
                      <p className="text-gray-500">You haven't attended any events yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {pastEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </>
              )}
              
              {/* Created Events Tab */}
              {activeTab === 'created' && (
                <>
                  {createdEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <Users size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Created Events</h3>
                      <p className="text-gray-500 mb-4">You haven't created any events yet.</p>
                      <Link
                        to="/create-event"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Create an Event
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {createdEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* Recent Registrations */}
          {userRegistrations.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Recent Registrations</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tickets
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userRegistrations.slice(0, 5).map(reg => {
                      const event = events.find(e => e.id === reg.eventId);
                      return (
                        <tr key={reg.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {event ? (
                              <Link to={`/events/${event.id}`} className="text-indigo-600 hover:text-indigo-900">
                                {event.title}
                              </Link>
                            ) : (
                              'Unknown Event'
                            )}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {event ? new Date(event.date).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {reg.ticketQuantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            ${reg.totalPrice}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {userRegistrations.length > 5 && (
                <div className="mt-4 text-right">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    View All Registrations
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;