import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter, Search, Calendar, Grid, List } from 'lucide-react';
import { useEvents } from '../context/EventContext';
import EventList from '../components/events/EventList';
import EventCard from '../components/events/EventCard';
import Layout from '../components/layout/Layout';

const EventsPage: React.FC = () => {
  const { events, searchEvents, filterEventsByCategory } = useEvents();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category') || '';
  const searchParam = queryParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [category, setCategory] = useState(categoryParam);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories
  const categories = [
    'All',
    'Technology',
    'Business',
    'Music',
    'Food',
    'Health',
    'Sports',
    'Arts',
    'Education',
    'Entertainment',
    'Other'
  ];

  // Apply filters when search or category changes
  useEffect(() => {
    let filtered = events;
    
    if (searchQuery) {
      filtered = searchEvents(searchQuery);
    }
    
    if (category && category !== 'All') {
      filtered = filterEventsByCategory(category);
    }
    
    setFilteredEvents(filtered);
    
    // Update URL with query parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (category && category !== 'All') params.set('category', category);
    
    navigate(`/events${params.toString() ? `?${params.toString()}` : ''}`, { replace: true });
  }, [searchQuery, category, events, searchEvents, filterEventsByCategory, navigate]);

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via useEffect
  };

  // Handle category change
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory === 'All' ? '' : newCategory);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Events
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Find events that match your interests and connect with like-minded people
            </p>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full py-3 px-4 pl-12 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-indigo-600 text-white py-1 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button 
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close filters</span>
                    &times;
                  </button>
                </div>
                
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center">
                        <button
                          onClick={() => handleCategoryChange(cat)}
                          className={`w-full text-left px-2 py-1 rounded-md ${
                            (cat === 'All' && !category) || category === cat
                              ? 'bg-indigo-100 text-indigo-700 font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {cat}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Date Range - Just UI, not functional in demo */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Date Range</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      Today
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      This Week
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      This Weekend
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      Next Week
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      This Month
                    </button>
                  </div>
                </div>
                
                {/* Price - Just UI, not functional in demo */}
                <div>
                  <h3 className="font-semibold mb-3">Price</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      Free
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      Paid
                    </button>
                    <button className="w-full text-left px-2 py-1 rounded-md hover:bg-gray-100">
                      Any
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Events */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6">
                {/* Top Bar - Filters Toggle & View Mode */}
                <div className="flex justify-between items-center mb-6">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 lg:hidden text-gray-700"
                  >
                    <Filter size={18} />
                    <span>Filters</span>
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm">View:</span>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'}`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500'}`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Applied Filters */}
                {(searchQuery || category) && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {searchQuery && (
                      <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                        <span>Search: {searchQuery}</span>
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="ml-2 text-indigo-500 hover:text-indigo-700"
                        >
                          &times;
                        </button>
                      </div>
                    )}
                    
                    {category && (
                      <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                        <span>Category: {category}</span>
                        <button 
                          onClick={() => setCategory('')}
                          className="ml-2 text-indigo-500 hover:text-indigo-700"
                        >
                          &times;
                        </button>
                      </div>
                    )}
                    
                    {(searchQuery || category) && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setCategory('');
                        }}
                        className="text-gray-500 hover:text-gray-700 text-sm"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                )}
                
                {/* Results Info */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {category && ` in ${category}`}
                  </p>
                </div>
                
                {/* Events List */}
                {filteredEvents.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-bold mb-2">No Events Found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any events matching your criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setCategory('');
                      }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredEvents.map(event => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEvents.map(event => (
                      <div key={event.id} className="flex bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="w-1/4">
                          <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-3/4 p-4">
                          <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar size={14} className="mr-1" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">
                              {event.price === 0 ? 'Free' : `$${event.price}`}
                            </span>
                            <a 
                              href={`/events/${event.id}`}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 text-sm rounded transition-colors"
                            >
                              View Details
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventsPage;