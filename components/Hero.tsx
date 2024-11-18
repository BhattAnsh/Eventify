"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
type Props = {};

function Hero({}: Props) {
  return (
    <>
      <section className="w-full h-[100vh] flex flex-col items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Create, Manage, and Promote Your Events
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Eventify is your all-in-one platform for seamless event planning
                and attendance. Bring your ideas to life and connect with your
                audience.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg"><Link href="/find-events">Find Events</Link></Button>
              <Button variant="outline" size="lg">
                <Link href="/create-event">Create Event</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
