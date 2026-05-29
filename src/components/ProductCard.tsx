import { memo } from 'react';  // ✅ Импорт memo
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useApp } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
}

// ✅ Компонент обернут в memo
export const ProductCard = memo(({ product }: ProductCardProps) => {
  const { toggleFavorite, isFavorite } = useApp();

  return (
    <div style={{ 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      padding: '1rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '0.5rem',
      background: 'white'
    }}>
      <img 
        src={product.image} 
        alt={product.title} 
        style={{ width: '100%', height: '160px', objectFit: 'contain' }} 
      />
      
      <h3 style={{ fontSize: '1rem', margin: 0, lineHeight: 1.3 }}>
        {product.title}
      </h3>
      
      <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
        {product.description.slice(0, 60)}...
      </p>
      
      <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>
        {product.price} | {product.category}
      </p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
        <Link 
          to={`/list/${product.id}`} 
          style={{ 
            flex: 1, 
            textAlign: 'center', 
            padding: '0.5rem', 
            background: '#2563eb', 
            color: 'white', 
            borderRadius: '6px', 
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}
        >
          Подробнее
        </Link>
        <button 
          onClick={() => toggleFavorite(product.id)} 
          style={{ 
            padding: '0.5rem 0.8rem', 
            border: '2px solid #d1d5db', 
            background: isFavorite(product.id) ? '#fef2f2' : 'transparent', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
          title={isFavorite(product.id) ? 'Убрать из закладок' : 'Добавить в закладки'}
          aria-label={isFavorite(product.id) ? 'Убрать из закладок' : 'Добавить в закладки'}
        >
          {isFavorite(product.id) ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
});

// ✅ Отображаемое имя для отладки (опционально)
ProductCard.displayName = 'ProductCard';