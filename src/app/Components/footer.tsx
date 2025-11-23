'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/hr@atozee.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        setMessage('Subscription failed. Please try again.');
      }
    } catch {
      setMessage('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <footer className={`bg-gray-100 border-t border-gray-300 text-black py-12 ${dmsans.className}`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        
        {/* About Section */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">About Us</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
    Through a commitment to precision engineering, cutting-edge technology, and unparalleled customer service, we deliver electrical solutions that set the standard for quality and safety.
</p>
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-110">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-all duration-200 flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-900 transition-all"></span>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-900 transition-all duration-200 flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-900 transition-all"></span>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-900 transition-all duration-200 flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-900 transition-all"></span>
                Services
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-gray-900 transition-all duration-200 flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-900 transition-all"></span>
                Projects
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-900 transition-all duration-200 flex items-center group">
                <span className="w-1 h-1 bg-gray-400 rounded-full mr-3 group-hover:bg-gray-900 transition-all"></span>
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900 border-l-4 border-purple-600 pl-3">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 group">
              <div className="mt-0.5 p-1 bg-gray-200 rounded-lg group-hover:bg-blue-100 transition-all">
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">sales@goldenanvilco.com</span>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="mt-0.5 p-1 bg-gray-200 rounded-lg group-hover:bg-green-100 transition-all">
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">(+92) 334-1842434</span>
            </li>
            <li className="flex items-start gap-3 group">
              <div className="mt-0.5 p-1 bg-gray-200 rounded-lg group-hover:bg-purple-100 transition-all">
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span className="text-gray-700 group-hover:text-gray-900 transition-colors">Karachi, Pakistan</span>
            </li>
          </ul>
        </div>

        {/* Subscribe Section */}
        <div className="space-y-4">
          <h4 className="text-xl font-bold text-gray-900 border-l-4 border-orange-600 pl-3">Stay Updated</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Subscribe to our newsletter for the latest updates and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-400 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-900 rounded-xl text-white font-medium text-sm transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Subscribing...' : 'Subscribe Now'}
            </button>
            {message && (
              <p className={`text-xs text-center p-2 rounded-lg ${
                message.includes('Thank you') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Section with Copyright and Powered By */}
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-gray-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Goldenanvil. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Powered by</span>
            <a 
              href="https://www.instagram.com/hvxxvn._" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200 underline"
            >
              Muhammad Hassan Jaffer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}