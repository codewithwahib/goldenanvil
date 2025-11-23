// app/blogs/page.tsx
import Header from '@/app/Components/header'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { DM_Sans } from 'next/font/google';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  mainImage: {
    asset: {
      _ref: string;
    };
    alt?: string;
  };
  gallery?: any[];
  content: any[];
  publishDate: string;
}

async function getBlogPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "blog"]{
    _id,
    title,
    "slug": slug.current,
    mainImage,
    gallery,
    content,
    publishDate
  } | order(publishDate desc)`;

  const posts = await client.fetch(query);
  return posts;
}

function getExcerpt(content: any[], maxLength: number = 120): string {
  if (!content || content.length === 0) return '';
  
  // Extract text from portable text blocks
  const textBlocks = content
    .filter(block => block._type === 'block' && block.children)
    .map(block => 
      block.children
        .filter((child: any) => child._type === 'span')
        .map((child: any) => child.text)
        .join('')
    )
    .join(' ');
  
  // Return excerpt with ellipsis if too long
  return textBlocks.length > maxLength 
    ? textBlocks.substring(0, maxLength) + '...' 
    : textBlocks;
}

function estimateReadingTime(content: any[]): number {
  if (!content || content.length === 0) return 0;
  
  const textBlocks = content
    .filter(block => block._type === 'block' && block.children)
    .map(block => 
      block.children
        .filter((child: any) => child._type === 'span')
        .map((child: any) => child.text)
        .join('')
    )
    .join(' ');
  
  // Average reading speed: 200 words per minute
  const wordCount = textBlocks.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export default async function BlogsPage() {
  const posts = await getBlogPosts();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!posts || posts.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 ${dmsans.className}`}>
              Blog
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">No blog posts found.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="relative py-4 sm:py-6 md:py-8 overflow-hidden min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-white opacity-95 z-0"></div>
        
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 z-10">
          {/* Heading Section */}
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${dmsans.className} text-black tracking-wide`}>
              Our Blogs
            </h1>
          </div>

          {/* Blog Grid - Fully responsive */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            {posts.map((post) => {
              const excerpt = getExcerpt(post.content);
              const readingTime = estimateReadingTime(post.content);
              
              return (
                <div 
                  key={post._id}
                  className="group flex flex-col h-full bg-white shadow-xs sm:shadow-sm hover:shadow-md transition-all duration-300 rounded-lg overflow-hidden"
                >
                  {/* Image Container */}
                  {post.mainImage && (
                    <div className="relative aspect-video w-full min-h-[120px] xs:min-h-[130px] sm:min-h-[140px] md:min-h-[150px] lg:min-h-[140px] xl:min-h-[130px] overflow-hidden">
                      <Link href={`/blogs/${post.slug}`}>
                        <Image
                          src={urlFor(post.mainImage).width(400).height(225).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 480px) 90vw, (max-width: 640px) 45vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, (max-width: 1280px) 22vw, 20vw"
                          priority={false}
                        />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex flex-col flex-grow p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
                    {/* Title - Moved inside the text content container */}
                    <Link href={`/blogs/${post.slug}`}>
                      <h2 className={`text-sm xs:text-base sm:text-base md:text-base font-semibold ${dmsans.className} text-gray-800 leading-tight group-hover:text-gray-600 transition-colors line-clamp-2 cursor-pointer`}>
                        {post.title}
                      </h2>
                    </Link>

                    {/* Date and Reading Time */}
                    <div className="flex items-center justify-between text-[10px] xs:text-xs sm:text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3" />
                        <time dateTime={post.publishDate}>
                          {formatDate(post.publishDate)}
                        </time>
                      </div>
                      <span>{readingTime} min read</span>
                    </div>

                    {/* Read More Button */}
                    <div className="mt-auto pt-1 sm:pt-2">
                      <Link 
                        href={`/blogs/${post.slug}`}
                        className={`w-full text-white text-[10px] xs:text-xs sm:text-xs font-semibold px-2 py-1.5 xs:px-2 xs:py-1.5 sm:px-3 sm:py-2 bg-black hover:bg-gray-800 transition-all duration-200 uppercase tracking-wider rounded flex items-center justify-center gap-1 group ${dmsans.className}`}
                      >
                        READ MORE
                        <FaArrowRight className="group-hover:translate-x-0.5 transition-transform w-2 h-2 xs:w-2.5 xs:h-2.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More or Pagination */}
          {posts.length > 10 && (
            <div className="text-center mt-8 sm:mt-10 md:mt-12">
              <button className="px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-xs sm:text-sm">
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Revalidate the page every 60 seconds
export const revalidate = 60;