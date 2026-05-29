/// <reference types="@testing-library/jest-dom" />
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../types';

const mockProduct: Product = {
  id: 'tt0468569',
  title: 'The Dark Knight',
  description: 'Год: 2008 | Тип: movie',
  price: 2008,
  image: 'https://m.media-amazon.com/images/M/poster.jpg',
  category: 'movie'
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AppProvider>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </AppProvider>
  );
};

describe('ProductCard', () => {
  test('отображает название фильма', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
  });

  test('отображает метаинформацию (содержит год)', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const paragraphs = screen.getAllByText((content) => content.includes('2008'));
    expect(paragraphs.length).toBeGreaterThan(0);
  });

  test('кнопка "Подробнее" существует', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    expect(screen.getByRole('link', { name: /подробнее/i })).toBeInTheDocument();
  });

  test('изображение имеет alt-атрибут', () => {
    renderWithProviders(<ProductCard product={mockProduct} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'The Dark Knight');
  });
});