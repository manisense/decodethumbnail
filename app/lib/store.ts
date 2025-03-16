import { create } from 'zustand';
import { AIModel } from '../../components/AIModelSelector';

interface ThumbnailState {
  imageUrl: string | null;
  elements: any[];
  history: any[];
  historyIndex: number;
  title: string;
  subtitle: string;
  keywords: string[];
  colorPalette: string;
  style: string;
  aiModel: AIModel;
  
  setImageUrl: (url: string) => void;
  addElement: (element: any) => void;
  updateElement: (id: string, props: any) => void;
  removeElement: (id: string) => void;
  setFormData: (data: { 
    title?: string; 
    subtitle?: string; 
    keywords?: string[]; 
    colorPalette?: string; 
    style?: string; 
    aiModel?: AIModel;
  }) => void;
  
  // History management
  addToHistory: (canvasState: any) => void;
  undo: () => void;
  redo: () => void;
}

export const useThumbnailStore = create<ThumbnailState>((set) => ({
  imageUrl: null,
  elements: [],
  history: [],
  historyIndex: -1,
  title: '',
  subtitle: '',
  keywords: [],
  colorPalette: '',
  style: '',
  aiModel: 'openai',
  
  setImageUrl: (url) => set({ imageUrl: url }),
  
  addElement: (element) => set((state) => ({ 
    elements: [...state.elements, element] 
  })),
  
  updateElement: (id, props) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ? { ...el, ...props } : el
    )
  })),
  
  removeElement: (id) => set((state) => ({
    elements: state.elements.filter(el => el.id !== id)
  })),
  
  setFormData: (data) => set((state) => ({
    ...state,
    ...data
  })),
  
  addToHistory: (canvasState) => set((state) => {
    const newHistory = [...state.history.slice(0, state.historyIndex + 1), canvasState];
    return {
      history: newHistory,
      historyIndex: newHistory.length - 1
    };
  }),
  
  undo: () => set((state) => {
    if (state.historyIndex <= 0) return state;
    return { historyIndex: state.historyIndex - 1 };
  }),
  
  redo: () => set((state) => {
    if (state.historyIndex >= state.history.length - 1) return state;
    return { historyIndex: state.historyIndex + 1 };
  })
})); 