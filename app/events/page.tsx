'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, Users, Search, MapPin, Menu, Clock } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function FindEvents() {
  const [isOpen, setIsOpen] = useState(false)

  // Mock data for events
  const events = [
    { id: 1, title: "Tech Conference 2023", date: "2023-09-15", time: "9:00 AM - 5:00 PM", location: "San Francisco Convention Center", category: "Technology", description: "Join us for the biggest tech conference of the year, featuring keynotes from industry leaders and hands-on workshops on the latest technologies." },
    { id: 2, title: "Summer Music Festival", date: "2023-07-22", time: "12:00 PM - 11:00 PM", location: "Zilker Park, Austin, TX", category: "Music", description: "A day-long celebration of music featuring top artists from around the world. Food vendors and art installations will be present throughout the venue." },
    { id: 3, title: "Food & Wine Expo", date: "2023-08-05", time: "11:00 AM - 8:00 PM", location: "Jacob K. Javits Convention Center, New York, NY", category: "Food & Drink", description: "Explore culinary delights from renowned chefs and taste exquisite wines from global vineyards. Cooking demonstrations and wine tasting sessions available." },
    { id: 4, title: "Art Gallery Opening", date: "2023-09-30", time: "7:00 PM - 10:00 PM", location: "LACMA, Los Angeles, CA", category: "Art", description: "Be among the first to view our new exhibition featuring works from emerging artists. Meet the artists and enjoy complimentary refreshments." },
    { id: 5, title: "Marathon for Charity", date: "2023-10-10", time: "7:00 AM - 2:00 PM", location: "Grant Park, Chicago, IL", category: "Sports", description: "Run for a cause! Join thousands of participants in this annual charity marathon. All proceeds go to local children's hospitals." },
    { id: 6, title: "Business Networking Mixer", date: "2023-08-18", time: "6:00 PM - 9:00 PM", location: "Westin Copley Place, Boston, MA", category: "Business", description: "Connect with professionals from various industries. Perfect opportunity to expand your network and discover new business opportunities." },
  ]

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
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
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
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsOpen(false)}>
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
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Find Events</h1>
          <div className="mb-8">
            <form className="flex flex-col sm:flex-row gap-4">
              <Input className="flex-grow" placeholder="Search events..." type="search" />
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="food-drink">Food & Drink</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="inline-block w-4 h-4 mr-1" />
                    {event.date}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin className="inline-block w-4 h-4 mr-1" />
                    {event.location}
                  </p>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{event.title}</DialogTitle>
                        <DialogDescription>Event Details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Calendar className="h-4 w-4" />
                          <span className="col-span-3">{event.date}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Clock className="h-4 w-4" />
                          <span className="col-span-3">{event.time}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <MapPin className="h-4 w-4" />
                          <span className="col-span-3">{event.location}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Users className="h-4 w-4" />
                          <span className="col-span-3">{event.category}</span>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <span className="font-semibold">Description:</span>
                          <p className="col-span-3">{event.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
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
