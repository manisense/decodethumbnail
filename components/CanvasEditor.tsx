'use client';

import { useEffect, useRef, useState } from 'react';
import { useThumbnailStore } from '../app/lib/store';
import html2canvas from 'html2canvas';
import { FabricCanvas } from '../app/lib/fabricUtils';

interface CanvasEditorProps {
  imageUrl: string | null;
}

const CanvasEditor = ({ imageUrl }: CanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [showControls, setShowControls] = useState(true);
  
  // Initialize fabric canvas
  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current && !canvas) {
      // Dynamic import of fabric.js
      import('fabric').then((fabric) => {
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
          width: 1280,
          height: 720, // YouTube thumbnail dimensions (16:9)
          backgroundColor: '#f0f0f0',
        });
        
        // Set up event listeners
        fabricCanvas.on('selection:created', (e: any) => {
          setActiveObject(e.selected?.[0] || null);
        });
        
        fabricCanvas.on('selection:updated', (e: any) => {
          setActiveObject(e.selected?.[0] || null);
        });
        
        fabricCanvas.on('selection:cleared', () => {
          setActiveObject(null);
        });
        
        setCanvas(fabricCanvas);
      });
    }
    
    // Cleanup
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [canvasRef, canvas]);
  
  // Load background image when imageUrl changes
  useEffect(() => {
    if (canvas && imageUrl) {
      // Dynamic import of fabric.js
      import('fabric').then((fabric) => {
        // Clear existing canvas
        canvas.clear();
        
        // Load the generated image
        fabric.Image.fromURL(imageUrl, (img: any) => {
          // Scale image to fit canvas
          const canvasWidth = canvas.getWidth() || 1280;
          const canvasHeight = canvas.getHeight() || 720;
          
          img.scaleToWidth(canvasWidth);
          
          // If the scaled height is less than canvas height, scale to height instead
          if (img.getScaledHeight() < canvasHeight) {
            img.scaleToHeight(canvasHeight);
          }
          
          // Center the image
          img.set({
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            originX: 'center',
            originY: 'center',
            selectable: true,
          });
          
          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
          
          // Add default text elements
          const title = useThumbnailStore.getState().title || 'Your Title Here';
          
          const textbox = new fabric.Textbox(title, {
            left: canvasWidth / 2,
            top: canvasHeight / 2,
            width: 500,
            fontSize: 60,
            fontFamily: 'Arial',
            fill: '#ffffff',
            fontWeight: 'bold',
            textAlign: 'center',
            stroke: '#000000',
            strokeWidth: 1,
            originX: 'center',
            originY: 'center',
            shadow: new fabric.Shadow({ 
              color: 'rgba(0,0,0,0.5)', 
              blur: 5, 
              offsetX: 2, 
              offsetY: 2 
            }),
          });
          
          canvas.add(textbox);
          canvas.renderAll();
        });
      });
    }
  }, [canvas, imageUrl]);
  
  // Add a new text element
  const addText = () => {
    if (!canvas) return;
    
    import('fabric').then((fabric) => {
      const text = new fabric.Textbox('New Text', {
        left: 100,
        top: 100,
        width: 200,
        fontSize: 30,
        fontFamily: 'Arial',
        fill: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        stroke: '#000000',
        strokeWidth: 1,
        shadow: new fabric.Shadow({ 
          color: 'rgba(0,0,0,0.5)', 
          blur: 5, 
          offsetX: 2, 
          offsetY: 2 
        }),
      });
      
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    });
  };
  
  // Add a shape
  const addShape = (type: 'rect' | 'circle' | 'triangle') => {
    if (!canvas) return;
    
    import('fabric').then((fabric) => {
      let shape;
      
      const options = {
        left: 100,
        top: 100,
        fill: 'rgba(255, 255, 255, 0.5)',
        stroke: '#000000',
        strokeWidth: 1,
        width: 100,
        height: 100,
        radius: 50,
      };
      
      switch (type) {
        case 'rect':
          shape = new fabric.Rect(options);
          break;
        case 'circle':
          shape = new fabric.Circle(options);
          break;
        case 'triangle':
          shape = new fabric.Triangle(options);
          break;
        default:
          shape = new fabric.Rect(options);
      }
      
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    });
  };
  
  // Delete selected object
  const deleteSelected = () => {
    if (!canvas || !canvas.getActiveObject()) return;
    
    canvas.remove(canvas.getActiveObject());
    canvas.renderAll();
    setActiveObject(null);
  };
  
  // Export canvas as image
  const exportImage = () => {
    if (!canvas) return;
    
    // Temporarily hide controls for export
    setShowControls(false);
    
    setTimeout(() => {
      const dataUrl = canvas.toDataURL({
        format: 'png',
        multiplier: 2, // Higher quality export
      });
      
      // Create a download link
      const link = document.createElement('a');
      link.download = 'youtube-thumbnail.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show controls again
      setShowControls(true);
    }, 100);
  };
  
  // Upload an image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      import('fabric').then((fabric) => {
        fabric.Image.fromURL(imgUrl, (img: any) => {
          // Scale image to reasonable size
          if (img.width && img.width > 300) {
            img.scaleToWidth(300);
          }
          
          img.set({
            left: 100,
            top: 100,
          });
          
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
        });
      });
    };
    
    reader.readAsDataURL(file);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Thumbnail Editor</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowControls(!showControls)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            {showControls ? 'Preview' : 'Edit'}
          </button>
          <button
            onClick={exportImage}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Export
          </button>
        </div>
      </div>
      
      {imageUrl ? (
        <div className="relative">
          <canvas ref={canvasRef} className="border border-gray-300 w-full" />
          
          {showControls && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={addText}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Text
              </button>
              <button
                onClick={() => addShape('rect')}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Rectangle
              </button>
              <button
                onClick={() => addShape('circle')}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Circle
              </button>
              <button
                onClick={() => addShape('triangle')}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Triangle
              </button>
              <label className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {activeObject && (
                <button
                  onClick={deleteSelected}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Selected
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="border border-gray-300 rounded-md p-8 flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">
            Generate a thumbnail to start editing
          </p>
        </div>
      )}
    </div>
  );
};

export default CanvasEditor; 