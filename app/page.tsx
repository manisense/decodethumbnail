'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GenerateForm from '../components/GenerateForm';
import CanvasEditor from '../components/CanvasEditor';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModelComparison from '../components/ModelComparison';
import { useThumbnailStore } from './lib/store';
import Image from 'next/image';
import Link from 'next/link';

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
];

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [prompt, setPrompt] = useState('');
  
  // Get form data from store using individual selectors
  const title = useThumbnailStore((state) => state.title);
  const subtitle = useThumbnailStore((state) => state.subtitle);
  const keywords = useThumbnailStore((state) => state.keywords);
  const colorPalette = useThumbnailStore((state) => state.colorPalette);
  const style = useThumbnailStore((state) => state.style);
  
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

  const handlePromptGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    // This would normally call the API with the prompt
    // For now, we'll just simulate it
    setTimeout(() => {
      setImageUrl('https://placehold.co/1280x720/8b5cf6/ffffff?text=AI+Generated+Thumbnail');
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero section */}
        <div className="py-10 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Create Stunning YouTube Thumbnails with AI</h1>
              <p className="text-gray-600 mb-8">
                Transform your ideas into eye-catching thumbnails using advanced AI. Generate, edit, and perfect your YouTube thumbnails in minutes.
              </p>
              
              <div className="relative mb-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your ideal thumbnail (e.g., 'A futuristic gaming setup with neon lights')"
                  className="w-full px-4 py-3 pr-24 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                <button
                  onClick={handlePromptGenerate}
                  disabled={isGenerating || !prompt}
                  className={`absolute right-1 top-1 px-4 py-2 rounded-lg font-medium flex items-center ${
                    isGenerating || !prompt ? 'bg-gray-300 text-gray-500' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating
                    </span>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                      </svg>
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left column - Canvas Editor */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {imageUrl && (
                  <div className="mb-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      1280 × 720px
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => setImageUrl(null)}
                        className="py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium border border-gray-200 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        Regenerate
                      </button>
                      <button className="py-2 px-4 bg-black hover:bg-gray-800 rounded-md text-white text-sm font-medium flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        Export
                      </button>
                    </div>
                  </div>
                )}
                
                <CanvasEditor imageUrl={imageUrl} />
                
                {imageUrl && (
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      Add Text
                    </button>
                    <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      Add Image
                    </button>
                    <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                      Add Shape
                    </button>
                    <button className="flex items-center justify-center py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                      </svg>
                      Colors
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right column - Form */}
            <div className="lg:w-1/3">
              <GenerateForm 
                onGenerate={handleGenerate} 
                isGenerating={isGenerating} 
                setIsGenerating={setIsGenerating}
                template={selectedTemplate}
              />
            </div>
          </div>
        </div>
        
        {/* Popular Templates Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold mb-6">Popular Templates</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {templates.map((template) => (
                <Link 
                  href={`/?template=${template.id}`} 
                  key={template.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="aspect-video w-full relative">
                    <img 
                      src={template.image} 
                      alt={template.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base">{template.title}</h3>
                    <p className="text-gray-600 text-xs mt-1">{template.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 