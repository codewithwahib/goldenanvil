// ChannelPartners.tsx
import React from 'react';
import Image from 'next/image';

const ChannelPartners: React.FC = () => {
  const partnerImages = [
    '/ls.png',
    '/e.png',
    '/b.png',
    '/s.png'
  ];

  return (
    <div className="text-center bg-gray-50  py-10 px-5">
      <h1 className="text-center mb-10 text-4xl font-bold text-gray-800">
        Our Channel Partners
      </h1>
      <div className="grid grid-cols-4 gap-5 max-w-6xl mx-auto">
        {partnerImages.map((image, index) => (
          <div key={index} className="flex justify-center items-center">
            <Image 
              src={image} 
              alt={`Channel Partner ${index + 1}`}
              className="w-full h-auto max-w-xs object-contain border-none outline-none"
              width={300} // Add appropriate width
              height={200} // Add appropriate height
              priority={index === 0} // Optional: prioritize first image loading
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPartners;