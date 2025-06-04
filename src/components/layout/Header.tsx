import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CalendarDays, LogIn, LogOut, Menu, X, User, PlusCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CalendarDays size={28} className="text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">EventFlow</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Browse Events
            </Link>
            {isAuthenticated && user?.role === 'organizer' && (
              <Link to="/create-event" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Create Event
              </Link>
            )}
            <Link to="/calendar" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Calendar
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <User size={18} />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <nav className="flex flex-col space-y-4">
              <Link to="/events" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">
                Browse Events
              </Link>
              {isAuthenticated && user?.role === 'organizer' && (
                <Link to="/create-event" className="text-gray-700 hover:text-indigo-600 transition-colors py-2 flex items-center">
                  <PlusCircle size={18} className="mr-2" />
                  Create Event
                </Link>
              )}
              <Link to="/calendar" className="text-gray-700 hover:text-indigo-600 transition-colors py-2">
                Calendar
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors py-2 flex items-center">
                    <User size={18} className="mr-2" />
                    Dashboard
                  </Link>
                  <button 
                    onClick={logout}
                    className="text-gray-700 hover:text-indigo-600 transition-colors py-2 text-left flex items-center"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors py-2 flex items-center">
                    <LogIn size={18} className="mr-2" />
                    Login
                  </Link>
                  <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center">
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;