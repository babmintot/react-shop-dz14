import { useEffect, useState } from 'react';
import { getProducts } from '@/services/api';
import { useApp } from '@/context/AppContext';
import { ProductCard } from '@/components/ProductCard';
import { Spinner } from '@/components/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import type { Product } from '../types';

export const List = () => {
  const { productsCache, setProductsCache } = useApp();
  const [loading, setLoading] = useState(!productsCache.length);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productsCache.length > 0) {
      // ✅ Не вызываем setLoading здесь — полагаемся на начальное значение useState
      return;
    }

        getProducts()
        .then((data: Product[]) => {
        setProductsCache(data);
        setLoading(false);
        })
        .catch((e: Error) => {
        setError(e.message);
        setLoading(false);
        });
  }, [productsCache.length, setProductsCache]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div style={{ padding: '1rem' }}>
      <h1> Каталог фильмов</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
        gap: '1.5rem', 
        marginTop: '1.5rem' 
      }}>
        {productsCache.map((product: Product) => (  // ← Явный тип для product
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};