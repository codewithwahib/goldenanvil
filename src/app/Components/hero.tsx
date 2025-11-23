"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroPage: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = "Your Electrification Partner 🔌";

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, fullText]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Text Content - Comes FIRST on mobile, SECOND on desktop */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 order-1 md:order-2 py-8 md:py-0">
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight">
            {displayText}<span className={`${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
          </h1>
          {/* <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 md:mb-8">
            Innovative solutions for all your electrical needs
          </p> */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <Link href="/portfolio">
              <button className="bg-black hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 w-full sm:w-auto">
                Portfolio
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 w-full sm:w-auto">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image - Comes SECOND on mobile, FIRST on desktop */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8 order-2 md:order-1 min-h-[50vh] sm:min-h-[60vh] md:min-h-[80vh]">
        <Image 
          src="/h1.png" 
          alt="Hero image" 
          className="w-full h-full object-contain mix-blend-multiply max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default HeroPage;