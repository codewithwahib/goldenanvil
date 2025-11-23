// app/blogs/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaArrowLeft } from 'react-icons/fa';
import { DM_Sans } from 'next/font/google';
import Link from 'next/link';
import Header from '@/app/Components/header'
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      _ref: string;
    };
    alt?: string;
    caption?: string;
  };
  content: any[];
  publishedAt: string;
  author?: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
    bio?: string;
  };
  categories?: Array<{
    title: string;
  }>;
  tags?: string[];
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    mainImage {
      asset->{
        _id,
        url
      },
      alt,
      caption
    },
    content,
    publishedAt,
    author->{
      name,
      image {
        asset->{
          _id,
          url
        }
      },
      bio
    },
    categories[]->{
      title
    },
    tags
  }`;

  const post = await client.fetch(query, { slug });
  return post;
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params since Next.js 14+ uses Promise-based params
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${dmsans.className}`}>
        <div className="text-center tracking-wide">
          <h1 className="text-2xl font-bold text-gray-800">Post not found</h1>
          <Link href="/blogs" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Header/>
      <article className={`min-h-screen bg-gray-50 py-6 ${dmsans.className} tracking-wide`}>
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          {/* Header with split layout */}
          <header className="mb-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left side: Title, Categories, Image, and Content */}
              <div className="flex-1">
                {/* Categories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-black text-white text-sm rounded-full font-medium"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight`}>
                  {post.title}
                </h1>

                {/* Author Information */}
                {post.author && (
                  <div className="flex items-center gap-3 mb-4">
                    {post.author.image && (
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={urlFor(post.author.image).width(40).height(40).url()}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{post.author.name}</p>
                    </div>
                  </div>
                )}

                {/* Featured Image */}
                {post.mainImage && (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-6">
                    <Image
                      src={urlFor(post.mainImage).width(1200).height(600).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1200px"
                      priority
                    />
                    {post.mainImage.caption && (
                      <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm p-2">
                        {post.mainImage.caption}
                      </figcaption>
                    )}
                  </div>
                )}
              </div>

              {/* Right side: Publication Date */}
              <div className="lg:w-40 flex-shrink-0">
                <div className="sticky top-6 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaCalendarAlt size={14} className="text-gray-400" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Published</p>
                      <time 
                        dateTime={post.publishedAt}
                        className="text-base font-semibold text-gray-900"
                      >
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none tracking-wide">
            <PortableText value={post.content} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className={`text-lg font-semibold mb-3`}>Tags</h3>
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author && post.author.bio && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                {post.author.image && (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={urlFor(post.author.image).width(56).height(56).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                )}
                <div>
                  <h3 className={`text-lg font-semibold mb-1`}>
                    About {post.author.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const query = `*[_type == "blog"]{ slug }`;
  const posts = await client.fetch(query);

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

// Revalidate the page every 60 seconds
export const revalidate = 60;