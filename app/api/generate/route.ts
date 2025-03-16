import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { title, subtitle, keywords, colorPalette, style } = await req.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }
    
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    // Construct a detailed prompt for DALL-E
    const prompt = `
      Create a YouTube thumbnail for a video titled "${title}".
      ${subtitle ? `Subtitle: "${subtitle}".` : ''}
      ${keywords?.length ? `Include elements related to: ${keywords.join(', ')}.` : ''}
      ${colorPalette ? `Use this color palette: ${colorPalette}.` : ''}
      ${style ? `Style: ${style}.` : ''}
      Make it high-resolution, with dynamic composition and bold text.
      The thumbnail should be eye-catching and professional, optimized for YouTube's 16:9 format.
    `.trim();
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024", // Close to 16:9 YouTube thumbnail ratio
      quality: "standard",
      response_format: "url",
    });
    
    const imageUrl = response.data[0]?.url;
    
    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 