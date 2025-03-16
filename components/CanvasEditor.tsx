'use client';

import { useEffect, useRef, useState } from 'react';
import { useThumbnailStore } from '../app/lib/store';
import html2canvas from 'html2canvas';
import { FabricCanvas } from '../app/lib/fabricUtils';

interface CanvasEditorProps {
  imageUrl: string | null;
}

// Define fabric.js types to fix TypeScript errors
interface FabricImage {
  scaleToWidth: (width: number) => void;
  scaleToHeight: (height: number) => void;
  getScaledHeight: () => number;
  set: (options: any) => FabricImage;
  width?: number;
}

const CanvasEditor = ({ imageUrl }: CanvasEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<any>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [showControls, setShowControls] = useState(true);
  const [textColor, setTextColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('60');
  const [fontFamily, setFontFamily] = useState('Inter');
  
  // Initialize fabric canvas
  useEffect(() => {
    if (typeof window !== 'undefined' && canvasRef.current && !canvas) {
      // Dynamic import of fabric.js
      import('fabric').then((fabric) => {
        // Make sure canvasRef.current is not null before creating the canvas
        if (canvasRef.current) {
          const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width: 1280,
            height: 720, // YouTube thumbnail dimensions (16:9)
            backgroundColor: '#f0f0f0',
          });
          
          // Set up event listeners
          fabricCanvas.on('selection:created', (e: any) => {
            setActiveObject(e.selected?.[0] || null);
            updateControlValues(e.selected?.[0]);
          });
          
          fabricCanvas.on('selection:updated', (e: any) => {
            setActiveObject(e.selected?.[0] || null);
            updateControlValues(e.selected?.[0]);
          });
          
          fabricCanvas.on('selection:cleared', () => {
            setActiveObject(null);
          });
          
          setCanvas(fabricCanvas);
        }
      });
    }
    
    // Cleanup
    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [canvasRef, canvas]);
  
  // Update control values when an object is selected
  const updateControlValues = (obj: any) => {
    if (!obj) return;
    
    if (obj.type === 'textbox' || obj.type === 'text') {
      setTextColor(obj.fill);
      setFontSize(obj.fontSize.toString());
      setFontFamily(obj.fontFamily);
    }
  };
  
  // Load background image when imageUrl changes
  useEffect(() => {
    if (canvas && imageUrl) {
      // Dynamic import of fabric.js
      import('fabric').then((fabric) => {
        // Clear existing canvas
        canvas.clear();
        
        // Use type assertion to bypass TypeScript errors
        (fabric.Image as any).fromURL(imageUrl, (img: any) => {
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
            fontFamily: 'Inter, Arial, sans-serif',
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
        }, { crossOrigin: 'anonymous' });
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
        fontFamily: 'Inter, Arial, sans-serif',
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
        // Use type assertion to bypass TypeScript errors
        (fabric.Image as any).fromURL(imgUrl, (img: any) => {
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
        }, { crossOrigin: 'anonymous' });
      });
    };
    
    reader.readAsDataURL(file);
  };
  
  // Update text properties
  const updateTextProperties = (property: string, value: string) => {
    if (!canvas || !activeObject) return;
    
    if (activeObject.type === 'textbox' || activeObject.type === 'text') {
      activeObject.set({ [property]: value });
      canvas.renderAll();
      
      // Update state
      if (property === 'fill') setTextColor(value);
      if (property === 'fontSize') setFontSize(value);
      if (property === 'fontFamily') setFontFamily(value);
    }
  };
  
  return (
    <div>
      {imageUrl ? (
        <div className="relative">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-gray-200">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
          
          {showControls && activeObject && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-sm">Text Properties</h3>
                <button
                  onClick={deleteSelected}
                  className="text-red-600 hover:text-red-800 text-sm flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Delete
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Font</label>
                  <select 
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    value={fontFamily}
                    onChange={(e) => updateTextProperties('fontFamily', e.target.value)}
                  >
                    <option value="Inter">Inter</option>
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Size</label>
                  <select 
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    value={fontSize}
                    onChange={(e) => updateTextProperties('fontSize', e.target.value)}
                  >
                    <option value="24">24px</option>
                    <option value="36">36px</option>
                    <option value="48">48px</option>
                    <option value="60">60px</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-500 mb-1">Color</label>
                  <div className="flex items-center">
                    <input 
                      type="color" 
                      value={textColor}
                      onChange={(e) => updateTextProperties('fill', e.target.value)}
                      className="w-8 h-8 p-0 border border-gray-300 rounded mr-2"
                    />
                    <input 
                      type="text" 
                      value={textColor}
                      onChange={(e) => updateTextProperties('fill', e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-[16/9] w-full rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
          <div className="text-center p-6">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <p className="text-gray-500 text-sm">
              Generate a thumbnail to start editing
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CanvasEditor; 