'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <svg 
              className="w-8 h-8 text-black" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M14.5 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V7.5L14.5 2Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M14 2V8H20" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M10 13L8 15L10 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M14 13L16 15L14 17" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 text-lg font-semibold">YT Thumbnail AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-black">
              Home
            </Link>
            <Link href="/templates" className="text-gray-600 hover:text-black">
              Templates
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-black">
              About
            </Link>
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              href="/signin" 
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4 pb-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/templates" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>
            <div className="flex space-x-3 pt-4 border-t border-gray-100">
              <Link 
                href="/signin" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 