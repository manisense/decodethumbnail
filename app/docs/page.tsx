import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Documentation</h1>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">?</div>
                <h2 className="text-2xl font-semibold">Getting Started</h2>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  ThumbAI makes it easy to create professional YouTube thumbnails in minutes. Here's how to get started:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                  <li>Choose your preferred AI model (OpenAI DALL-E 3 or Google Imagen 3)</li>
                  <li>Enter your video title (required) and other optional details</li>
                  <li>Click "Generate" to create your thumbnail</li>
                  <li>Use the editor to customize your thumbnail</li>
                  <li>Export your finished thumbnail</li>
                </ol>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
                <h2 className="text-2xl font-semibold">Choosing an AI Model</h2>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  ThumbAI offers two powerful AI models for generating thumbnails:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">OpenAI DALL-E 3</h3>
                    <p className="text-sm text-gray-700">
                      Best for creative, artistic thumbnails with stylized elements and text integration.
                    </p>
                  </div>
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">Google Imagen 3</h3>
                    <p className="text-sm text-gray-700">
                      Excels at photorealistic images with fine details and consistent lighting.
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Not sure which to choose? Use the "Show AI Model Comparison" button to generate thumbnails with both models side by side.
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
                <h2 className="text-2xl font-semibold">Generating a Thumbnail</h2>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  To get the best results from the AI, provide detailed information:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li><strong>Title (required):</strong> Your video title or main subject</li>
                  <li><strong>Subtitle:</strong> Secondary text to appear in the thumbnail</li>
                  <li><strong>Keywords:</strong> Comma-separated terms related to your content</li>
                  <li><strong>Color Palette:</strong> Preferred colors (e.g., "vibrant", "dark with neon accents")</li>
                  <li><strong>Style:</strong> Visual style from the dropdown menu</li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Tip:</strong> Be specific with your inputs. Instead of "gaming video," try "action-packed Minecraft battle with dramatic lighting and explosions."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
                <h2 className="text-2xl font-semibold">Using the Editor</h2>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  Once your thumbnail is generated, use the editor to customize it:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li><strong>Add Text:</strong> Click the "Add Text" button and type your text</li>
                  <li><strong>Add Shapes:</strong> Add rectangles, circles, or other shapes</li>
                  <li><strong>Upload Images:</strong> Add logos or other images to your thumbnail</li>
                  <li><strong>Edit Elements:</strong> Click on any element to select it, then:
                    <ul className="list-circle pl-6 mt-2">
                      <li>Drag to reposition</li>
                      <li>Use the handles to resize</li>
                      <li>Use the controls to change color, font, etc.</li>
                    </ul>
                  </li>
                  <li><strong>Preview:</strong> Toggle preview mode to see how your thumbnail looks without the editing controls</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">4</div>
                <h2 className="text-2xl font-semibold">Exporting Your Thumbnail</h2>
              </div>
              <div className="pl-11">
                <p className="text-gray-700 mb-4">
                  When you're satisfied with your thumbnail:
                </p>
                <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
                  <li>Click the "Export" button</li>
                  <li>Your thumbnail will be downloaded as a high-resolution PNG file</li>
                  <li>The image will be sized appropriately for YouTube (1280×720 pixels)</li>
                </ol>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> YouTube recommends thumbnails with a 16:9 aspect ratio and a minimum width of 1280 pixels. Our exported thumbnails meet these requirements.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">5</div>
                <h2 className="text-2xl font-semibold">Tips for Great Thumbnails</h2>
              </div>
              <div className="pl-11">
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Keep it simple:</strong> Don't overcrowd your thumbnail with too many elements</li>
                  <li><strong>Use contrasting colors:</strong> Make text stand out against the background</li>
                  <li><strong>Focus on emotions:</strong> Thumbnails that evoke emotions get more clicks</li>
                  <li><strong>Be consistent:</strong> Maintain a consistent style across your channel</li>
                  <li><strong>Test different models:</strong> Try both AI models to see which works best for your content</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/"
                className="inline-block py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md"
              >
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 