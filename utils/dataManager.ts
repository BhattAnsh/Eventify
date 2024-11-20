import userData from '../data/users.json';
import eventData from '../data/events.json';

// Add these dummy image URLs
const dummyImages = [
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1470&auto=format&fit=crop', // volunteers working
  'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop', // community cleanup
  'https://images.unsplash.com/photo-1623119435920-adb39abb4561?q=80&w=1470&auto=format&fit=crop', // beach cleanup
  'https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1470&auto=format&fit=crop', // food bank
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1470&auto=format&fit=crop', // education
  'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop'  // tech event
];

interface EventRequirement {
  id: string;
  text: string;
  required: boolean;
}

interface EventQuestion {
  id: string;
  question: string;
  required: boolean;
  type: 'text' | 'checkbox';
}

const events = {
  "events": [
    {
      "id": "event1",
      "title": "Tech Conference 2024",
      // ... existing fields ...
      "requirements": [
        {
          "id": "req1",
          "text": "I am at least 18 years old",
          "required": true
        },
        {
          "id": "req2",
          "text": "I have experience with event organization",
          "required": false
        },
        {
          "id": "req3",
          "text": "I can commit to the full day of the event",
          "required": true
        }
      ],
      "questions": [
        {
          "id": "q1",
          "question": "Do you have any dietary restrictions?",
          "required": false,
          "type": "text"
        },
        {
          "id": "q2",
          "question": "Are you willing to assist with setup/teardown?",
          "required": true,
          "type": "checkbox"
        }
      ]
    },
    // ... other events with their requirements and questions
  ]
};

export const dataManager = {
  // User Management
  getUser: (userId: string) => {
    return userData.users.find((user: { id: string }) => user.id === userId);
  },

  getUserByEmail: (email: string) => {
    return userData.users.find((user: { email: string }) => user.email === email);
  },

  // Event Management
  getAllEvents: () => {
    const events = eventData.events.map((event, index) => ({
      ...event,
      imageUrl: dummyImages[index % dummyImages.length] // Cycle through images
    }));
    return events;
  },

  getEvent: (eventId: string) => {
    return eventData.events.find(event => event.id === eventId);
  },

  getEventsByCategory: (category: string) => {
    return eventData.events.filter(event => event.category === category);
  },

  getUserEvents: (userId: string) => {
    return eventData.events.filter(event => event.createdBy === userId);
  },

  getUserVolunteeringEvents: (userId: string) => {
    return eventData.events.filter(event => event.volunteers.includes(userId));
  },

  // Categories
  getCategories: () => {
    return eventData.categories;
  },

  getSubcategories: (category: string) => {
    return eventData.subcategories[category as keyof typeof eventData.subcategories] || [];
  }
}; 