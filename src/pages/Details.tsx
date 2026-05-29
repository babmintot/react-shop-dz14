// src/pages/Details.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/services/api';
import { useApp } from '@/context/AppContext';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { Product } from '../types';

export const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { productsCache, toggleFavorite, isFavorite } = useApp();
  
  const [product, setProduct] = useState<Product | null>(() => {
    // ✅ id уже строка, Number() не нужен
    const found = productsCache.find((p: Product) => p.id === id);
    return found || null;
  });

  const [loading, setLoading] = useState(!product);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || product) return;

    // ✅ id передаём как строку
    getProductById(id)
      .then((data: Product) => setProduct(data))
      .catch((e: unknown) => {
        const message = e instanceof Error ? e.message : 'Ошибка загрузки';
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [id, product]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => navigate('/list')} />;
  if (!product) return <ErrorMessage message="Фильм не найден" onRetry={() => navigate('/list')} />;

  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '8px' }} 
        />
      </div>
      
      <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ margin: 0 }}>{product.title}</h1>
        <p style={{ color: '#666', margin: 0 }}>🎭 {product.category}</p>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669', margin: 0 }}>
          📅 {product.price}
        </p>
        <p style={{ lineHeight: 1.6, color: '#333' }}>{product.description}</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button 
            onClick={() => toggleFavorite(product.id)}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              background: isFavorite(product.id) ? '#ef4444' : '#f3f4f6',
              color: isFavorite(product.id) ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            {isFavorite(product.id) ? '🔖 В закладках' : '📑 В закладки'}
          </button>

          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              cursor: 'pointer',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '6px'
            }}
          >
            ← Назад
          </button>
        </div>
      </div>
    </div>
  );
};