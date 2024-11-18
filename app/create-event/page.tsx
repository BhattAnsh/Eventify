'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, Menu, MapPin, Clock, Users, ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function CreateEvent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" />
          <span className="ml-2 text-xl sm:text-2xl font-bold">Eventify</span>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/find-events">
            Find Events
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/create-event">
            Create Event
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            My Events
          </Link>
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/find-events" onClick={() => setIsOpen(false)}>
                Find Events
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/create-event" onClick={() => setIsOpen(false)}>
                Create Event
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsOpen(false)}>
                My Events
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input id="event-title" placeholder="Enter event title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Event Description</Label>
                  <Textarea id="event-description" placeholder="Describe your event" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="event-date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input id="event-date" type="date" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="event-time">Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                      <Input id="event-time" type="time" className="pl-10" required />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <Input id="event-location" placeholder="Event location" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-category">Category</Label>
                  <Select required>
                    <SelectTrigger id="event-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="food-drink">Food & Drink</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-capacity">Capacity</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <Input id="event-capacity" type="number" placeholder="Number of attendees" className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-image">Event Image</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <Input id="event-image" type="file" accept="image/*" className="pl-10" />
                  </div>
                </div>
                <Button type="submit" className="w-full">Create Event</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col sm:flex-row justify-between items-center py-6 w-full shrink-0 px-4 sm:px-6 lg:px-8 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Eventify. All rights reserved.</p>
        <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}