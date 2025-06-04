// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  imageUrl: string;
  category: string;
  price: number;
  availableTickets: number;
  isFeatured: boolean;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'organizer' | 'admin';
  registeredEvents: string[];
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Registration Types
export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  ticketQuantity: number;
  totalPrice: number;
  registrationDate: string;
}