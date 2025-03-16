# AI-Powered YouTube Thumbnail Generator & Editor

A full-stack Next.js application that allows users to generate YouTube thumbnails using OpenAI's DALL-E 3 or Google's Imagen 3 and edit them with a built-in editor.

## Features

- **AI-Powered Thumbnail Generation**: Create professional YouTube thumbnails from text prompts using OpenAI's DALL-E 3 or Google's Imagen 3.
- **AI Model Comparison**: Compare results from both OpenAI and Google side by side.
- **Built-in Editor**: Edit generated thumbnails with text, shapes, and uploaded images.
- **Export**: Download your finished thumbnails in high quality.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, OpenAI SDK, Google Generative AI API
- **Image Editing**: Fabric.js for canvas-based editing
- **Additional Tools**: 
  - axios for API calls
  - html2canvas for exporting thumbnails
  - zustand for state management

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- Google API key (for Imagen 3)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/youtube-thumbnail-generator.git
   cd youtube-thumbnail-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Choose an AI Model**:
   - Select between OpenAI DALL-E 3 or Google Imagen 3 for image generation.
   - You can also compare results from both models side by side.

2. **Generate a Thumbnail**:
   - Enter a title, subtitle, keywords, color palette, and style.
   - Click "Generate Thumbnail" to create an AI-generated thumbnail.

3. **Edit the Thumbnail**:
   - Add text, shapes, or upload images.
   - Drag, resize, and customize elements.
   - Use the preview mode to see how your thumbnail will look without editing controls.

4. **Export**:
   - Click "Export" to download your finished thumbnail as a PNG file.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Main UI with input form + canvas
│   ├── api/
│   │   ├── generate/route.ts   # OpenAI API route
│   │   └── generate-imagen/route.ts # Google Imagen API route
│   └── lib/
│       ├── store.ts            # Zustand store for state
│       └── fabricUtils.ts      # Fabric.js helpers
├── components/
│   ├── CanvasEditor.tsx        # Fabric.js canvas + controls
│   ├── GenerateForm.tsx        # Input form
│   ├── AIModelSelector.tsx     # AI model selection component
│   └── ModelComparison.tsx     # Component to compare AI models
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenAI](https://openai.com/) for the DALL-E 3 API
- [Google](https://ai.google.dev/) for the Imagen 3 API
- [Fabric.js](http://fabricjs.com/) for the canvas manipulation library
- [Next.js](https://nextjs.org/) for the React framework
