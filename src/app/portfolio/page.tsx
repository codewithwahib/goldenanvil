// app/portfolio/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/app/Components/header'
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { DM_Sans } from 'next/font/google';

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: '700',
});

interface Project {
  projectNumber: number;
  name: string;
  mainImage?: {
    asset?: {
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
        };
        lqip?: string;
      };
    };
  };
  mainDescription: string;
  date: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError(null);
        
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id';
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
        
        const query = `*[_type == "project"] {
    projectNumber,
    name,
    mainImage {
      asset->{
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    mainDescription,
    date
  } | order(projectNumber asc)`;
        
        const encodedQuery = encodeURIComponent(query);
        const url = `https://${projectId}.api.sanity.io/v2023-08-01/data/query/${dataset}?query=${encodedQuery}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const result = await response.json();
        
        if (result.result) {
          setProjects(result.result);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full bg-white py-8">
          
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          {/* <div className="text-xl text-gray-600">Loading projects...</div> */}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h1 className={`text-4xl font-bold text-black text-center uppercase ${dmsans.className}`}>
              OUR PROJECTS
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-red-600 text-center">
            {error}
            <button 
              onClick={() => window.location.reload()}
              className="block mt-4 text-black font-semibold px-4 py-2 bg-white hover:bg-gray-100 transition uppercase tracking-wider rounded-sm border border-gray-900 mx-auto"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full bg-white py-8">
          <div className="container mx-auto">
            <h1 className={`text-4xl font-bold text-black text-center uppercase ${dmsans.className}`}>
              OUR PROJECTS
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-xl text-gray-500">No projects found.</div>
        </div>
      </div>
    );
  }

  return (<>
    <Header/>
    <div className="min-h-screen bg-white">
      {/* Simple Top Heading */}
      <div className="w-full bg-white py-8">
        <div className="container mx-auto">
          <h1 className={`text-4xl font-bold text-black text-center uppercase ${dmsans.className}`}>
            OUR PROJECTS
          </h1>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="w-full bg-white">
        <div className="container mx-auto">
          {projects.map((project, index) => {
            const isEven = index % 2 === 1; // Even index (0-based) means odd number visually
            
            return (
              <div key={project.projectNumber || project.name} className="relative">
                {/* Thin separator line between projects */}
                {index > 0 && (
                  <div className="w-full h-[1px] bg-gray-200 my-8"></div>
                )}
                
                <section className="flex flex-col md:flex-row w-full min-h-[450px] gap-8 md:gap-0">
                  {/* Image Section - Alternates sides */}
                  <div className={`md:w-1/2 relative flex flex-col justify-center items-start p-8 md:p-12 min-h-[350px] md:min-h-[450px] ${
                    isEven ? 'md:order-2' : 'md:order-1'
                  }`}>
                    {/* Background image with overlay */}
                    <div className="absolute inset-0 z-0">
                      {project.mainImage?.asset?.url ? (
                        <Image
                          src={project.mainImage.asset.url}
                          alt={project.name}
                          fill
                          quality={100}
                          priority={index === 0}
                          className="object-cover"
                          style={{ objectPosition: 'center center' }}
                          placeholder={project.mainImage.asset.metadata?.lqip ? "blur" : "empty"}
                          blurDataURL={project.mainImage.asset.metadata?.lqip}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image Available</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                    
                    {/* Project name overlay */}
                    <div className="relative z-10 text-white">
                      <h2 className={`text-3xl font-bold mb-4 uppercase ${dmsans.className}`}>
                        {project.projectNumber}
                      </h2>
                      {project.date && (
                        <p className="text-sm text-gray-300">
                          {new Date(project.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Text Section - Alternates sides */}
                  <div className={`md:w-1/2 flex flex-col justify-center items-start p-8 md:p-12 bg-white text-black min-h-[350px] md:min-h-[450px] ${
                    isEven ? 'md:order-1' : 'md:order-2'
                  }`}>
                    <h3 className={`text-2xl px-4 pt-2 pb-10 font-bold text-black mb-6 uppercase tracking-wider relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-200 ${dmsans.className}`}>
                      {project.name}
                    </h3>
                    <p className={`text-md leading-relaxed mb-8 tracking-wider pb-6 italic text-gray-600 ${dmsans.className}`}>
                      {project.mainDescription || 'No description available for this project.'}
                    </p>
                    <Link href={`/projects/${project.name.toLowerCase().replace(/\s+/g, '-')}`} passHref>
                      <button className={`text-black font-semibold px-4 py-3 bg-white hover:bg-gray-100 transition uppercase tracking-wider rounded-sm border border-gray-900 flex items-center gap-2 group ${dmsans.className}`}>
                        VIEW PROJECT
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
                      </button>
                    </Link>
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}