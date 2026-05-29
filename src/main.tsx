import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// 🔹 Регистрация Service Worker (вынесена отдельно)
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('[SW] Зарегистрирован:', registration.scope);
        })
        .catch((error) => {
          console.error('[SW] Ошибка регистрации:', error);
        });
    });
  }
};

// 🔹 Вызываем регистрацию ДО рендера
registerServiceWorker();

// 🔹 Рендер приложения
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);