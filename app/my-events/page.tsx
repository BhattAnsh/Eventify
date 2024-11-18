'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, Menu, Edit, Trash2, MapPin, Clock, Plus, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Footer from '@/components/footer'

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}

export default function MyEvents() {
  const [isOpen, setIsOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  // Mock data for user's events
  const myEvents = [
    { id: 1, title: "Tech Meetup 2023", date: "2023-08-20", time: "18:00", location: "San Francisco, CA", category: "Technology" },
    { id: 2, title: "Local Art Exhibition", date: "2023-09-05", time: "10:00", location: "New York, NY", category: "Art" },
    { id: 3, title: "Charity Run", date: "2023-10-15", time: "07:00", location: "Chicago, IL", category: "Sports" },
  ]

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
  }

  const handleUpdateEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically update the event in your backend
    console.log("Updating event:", editingEvent)
    setEditingEvent(null)
  }

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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/my-events">
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
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="/my-events" onClick={() => setIsOpen(false)}>
                My Events
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Events Dashboard</h1>
            <Button asChild>
              <Link href="/create-event">
                <Plus className="w-4 h-4 mr-2" />
                Create New Event
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card className="col-span-full md:col-span-2 lg:col-span-3 bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Boost Your Next Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upgrade to Eventify Pro to access premium features and increase your event's visibility!</p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary">
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            {myEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-2">
                    <Clock className="w-4 h-4 mr-2" />
                    {event.time}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your event.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="destructive">Delete Event</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />

      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdateEvent}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({...editingEvent, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({...editingEvent, time: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={editingEvent.category}
                    onValueChange={(value) => setEditingEvent({...editingEvent, category: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Music">Music</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}