'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { dataManager } from '@/utils/dataManager';
import { toast } from "sonner";
import Image from 'next/image';
import { Search } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VolunteerForm } from '@/components/volunteer-form';
import { auth } from '@/utils/auth';
import { useRouter } from 'next/navigation';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  volunteersNeeded: number;
  volunteersRegistered: number;
  requirements: string[];
}

export default function FindEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      toast.error('Please login to view events');
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // Load initial data
    const allEvents = dataManager.getAllEvents();
    const allCategories = dataManager.getCategories();
    setEvents(allEvents);
    setFilteredEvents(allEvents);
    setCategories(allCategories);
  }, []);

  // Handle search and filtering
  useEffect(() => {
    let filtered = events;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        {/* Header and Search Section */}
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Find Events
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              Discover meaningful opportunities to make a difference in your community
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 h-12 bg-gray-50 border-gray-200 
                    placeholder:text-gray-400 text-gray-900
                    focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary
                    hover:border-gray-300 transition-colors rounded-xl"
                />
              </div>
              
              <Select
                value={selectedCategory || undefined}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger 
                  className="w-full sm:w-[180px] h-12 bg-gray-50 border-gray-200 
                    text-gray-900 hover:border-gray-300 transition-colors rounded-xl
                    focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className="flex flex-col overflow-hidden group hover:shadow-lg transition-all duration-300 rounded-2xl border-gray-100"
              >
                {event.imageUrl && (
                  <div className="relative w-full pt-[66%] overflow-hidden">
                    <Image 
                      src={event.imageUrl} 
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {event.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {event.description}
                  </p>
                </CardHeader>
                
                <CardContent className="flex-grow space-y-3">
                  <div className="space-y-2 text-muted-foreground">
                    <p className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      {event.date}
                    </p>
                    <p className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-primary" />
                      {event.time}
                    </p>
                    <p className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      {event.location}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="flex items-center text-sm">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        {event.volunteersRegistered}/{event.volunteersNeeded}
                      </p>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {event.category}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full h-11 hover:bg-primary/10 transition-colors"
                      >
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold">
                          {event.title}
                        </DialogTitle>
                        <DialogDescription>
                          Event Details
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 py-4">
                        {event.imageUrl && (
                          <div className="relative w-full h-64 rounded-lg overflow-hidden">
                            <Image 
                              src={event.imageUrl} 
                              alt={event.title}
                              fill
                              sizes="(max-width: 500px) 100vw"
                              className="object-cover"
                              priority={false}
                            />
                          </div>
                        )}
                        
                        <p className="text-muted-foreground">{event.description}</p>
                        
                        <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
                          <p className="flex items-center text-sm">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            {event.date}
                          </p>
                          <p className="flex items-center text-sm">
                            <Clock className="w-4 h-4 mr-2 text-primary" />
                            {event.time}
                          </p>
                          <p className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-primary" />
                            {event.location}
                          </p>
                          <p className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-2 text-primary" />
                            {event.volunteersRegistered}/{event.volunteersNeeded} Volunteers
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-foreground">Requirements:</h4>
                          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            {event.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="font-semibold text-foreground">Volunteer Registration</h4>
                          <div className="space-y-3">
                            <div className="grid gap-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="Enter your phone number"
                                required
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="message">Message (Optional)</Label>
                              <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell us why you'd like to volunteer..."
                                className="resize-none"
                                rows={3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <VolunteerForm eventId={event.id} eventTitle={event.title} />
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* No Results State */}
          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <p className="text-lg text-gray-500">
                No events found matching your criteria.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="text-gray-700 hover:text-gray-900"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
