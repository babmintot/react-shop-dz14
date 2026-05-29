/// <reference types="@testing-library/jest-dom" />
import { render, screen, waitFor, act } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('рендерится без ошибок и показывает навигацию', async () => {
    // Мокаем fetch, чтобы не делать реальные запросы к API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ Search: [], Response: 'True' }),
      })
    ) as jest.Mock;

    // ✅ Мокаем ленивые импорты, чтобы они разрешались мгновенно
    jest.mock('@/pages/Home', () => ({
      Home: () => <div data-testid="home-page">Добро пожаловать в кинокаталог!</div>
    }));

    await act(async () => {
      render(<App />);
    });
    
    // ✅ Ждём, пока прогрузятся ленивые компоненты
    await waitFor(() => {
      expect(screen.getByRole('link', { name: /главная/i })).toBeInTheDocument();
    }, { timeout: 3000 });
    
    expect(screen.getByRole('link', { name: /каталог/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /закладки/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /о нас/i })).toBeInTheDocument();
    
    // ✅ Проверяем контент (мокаемый или реальный)
    await waitFor(() => {
      expect(
        screen.getByText(/добро пожаловать|кинокаталог|каталог фильмов/i)
      ).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});