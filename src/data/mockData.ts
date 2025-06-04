import { Event, User, Registration } from '../types';

// Mock Events Data
export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders, workshops, and networking opportunities.',
    date: '2025-06-15',
    time: '09:00',
    location: 'San Francisco Convention Center',
    organizer: 'TechEvents Inc.',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
    category: 'Technology',
    price: 299,
    availableTickets: 1000,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'Three days of amazing performances by top artists across multiple stages in a beautiful outdoor setting.',
    date: '2025-07-10',
    time: '12:00',
    location: 'Golden Gate Park',
    organizer: 'Festival Productions',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
    category: 'Music',
    price: 149,
    availableTickets: 5000,
    isFeatured: true
  },
  {
    id: '3',
    title: 'Business Leadership Summit',
    description: 'Learn from top executives and thought leaders about strategies for business growth and leadership.',
    date: '2025-05-20',
    time: '10:00',
    location: 'Grand Hotel Conference Center',
    organizer: 'Business Network',
    imageUrl: 'https://images.pexels.com/photos/2977565/pexels-photo-2977565.jpeg',
    category: 'Business',
    price: 399,
    availableTickets: 300,
    isFeatured: false
  },
  {
    id: '4',
    title: 'Wellness Retreat',
    description: 'A weekend of yoga, meditation, and wellness workshops to rejuvenate your mind and body.',
    date: '2025-08-05',
    time: '08:00',
    location: 'Mountain View Resort',
    organizer: 'Wellness Collective',
    imageUrl: 'https://images.pexels.com/photos/8436589/pexels-photo-8436589.jpeg',
    category: 'Health',
    price: 249,
    availableTickets: 150,
    isFeatured: false
  },
  {
    id: '5',
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch their ideas to investors and compete for funding.',
    date: '2025-04-10',
    time: '13:00',
    location: 'Innovation Hub',
    organizer: 'Venture Capital Group',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    category: 'Business',
    price: 0,
    availableTickets: 200,
    isFeatured: true
  },
  {
    id: '6',
    title: 'Food & Wine Festival',
    description: 'Taste exquisite dishes and wines from top chefs and vineyards in the region.',
    date: '2025-09-25',
    time: '16:00',
    location: 'Riverside Gardens',
    organizer: 'Culinary Association',
    imageUrl: 'https://images.pexels.com/photos/5638646/pexels-photo-5638646.jpeg',
    category: 'Food',
    price: 85,
    availableTickets: 500,
    isFeatured: false
  }
];

// Mock Users Data
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    registeredEvents: ['1', '5']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'organizer',
    registeredEvents: []
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    registeredEvents: []
  }
];

// Mock Registrations Data
export const registrations: Registration[] = [
  {
    id: '1',
    eventId: '1',
    userId: '1',
    ticketQuantity: 2,
    totalPrice: 598,
    registrationDate: '2025-03-15'
  },
  {
    id: '2',
    eventId: '5',
    userId: '1',
    ticketQuantity: 1,
    totalPrice: 0,
    registrationDate: '2025-02-28'
  }
];