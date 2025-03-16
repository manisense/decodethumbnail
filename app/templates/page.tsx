'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

// Template data
const templates = [
  {
    id: 1,
    title: 'Gaming Thumbnail',
    description: 'Perfect for gaming videos and streams',
    image: 'https://placehold.co/600x340/3b82f6/ffffff?text=Gaming+Thumbnail',
    keywords: ['Gaming', 'Action', 'Vibrant'],
    style: '3D Render',
    colorPalette: 'Dark with neon accents',
  },
  {
    id: 2,
    title: 'Tech Review',
    description: 'Clean and professional for tech reviews',
    image: 'https://placehold.co/600x340/10b981/ffffff?text=Tech+Review',
    keywords: ['Tech', 'Minimal', 'Professional'],
    style: 'Minimalist',
    colorPalette: 'White, black, and blue',
  },
  {
    id: 3,
    title: 'Tutorial Style',
    description: 'Clear and instructional for tutorials',
    image: 'https://placehold.co/600x340/f59e0b/ffffff?text=Tutorial',
    keywords: ['Tutorial', 'Educational', 'Step-by-step'],
    style: 'Cartoon',
    colorPalette: 'Bright and colorful',
  },
  {
    id: 4,
    title: 'Vlog Thumbnail',
    description: 'Personal and engaging for vlogs',
    image: 'https://placehold.co/600x340/ec4899/ffffff?text=Vlog',
    keywords: ['Vlog', 'Lifestyle', 'Personal'],
    style: 'Photorealistic',
    colorPalette: 'Warm tones',
  },
  {
    id: 5,
    title: 'Music Video',
    description: 'Vibrant and dynamic for music content',
    image: 'https://placehold.co/600x340/8b5cf6/ffffff?text=Music',
    keywords: ['Music', 'Dynamic', 'Artistic'],
    style: 'Neon',
    colorPalette: 'Dark with vibrant accents',
  },
  {
    id: 6,
    title: 'Retro Style',
    description: 'Vintage look for nostalgic content',
    image: 'https://placehold.co/600x340/ef4444/ffffff?text=Retro',
    keywords: ['Retro', 'Vintage', 'Nostalgic'],
    style: 'Retro',
    colorPalette: 'Faded colors, sepia tones',
  },
];

export default function TemplatesPage() {
  const [filter, setFilter] = useState('');
  
  const filteredTemplates = filter 
    ? templates.filter(template => 
        template.title.toLowerCase().includes(filter.toLowerCase()) ||
        template.description.toLowerCase().includes(filter.toLowerCase()) ||
        template.keywords.some(keyword => 
          keyword.toLowerCase().includes(filter.toLowerCase())
        )
      )
    : templates;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Thumbnail Templates</h1>
            <p className="text-gray-600 mb-6">
              Choose a template to get started quickly
            </p>
            
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search templates..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{template.title}</h3>
                  <p className="text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {template.keywords.map((keyword, index) => (
                        <span 
                          key={index} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Style: {template.style}</p>
                      <p>Colors: {template.colorPalette}</p>
                    </div>
                  </div>
                  
                  <Link 
                    href={`/?template=${template.id}`}
                    className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                  >
                    Use Template
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No templates found matching your search.</p>
              <button 
                onClick={() => setFilter('')}
                className="mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
} 