'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function CeoMissionSection() {
  return (
    <>
      {/* Simple Top Heading */}
      <div className="w-full bg-white py-8">
        <div className="container mx-auto">
          <h1 className={`text-3xl font-bold text-black text-center uppercase ${dmSans.className}`}>
            {/* OUR TEAM */}
          </h1>
        </div>
      </div>

      <section className="flex flex-col md:flex-row w-full min-h-[450px]">
        {/* Left side (CEO Message) */}
        <div className="md:w-1/2 relative flex flex-col justify-center items-start p-8 md:p-12 min-h-[350px] md:min-h-[450px]">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/m.png"
              alt="CEO background"
              fill
              quality={100}
              priority={true}
              className="object-cover"
              style={{ objectPosition: 'center center' }}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 max-w-[600px] mt-8">
            <h3 className={`text-2xl pl-4 pr-4 pt-2 pb-2 font-bold text-black mb-6 uppercase tracking-wider bg-white inline-block ${dmSans.className}`}>
              Our Mission
            </h3>
            <div className={`text-white text-md tracking-wider leading-relaxed mb-8 italic ${dmSans.className}`}>
              <p className="typing-animation-line-1">
                Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur. 
              </p>
              <p className="typing-animation-line-2">
                Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
              </p>
              <p className="typing-animation-line-3">
                Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
              </p>
              <p className="typing-animation-line-4">
                Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
              </p>
            </div>
            <Link href="/about-us" passHref>
              <button className={`text-black font-semibold px-4 py-3 bg-white hover:bg-gray-100 transition uppercase tracking-wider rounded-sm flex items-center gap-2 group border border-black hover:border-gray-400 ${dmSans.className}`}>
                READ MORE
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </button>
            </Link>
          </div>
        </div>

        {/* Right side (Mission) */}
        <div className="md:w-1/2 flex flex-col justify-center items-start p-8 md:p-12 bg-white text-black min-h-[350px] md:min-h-[450px] border border-gray-200">
          <h3 className={`text-2xl px-4 pt-2 pb-10 font-bold text-black mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-200 ${dmSans.className}`}>
            Our Capabilities
          </h3>
          <div className={`text-md leading-relaxed mb-8 tracking-wider pb-6 italic text-gray-600 ${dmSans.className}`}>
            <p className="typing-animation-line-5">
              Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
            </p>
            <p className="typing-animation-line-6">
              Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
            </p>
            <p className="typing-animation-line-7">
              Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
            </p>
            <p className="typing-animation-line-8">
              Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
            </p>
            <p className="typing-animation-line-9">
              Lorem ipsum dolor sit amet consectetur, dolor sit amet consectetur.
            </p>
          </div>
          <Link href="/about-us" passHref>
            <button className={`text-black font-semibold px-4 py-3 bg-white hover:bg-gray-100 transition uppercase tracking-wider rounded-sm border border-gray-900 flex items-center gap-2 group ${dmSans.className}`}>
              READ MORE
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .typing-animation-line-1,
        .typing-animation-line-2,
        .typing-animation-line-3,
        .typing-animation-line-4,
        .typing-animation-line-5,
        .typing-animation-line-6,
        .typing-animation-line-7,
        .typing-animation-line-8,
        .typing-animation-line-9 {
          overflow: hidden;
          border-right: 2px solid;
          white-space: nowrap;
          margin: 0;
          opacity: 0;
          width: 0;
          margin-bottom: 0.5rem;
        }

        /* Left side specific styles */
        .typing-animation-line-1 {
          border-right-color: white;
          animation: 
            typing 2s steps(40, end) 0.5s forwards,
            blink-caret 0.75s step-end 0.5s infinite;
        }

        .typing-animation-line-2 {
          border-right-color: white;
          animation: 
            typing 2s steps(40, end) 3s forwards,
            blink-caret 0.75s step-end 3s infinite;
        }

        .typing-animation-line-3 {
          border-right-color: white;
          animation: 
            typing 2s steps(40, end) 5.5s forwards,
            blink-caret 0.75s step-end 5.5s infinite;
        }

        .typing-animation-line-4 {
          border-right-color: white;
          animation: 
            typing 2s steps(40, end) 8s forwards,
            blink-caret 0.75s step-end 8s infinite;
        }

        /* Right side specific styles */
        .typing-animation-line-5 {
          border-right-color: #6b7280;
          animation: 
            typing 2s steps(40, end) 0.5s forwards,
            blink-caret 0.75s step-end 0.5s infinite;
        }

        .typing-animation-line-6 {
          border-right-color: #6b7280;
          animation: 
            typing 2s steps(40, end) 3s forwards,
            blink-caret 0.75s step-end 3s infinite;
        }

        .typing-animation-line-7 {
          border-right-color: #6b7280;
          animation: 
            typing 2s steps(40, end) 5.5s forwards,
            blink-caret 0.75s step-end 5.5s infinite;
        }

        .typing-animation-line-8 {
          border-right-color: #6b7280;
          animation: 
            typing 2s steps(40, end) 8s forwards,
            blink-caret 0.75s step-end 8s infinite;
        }

        .typing-animation-line-9 {
          border-right-color: #6b7280;
          animation: 
            typing 1.5s steps(30, end) 10.5s forwards,
            blink-caret 0.75s step-end 10.5s infinite;
        }

        @keyframes typing {
          from { 
            width: 0;
            opacity: 1;
          }
          to { 
            width: 100%;
            opacity: 1;
          }
        }

        @keyframes blink-caret {
          from, to { border-color: transparent }
          50% { border-color: inherit }
        }

        /* Apply DM Sans font to all text elements */
        .${dmSans.className} {
          font-family: ${dmSans.style.fontFamily};
        }
      `}</style>
    </>
  );
}