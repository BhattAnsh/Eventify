import eventData from '../data/events.json';

interface Event {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date?: string;
  time?: string;
  location?: string;
  category: string;
}

export const dataManager = {
  getAllEvents: (): Event[] => {
    return eventData.events;
  },

  getEvent: (eventId: string): Event | undefined => {
    return eventData.events.find(event => event.id === eventId);
  },

  getEventsByCategory: (category: string): Event[] => {
    return eventData.events.filter(event => event.category === category);
  },

  getCategories: (): string[] => {
    return Array.from(new Set(eventData.events.map(event => event.category)));
  }
}; 