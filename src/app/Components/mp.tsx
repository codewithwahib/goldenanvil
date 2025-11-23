'use client';
import React from 'react';
import Image from 'next/image';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

interface Product {
  title: string;
  image: string;
  link: string;
  logo?: string; // Made optional since it's not in your original data
}

const products: Product[] = [
  {
    title: 'Dry Transformers',
    image: '/dt.png',
    link: '/products/power-distribution',
  },
  {
    title: 'Pad Mounted Transformers',
    image: '/pm.png',
    link: '/products/energy-management',
  },
  {
    title: 'Power Transformers',
    image: '/pt.png',
    link: '/products/protection-devices',
  },
  {
    title: 'Low Voltage Switchgear',
    image: '/lv.png',
    link: '/products/protection-devices',
  },
  {
    title: 'Motor Control Center',
    image: '/mcc.png',
    link: '/products/control-panels',
  },
  {
    title: 'Power Factor Improvement Plant',
    image: '/pf.png',
    link: '/products/distribution-boards',
  },
  {
    title: 'Medium Voltage Switchgear',
    image: '/mv.png',
    link: '/products/synchronization',
  },
  {
    title: 'Generator',
    image: '/g.png',
    link: '/products/harmonic-filters',
  },
  {
    title: 'Busway',
    image: '/bw.png',
    link: '/products/substations',
  }
];

export default function Products() {
  return (
    <section className={`py-12 md:py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden ${dmsans.className}`}>
      {/* Our Products Heading */}
      <div className="container mx-auto px-4 sm:px-6 mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-800">
          Our Products
        </h1>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-full group relative"
            >
              {/* Conditional rendering for logo - only shows if logo exists */}
              {product.logo && (
                <div className="absolute top-0 left-0 z-10 bg-white p-1 sm:p-2 shadow-sm border-b border-r border-gray-800 rounded-br-sm sm:rounded-br-md">
                  <Image
                    src={product.logo}
                    alt="Brand logo"
                    width={80}
                    height={32}
                    className="h-5 sm:h-6 md:h-7 w-auto object-contain"
                  />
                </div>
              )}

              <a
                className={`h-full bg-white rounded-sm shadow-sm hover:shadow-md border border-gray-300 hover:border-gray-400 transition-all duration-300 block flex flex-col ${product.logo ? 'pt-5 sm:pt-6 md:pt-7' : ''}`}
              >
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 p-2 sm:p-3 flex items-center justify-center bg-gray-50 rounded-t-sm border-b border-gray-300 relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={`${product.title} product illustration`}
                    width={280}
                    height={240}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2 sm:p-3 md:p-4 text-center flex-grow flex items-center justify-center">
                  <h3 className={`text-xs sm:text-sm md:text-base font-medium text-gray-800 group-hover:text-black transition-colors ${dmsans.className}`}>
                    {product.title}
                  </h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}