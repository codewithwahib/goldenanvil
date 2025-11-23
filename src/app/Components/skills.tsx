import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

const FeatureSection = () => {
  const features = [
    {
      title: "Large-Scale Project Execution",
      description: "Expertise in managing and delivering complex, large-scale electrical projects with precision and efficiency.",
      link: "/",
      image: "/s1.png"
    },
    {
      title: "Project Management",
      description: "Comprehensive project management solutions ensuring timely delivery and optimal resource utilization.",
      link: "/project-management",
      image: "/s2.png"
    },
    {
      title: "Problem Solving",
      description: "Innovative solutions for complex electrical challenges with proven troubleshooting methodologies.",
      link: "/problem-solving",
      image: "/s3.png"
    },
    {
      title: "Client Communication",
      description: "Transparent and proactive communication ensuring client satisfaction throughout project lifecycle.",
      link: "/client-communication",
      image: "/s4.png"
    },
    {
      title: "Team Collaboration",
      description: "Seamless coordination between multidisciplinary teams for successful project outcomes.",
      link: "/team-collaboration",
      image: "/s6.png" // You might want to update this image
    }
  ];

  return (
    <div className="relative py-8 md:py-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gray-100 opacity-95 z-0"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        {/* Heading Section */}
        <div className="text-center mb-10 md:mb-12">
          <h1 className={`text-2xl md:text-3xl font-bold ${dmsans.className} text-black tracking-wide`}>
            Our expertise
          </h1>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col h-full bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden border border-white/20"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full min-h-[200px] sm:min-h-[180px] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-grow p-4 sm:p-5 space-y-3">
                <h2 className={`text-lg font-semibold ${dmsans.className} text-gray-800 leading-tight`}>
                  {feature.title}
                </h2>
                <p className={`text-gray-600 text-xs sm:text-sm leading-relaxed ${dmsans.className}`}>
                  {feature.description}
                </p>
                
                {/* Button */}
                {/* <div className="mt-auto pt-2">
                  <Link 
                    href={feature.link}
                    className={`w-full text-white text-xs sm:text-sm font-semibold px-3 py-2 bg-black hover:bg-gray-800 transition-all duration-200 uppercase tracking-wider rounded border border-[#d6c4b3] flex items-center justify-center gap-1 group hover:border-[#6B4F3B] ${dmsans.className}`}
                  >
                    READ MORE
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
                  </Link>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;