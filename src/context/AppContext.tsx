/* eslint-disable react-refresh/only-export-components */
// src/context/AppContext.tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from '../types';

interface AppContextType {
  productsCache: Product[];
  setProductsCache: (products: Product[]) => void;
  favorites: string[];              // ← ИЗМЕНЕНО: number[] → string[]
  toggleFavorite: (id: string) => void;  // ← ИЗМЕНЕНО: number → string
  isFavorite: (id: string) => boolean;   // ← ИЗМЕНЕНО: number → string
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Загружаем избранное из localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [productsCache, setProductsCache] = useState<Product[]>([]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // ← ИЗМЕНЕНО: id: number → id: string
  const toggleFavorite = useCallback((id: string) => {
  setFavorites(prev => 
    prev.includes(id) 
      ? prev.filter(favId => favId !== id)
      : [...prev, id]
  );
}, []);

  // ← ИЗМЕНЕНО: id: number → id: string
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);  // ✅ [favorites]

  return (
    <AppContext.Provider value={{
      productsCache,
      setProductsCache,
      favorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp должен использоваться внутри AppProvider');
  }
  return context;
};