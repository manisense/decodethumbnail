'use client';

import { useState } from 'react';
import { useThumbnailStore } from '../app/lib/store';
import axios from 'axios';

interface ModelComparisonProps {
  title: string;
  subtitle: string;
  keywords: string[];
  colorPalette: string;
  style: string;
}

export default function ModelComparison({
  title,
  subtitle,
  keywords,
  colorPalette,
  style
}: ModelComparisonProps) {
  const [openaiImage, setOpenaiImage] = useState<string | null>(null);
  const [googleImage, setGoogleImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateComparison = async () => {
    if (!title) {
      setError('Title is required for comparison');
      return;
    }

    setError('');
    setIsGenerating(true);

    try {
      // Generate with OpenAI
      const openaiResponse = await axios.post('/api/generate', {
        title,
        subtitle,
        keywords,
        colorPalette,
        style
      });
      setOpenaiImage(openaiResponse.data.imageUrl);

      // Generate with Google Imagen
      const googleResponse = await axios.post('/api/generate-imagen', {
        title,
        subtitle,
        keywords,
        colorPalette,
        style
      });
      setGoogleImage(googleResponse.data.imageUrl);
    } catch (err) {
      console.error('Error generating comparison:', err);
      setError('Failed to generate comparison. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">AI Model Comparison</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <button
          onClick={generateComparison}
          disabled={isGenerating}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isGenerating 
              ? 'bg-purple-400 cursor-not-allowed' 
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isGenerating ? 'Generating Comparison...' : 'Compare Both AI Models'}
        </button>
        <p className="text-xs text-gray-500 mt-2">
          This will generate thumbnails using both OpenAI DALL-E 3 and Google Imagen 3 with the same prompt.
        </p>
      </div>
      
      {(openaiImage || googleImage) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-2 border-b">
              <h3 className="font-medium text-center">OpenAI DALL-E 3</h3>
            </div>
            {openaiImage ? (
              <div className="p-2">
                <img 
                  src={openaiImage} 
                  alt="OpenAI DALL-E 3 generated thumbnail" 
                  className="w-full h-auto rounded"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                {isGenerating ? 'Generating...' : 'No image generated yet'}
              </div>
            )}
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-2 border-b">
              <h3 className="font-medium text-center">Google Imagen 3</h3>
            </div>
            {googleImage ? (
              <div className="p-2">
                <img 
                  src={googleImage} 
                  alt="Google Imagen 3 generated thumbnail" 
                  className="w-full h-auto rounded"
                />
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                {isGenerating ? 'Generating...' : 'No image generated yet'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 