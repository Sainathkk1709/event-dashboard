import React from 'react';
import { Navigate } from 'react-router-dom';
import EventForm from '../components/events/EventForm';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

const CreateEventPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  // Redirect if not authenticated or not an organizer
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Only organizers can create events
  if (user && user.role !== 'organizer' && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <EventForm />
      </div>
    </Layout>
  );
};

export default CreateEventPage;