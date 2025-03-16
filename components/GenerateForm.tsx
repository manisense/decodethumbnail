'use client';

import { useState, useEffect } from 'react';
import { useThumbnailStore } from '../app/lib/store';
import axios from 'axios';
import AIModelSelector, { AIModel } from './AIModelSelector';

interface TemplateType {
  id: number;
  title: string;
  description: string;
  image: string;
  keywords: string[];
  style: string;
  colorPalette: string;
}

interface GenerateFormProps {
  onGenerate: (imageUrl: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  template?: TemplateType | null;
}

export default function GenerateForm({ 
  onGenerate, 
  isGenerating, 
  setIsGenerating,
  template = null
}: GenerateFormProps) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [colorPalette, setColorPalette] = useState('');
  const [style, setStyle] = useState('');
  const [error, setError] = useState('');
  
  // Get AI model from store
  const aiModel = useThumbnailStore((state: any) => state.aiModel);
  const setFormData = useThumbnailStore((state: any) => state.setFormData);
  
  // Handle AI model change
  const handleModelChange = (model: AIModel) => {
    setFormData({ aiModel: model });
  };
  
  // Apply template values when template changes
  useEffect(() => {
    if (template) {
      setTitle(template.title || '');
      setKeywordsInput(template.keywords.join(', ') || '');
      setColorPalette(template.colorPalette || '');
      setStyle(template.style || '');
    }
  }, [template]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    // Parse keywords from comma-separated string
    const keywords = keywordsInput
      .split(',')
      .map(keyword => keyword.trim())
      .filter(Boolean);
    
    // Save form data to store
    setFormData({
      title,
      subtitle,
      keywords,
      colorPalette,
      style
    });
    
    try {
      // Choose API endpoint based on selected AI model
      const endpoint = aiModel === 'openai' ? '/api/generate' : '/api/generate-imagen';
      
      const response = await axios.post(endpoint, {
        title,
        subtitle,
        keywords,
        colorPalette,
        style
      });
      
      const { imageUrl } = response.data;
      onGenerate(imageUrl);
    } catch (err) {
      console.error(`Error generating thumbnail with ${aiModel}:`, err);
      setError(`Failed to generate thumbnail with ${aiModel === 'openai' ? 'OpenAI' : 'Google Imagen'}. Please try again.`);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Generate Thumbnail</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <AIModelSelector 
          selectedModel={aiModel} 
          onModelChange={handleModelChange} 
        />
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title (required)
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter video title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter subtitle (optional)"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-1">
            Keywords (comma-separated)
          </label>
          <input
            type="text"
            id="keywords"
            value={keywordsInput}
            onChange={(e) => setKeywordsInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., Gaming, Tech, Tutorial"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="colorPalette" className="block text-sm font-medium text-gray-700 mb-1">
            Color Palette
          </label>
          <input
            type="text"
            id="colorPalette"
            value={colorPalette}
            onChange={(e) => setColorPalette(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., Vibrant, Dark, Blue and Orange"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
            Style
          </label>
          <select
            id="style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a style (optional)</option>
            <option value="3D Render">3D Render</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Cartoon">Cartoon</option>
            <option value="Photorealistic">Photorealistic</option>
            <option value="Neon">Neon</option>
            <option value="Retro">Retro</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isGenerating 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isGenerating ? 'Generating...' : `Generate with ${aiModel === 'openai' ? 'DALL-E 3' : 'Imagen 3'}`}
        </button>
      </form>
    </div>
  );
} 