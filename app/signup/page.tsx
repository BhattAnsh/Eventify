'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // Check if email already exists
    if (existingUsers.some((user: { email: string }) => user.email === formData.email)) {
      toast.error('Email already registered');
      return;
    }

    // Add new user
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // In a real app, this should be hashed
    };

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    // Auto login after signup
    localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.name }));

    toast.success('Account created successfully!');
    router.push('/find-events');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0 w-full h-full bg-white dark:bg-gray-950">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_400px_at_50%_100px,#e9d5ff,transparent)]" />
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-purple-200/50 dark:bg-purple-900/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 md:w-96 md:h-96 rounded-full bg-blue-200/50 dark:bg-blue-900/20 blur-3xl" />
      </div>

      <div className="max-w-md w-full relative">
        {/* Main Card */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl ring-1 ring-gray-200 dark:ring-gray-800">
          {/* Logo/Header */}
          <div className="text-center space-y-6 mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-transparent bg-clip-text animate-gradient">
              Eventify
            </h1>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Create an account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Join us to start volunteering
              </p>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-11 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-11 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-11 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="h-11 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 animate-gradient bg-[length:200%_auto]"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="text-center space-y-4 mt-8">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}