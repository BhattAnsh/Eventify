'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, Users, Megaphone, ArrowRight, Menu } from 'lucide-react'

export function LandingPage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="#">
          <Calendar className="h-6 w-6" />
          <span className="ml-2 text-xl sm:text-2xl font-bold">Eventify</span>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
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
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsOpen(false)}>
                Features
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsOpen(false)}>
                Pricing
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link className="text-sm font-medium hover:underline underline-offset-4" href="#" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full h-[100vh] flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create, Manage, and Promote Your Events
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Eventify is your all-in-one platform for seamless event planning and attendance. Bring your ideas to life and connect with your audience.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Event Creation</h3>
                <p className="text-gray-500 dark:text-gray-400">Easily create and customize your events with our intuitive interface.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Attendee Management</h3>
                <p className="text-gray-500 dark:text-gray-400">Efficiently manage registrations, tickets, and attendee information.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Megaphone className="h-12 w-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Promotion Tools</h3>
                <p className="text-gray-500 dark:text-gray-400">Boost your event visibility with built-in marketing and social sharing features.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-full py-12 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Create Your Event</h3>
                <p className="text-gray-500 dark:text-gray-400">Set up your event details, ticketing, and customize your event page.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Promote and Sell</h3>
                <p className="text-gray-500 dark:text-gray-400">Use our tools to spread the word and sell tickets to your audience.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Host Your Event</h3>
                <p className="text-gray-500 dark:text-gray-400">Manage attendees, track analytics, and make your event a success.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
                <p className="text-gray-500 dark:text-gray-400 mb-4">Eventify has revolutionized how we manage our conferences. Its user-friendly and feature-packed!</p>
                <p className="font-bold">- Sarah J., Event Organizer</p>
              </div>
              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
                <p className="text-gray-500 dark:text-gray-400 mb-4">I love how easy it is to find and register for events in my area. Great platform!</p>
                <p className="font-bold">- Mike T., Attendee</p>
              </div>
              <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg">
                <p className="text-gray-500 dark:text-gray-400 mb-4">The promotional tools have helped us increase our event attendance by 50%. Highly recommended!</p>
                <p className="font-bold">- Emily R., Marketing Manager</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full h-full py-12 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of event organizers and attendees on Eventify. Create your first event or discover exciting experiences today!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="w-full sm:w-auto">
                    Sign Up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our <Link className="underline underline-offset-2" href="#">Terms & Conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
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