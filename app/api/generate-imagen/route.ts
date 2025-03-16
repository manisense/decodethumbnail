import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { title, subtitle, keywords, colorPalette, style } = await req.json();
    
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'Google API key is not configured' },
        { status: 500 }
      );
    }
    
    // Construct a detailed prompt for Imagen
    const prompt = `
      Create a YouTube thumbnail for a video titled "${title}".
      ${subtitle ? `Subtitle: "${subtitle}".` : ''}
      ${keywords?.length ? `Include elements related to: ${keywords.join(', ')}.` : ''}
      ${colorPalette ? `Use this color palette: ${colorPalette}.` : ''}
      ${style ? `Style: ${style}.` : ''}
      Make it high-resolution, with dynamic composition and bold text.
      The thumbnail should be eye-catching and professional, optimized for YouTube's 16:9 format.
    `.trim();
    
    // Google Imagen API endpoint
    const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/imagegeneration:generateContent';
    
    const response = await axios.post(
      `${endpoint}?key=${process.env.GOOGLE_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generation_config: {
          temperature: 0.4,
          topP: 1,
          topK: 32,
          maxOutputTokens: 4096,
          stopSequences: []
        },
        safety_settings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }
    );
    
    // Extract the image URL from the response
    const imageData = response.data.candidates[0].content.parts[0].inlineData.data;
    const imageUrl = `data:image/png;base64,${imageData}`;
    
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image with Google Imagen:', error);
    return NextResponse.json(
      { error: 'Failed to generate image with Google Imagen' },
      { status: 500 }
    );
  }
} 