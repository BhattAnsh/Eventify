'use client'

import { useEffect, useState } from 'react'
import { eventStorage } from '@/utils/storage'
import ProtectedRoute from '@/components/protected-route'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  userId: string;
  createdAt: string;
}

export default function MyEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userEvents = eventStorage.getUserEvents(user.email)
      setEvents(userEvents)
    } catch (error) {
      console.error('Error loading events:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-medium tracking-tight text-gray-900 mb-8">
          My Events
        </h1>
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found. Create your first event to get started.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 
                          transition-all duration-200 hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
                    {event.category}
                  </span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>{event.date} at {event.time}</p>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p>{event.location}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    eventStorage.deleteEvent(event.id)
                    setEvents(events.filter(e => e.id !== event.id))
                  }}
                  className="mt-6 w-full bg-red-50 text-red-600 px-4 py-2.5 rounded-full
                            font-medium transition-colors duration-200 
                            hover:bg-red-100 focus:outline-none focus:ring-2 
                            focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Event
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </ProtectedRoute>
  )
}