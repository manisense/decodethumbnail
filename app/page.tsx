'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GenerateForm from '../components/GenerateForm';
import CanvasEditor from '../components/CanvasEditor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelComparison from '../components/ModelComparison';
import { useThumbnailStore } from './lib/store';

// Template data (same as in templates/page.tsx)
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

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  
  // Get form data from store
  const formData = useThumbnailStore(state => ({
    title: state.title,
    subtitle: state.subtitle,
    keywords: state.keywords,
    colorPalette: state.colorPalette,
    style: state.style
  }));
  
  const searchParams = useSearchParams();
  
  // Check for template parameter in URL
  useEffect(() => {
    const templateId = searchParams.get('template');
    if (templateId) {
      const template = templates.find(t => t.id === parseInt(templateId));
      if (template) {
        setSelectedTemplate(template);
      }
    }
  }, [searchParams]);

  const handleGenerate = (url: string) => {
    setImageUrl(url);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">AI-Powered YouTube Thumbnail Generator & Editor</h1>
            <p className="text-gray-600">
              Generate stunning thumbnails with AI, then customize them to perfection
            </p>
          </header>

          {selectedTemplate && (
            <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={selectedTemplate.image} 
                    alt={selectedTemplate.title} 
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{selectedTemplate.title} Template</h3>
                    <p className="text-gray-600 text-sm">{selectedTemplate.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <GenerateForm 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating} 
                setIsGenerating={setIsGenerating}
                template={selectedTemplate}
              />
              
              <div className="mt-4">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium"
                >
                  {showComparison ? 'Hide AI Model Comparison' : 'Show AI Model Comparison'}
                </button>
              </div>
              
              {showComparison && (
                <ModelComparison
                  title={formData.title}
                  subtitle={formData.subtitle}
                  keywords={formData.keywords}
                  colorPalette={formData.colorPalette}
                  style={formData.style}
                />
              )}
            </div>
            <div>
              <CanvasEditor imageUrl={imageUrl} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 