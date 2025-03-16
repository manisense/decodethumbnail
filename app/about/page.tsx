import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">About ThumbAI</h1>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                ThumbAI was created to help content creators design eye-catching YouTube thumbnails without needing advanced design skills. We combine the power of AI with intuitive editing tools to make thumbnail creation fast, easy, and professional.
              </p>
              <p className="text-gray-700">
                Our goal is to help creators focus on what they do best—creating amazing content—while we handle making their thumbnails stand out in a crowded feed.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-bold text-xl mb-2 text-center">1</div>
                  <h3 className="font-semibold text-center mb-2">Generate</h3>
                  <p className="text-gray-700 text-sm">
                    Enter your video title, style preferences, and keywords. Choose between OpenAI or Google AI to create a custom thumbnail based on your inputs.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-bold text-xl mb-2 text-center">2</div>
                  <h3 className="font-semibold text-center mb-2">Customize</h3>
                  <p className="text-gray-700 text-sm">
                    Use our editor to add text, shapes, and images. Adjust colors, fonts, and positioning to match your brand.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-600 font-bold text-xl mb-2 text-center">3</div>
                  <h3 className="font-semibold text-center mb-2">Export</h3>
                  <p className="text-gray-700 text-sm">
                    Download your finished thumbnail in high resolution, ready to upload to YouTube.
                  </p>
                </div>
              </div>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">AI Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">OpenAI DALL-E 3</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    DALL-E 3 is OpenAI's advanced image generation model that creates detailed, high-quality images from text descriptions. It excels at understanding complex prompts and generating creative, visually appealing thumbnails.
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Strengths:</strong> Artistic interpretation, text rendering, creative compositions
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">Google Imagen 3</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Imagen 3 is Google's state-of-the-art image generation model that produces photorealistic images with strong attention to detail. It's particularly good at creating images with realistic textures and lighting.
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Strengths:</strong> Photorealism, accurate details, consistent style
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">
                Our model comparison feature allows you to generate thumbnails with both AI models simultaneously, helping you choose the best result for your specific content.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Technology</h2>
              <p className="text-gray-700 mb-4">
                ThumbAI is built using cutting-edge technologies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>OpenAI's DALL-E 3</strong> for generating high-quality artistic images</li>
                <li><strong>Google's Imagen 3</strong> for photorealistic image generation</li>
                <li><strong>Fabric.js</strong> for the interactive canvas editor</li>
                <li><strong>Next.js</strong> for a fast, responsive web application</li>
                <li><strong>Tailwind CSS</strong> for beautiful, consistent styling</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
              <p className="text-gray-700 mb-6">
                Ready to create your first AI-powered thumbnail? Head back to the home page and start generating!
              </p>
              <div className="text-center">
                <Link 
                  href="/"
                  className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
                >
                  Create Your Thumbnail
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 