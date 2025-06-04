import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, Users, Award } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import EventList from '../components/events/EventList';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  const { featuredEvents, events } = useEvents();
  
  // Get the upcoming events (limited to 3)
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-indigo-700 text-white py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg" 
            alt="Events background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Find and Create Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover events that match your interests or create your own to share with the world
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/events"
                className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Explore Events
              </Link>
              <Link
                to="/create-event"
                className="bg-indigo-600 text-white border border-white hover:bg-indigo-700 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Create Event
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Events Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Featured Events</h2>
              <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-medium">
                View All Events
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map(event => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      Featured
                    </div>
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
                  
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Calendar size={16} className="mr-2 text-indigo-500" />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    
                    <Link 
                      to={`/events/${event.id}`}
                      className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose EventFlow</h2>
            <p className="text-gray-600 text-lg">
              We provide a comprehensive platform for all your event management needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Discovery</h3>
              <p className="text-gray-600">
                Find events that match your interests with powerful search and filtering options
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Simple Management</h3>
              <p className="text-gray-600">
                Create and manage events with our intuitive tools and real-time updates
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Users size={32} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Network</h3>
              <p className="text-gray-600">
                Meet like-minded people and expand your network at events you care about
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Browse Events by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Technology', 'Business', 'Music', 'Food', 'Health', 'Sports', 'Arts', 'Education'].map(category => (
                <Link 
                  key={category}
                  to={`/events?category=${category}`}
                  className="bg-gray-50 hover:bg-indigo-50 border border-gray-200 rounded-lg p-6 text-center transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                  <p className="text-gray-500 text-sm mt-1">Browse Events</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Events Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <Link to="/events" className="text-indigo-600 hover:text-indigo-800 font-medium">
                View Calendar
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map(event => (
                <Link 
                  key={event.id}
                  to={`/events/${event.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
                >
                  <div className="p-5">
                    <div className="flex items-start">
                      <div className="bg-indigo-100 rounded p-3 mr-4">
                        <Calendar size={24} className="text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1 text-gray-800">{event.title}</h3>
                        <p className="text-gray-500 text-sm mb-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500 text-sm">{event.location}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Event Journey?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of event organizers and attendees on our platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Sign Up Now
              </Link>
              <Link
                to="/events"
                className="bg-transparent border border-white hover:bg-indigo-600 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;