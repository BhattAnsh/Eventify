'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface User {
  email: string;
  password: string;
  name: string; // Added name to interface since it's used
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Check if user exists and password matches
    const user = users.find(
      (u: User) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      // Store user session
      localStorage.setItem('user', JSON.stringify({ 
        email: user.email,
        name: user.name 
      }));
      toast.success('Successfully logged in!');
      router.push('/find-events');
    } else {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Header */}
        <div className="text-center space-y-6">
          <Image
            src="/logo.png" // Add your logo path
            alt="Logo"
            width={60}
            height={60}
            className="mx-auto"
          />
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back
          </h2>
          <p className="text-gray-500">
            Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="h-12"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-colors"
          >
            Sign In
          </Button>
        </form>

        {/* Additional Links */}
        <div className="text-center space-y-4">
          <p className="text-sm text-gray-500">
            Dont have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline block"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}