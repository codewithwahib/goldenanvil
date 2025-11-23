'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

export default function CeoMissionSection2() {
  return (
    <>
    <section className="flex flex-col md:flex-row w-full min-h-[450px]">
      {/* Left side (Our Story) */}
      <div className="md:w-1/2 flex flex-col justify-center items-start p-8 md:p-12 bg-white text-black min-h-[350px] md:min-h-[450px] border border-gray-200">
        <h3 className={`text-2xl px-4 pt-2 pb-10 font-bold text-black mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-200 ${dmsans.className}`}>
          
          Message
        </h3>
        <p className={`text-md leading-relaxed mb-8 tracking-wider pb-6 italic text-gray-600 ${dmsans.className}`}>
Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi, laboriosam earum minima aut totam numquam illum velit, dignissimos expedita eaque eum, nisi amet qui eius commodi animi ex reprehenderit nemo.        </p>
        
        {/* Small grey heading below the message */}
        <h4 className={`text-sm text-gray-500 mb-6 uppercase tracking-wider ${dmsans.className}`}>
          Muhammad Daniyal - (Manager)
        </h4>
        
        <Link href="/about" passHref>
          <button className={`text-black font-semibold px-4 py-3 bg-white hover:bg-gray-100 transition uppercase tracking-wider rounded-sm border border-gray-900 flex items-center gap-2 group ${dmsans.className}`}>
            READ MORE
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
          </button>
        </Link>
      </div>

      {/* Right side (Image) */}
      <div className="md:w-1/2 relative flex flex-col justify-center items-start p-8 md:p-12 min-h-[350px] md:min-h-[450px]">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/s1.png"
            alt="Our story background"
            fill
            quality={100}
            priority={true}
            className="object-cover"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content - You can uncomment and use this section if you want text over the image */}
        {/* <div className="relative z-10 max-w-[600px] mt-8">
          <h3 className={`text-2xl pl-4 pr-4 pt-2 pb-2 font-bold text-black mb-6 uppercase tracking-wider bg-white inline-block ${dmsans.className}`}>
            CEO&apos;s Message
          </h3>
          <p className={`text-white text-md tracking-wider leading-relaxed mb-8 italic ${dmsans.className}`}>
            At A to Zee Switchgear, we are committed to delivering innovative and reliable electrical solutions that power progress with excellence. Our dedication to quality, safety, and customer satisfaction drives us to be your trusted partner in electrical engineering.
          </p>
          <Link href="/ceo-message" passHref>
            <button className={`text-black font-semibold px-4 py-3 bg-white hover:bg-gray-100 transition uppercase tracking-wider rounded-sm flex items-center gap-2 group border border-black hover:border-gray-400 ${dmsans.className}`}>
              READ MORE
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
            </button>
          </Link>
        </div> */}
      </div>
    </section>
    </>
  );
}