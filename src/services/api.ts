// src/services/api.ts
import type { Product } from '../types';

const API_KEY = '20d9ed08';
const BASE_URL = 'https://www.omdbapi.com/';
const SEARCH_QUERY = 'batman';

// Тип для ответа OMDb (чтобы убрать 'any')
interface OMDbSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface OMDbDetailsResult {
  imdbID: string;
  Title: string;
  Plot: string;
  Year: string;
  Genre: string;
  Poster: string;
  Response: string;
  Error?: string;
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${SEARCH_QUERY}&type=movie`);
  
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  
  const data: { Search: OMDbSearchResult[] } = await response.json();
  
  if (!data.Search || data.Search.length === 0) {
    throw new Error('Фильмы не найдены');
  }
  
  return data.Search.map((movie: OMDbSearchResult) => ({
    id: movie.imdbID,
    title: movie.Title,
    description: `Год: ${movie.Year} | Тип: ${movie.Type}`,
    price: parseInt(movie.Year) || 0,
    image: movie.Poster !== 'N/A' 
      ? movie.Poster 
      : 'https://via.placeholder.com/300x450?text=No+Poster',
    category: movie.Type
  }));
};

// ← Исправлено: id: number → id: string
export const getProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
  
  if (!response.ok) {
    throw new Error(`Фильм не найден: ${response.status}`);
  }
  
  const movie: OMDbDetailsResult = await response.json();
  
  if (movie.Response === 'False') {
    throw new Error(movie.Error || 'Фильм не найден');
  }
  
  return {
    id: movie.imdbID,
    title: movie.Title,
    description: movie.Plot || 'Описание отсутствует',
    price: parseInt(movie.Year) || 0,
    image: movie.Poster !== 'N/A' 
      ? movie.Poster 
      : 'https://via.placeholder.com/300x450?text=No+Poster',
    category: `${movie.Genre || 'Unknown'} | ${movie.Year}`
  };
};