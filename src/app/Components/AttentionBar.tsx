'use client'
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

interface AttentionBarData {
  text?: string;
}

const AttentionBar: React.FC = () => {
  const [attentionBar, setAttentionBar] = useState<AttentionBarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttentionBar = async () => {
      try {
        const query = `*[_type == "attentionBar"][0]{
          text
        }`;
        
        const data: AttentionBarData = await client.fetch(query);
        setAttentionBar(data);
      } catch (error) {
        console.error('Error fetching attention bar:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttentionBar();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-200 py-2">
        <div className="animate-pulse text-center text-transparent"></div>
      </div>
    );
  }

  if (!attentionBar?.text) {
    return null;
  }

  // Calculate animation speed based on text length
  const calculateSpeed = (text: string) => {
    const baseSpeed = 20; // Base duration in seconds
    const charCount = text.length;
    
    if (charCount < 30) return 15; // Fast for short text
    if (charCount < 60) return 20; // Medium for medium text
    if (charCount < 100) return 25; // Slow for long text
    return 30; // Very slow for very long text
  };

  const animationSpeed = calculateSpeed(attentionBar.text);

  return (
    <div className="relative flex overflow-hidden bg-black text-white py-2">
      <div 
        className="whitespace-nowrap animate-marquee"
        style={{
          animationDuration: `${animationSpeed}s`
        }}
      >
        <span className="font-semibold text-sm md:text-base px-4">
          {attentionBar.text}
        </span>
      </div>
    </div>
  );
};

export default AttentionBar;