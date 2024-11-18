"use client";

import React from "react";
import Link from "next/link";
import { SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Calendar, Menu } from "lucide-react";
import { SheetContent, Sheet    } from "./ui/sheet";
import { useState } from "react";

function Navbar() {     
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" href="/">
          <Calendar className="h-6 w-6" />
          <span className="ml-2 text-xl sm:text-2xl font-bold">Eventify</span>
        </Link>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/find-events"
          >
            Find Events
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/create-event"
          >
            Create Event
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/my-events"
          >
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
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/find-events"
                onClick={() => setIsOpen(false)}
              >
                Find Events
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/create-event"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#"
                onClick={() => setIsOpen(false)}
              >
                My Events
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}

export default Navbar;
