import React from 'react';
import EventDetail from '../components/events/EventDetail';
import Layout from '../components/layout/Layout';

const EventDetailPage: React.FC = () => {
  return (
    <Layout>
      <EventDetail />
    </Layout>
  );
};

export default EventDetailPage;