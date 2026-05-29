import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🔹 Импорт из ДЗ 13
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Spinner } from '@/components/Spinner';

// 🔹 Импорт из ДЗ 14
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { NetworkStatus } from '@/components/NetworkStatus';
import { Login } from '@/pages/Login';

// 🔹 Ленивая загрузка страниц (ДЗ 13)
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const List = lazy(() => import('@/pages/List').then(m => ({ default: m.List })));
const Details = lazy(() => import('@/pages/Details').then(m => ({ default: m.Details })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Favorites = lazy(() => import('@/pages/Favorites').then(m => ({ default: m.Favorites })));

function App() {
  return (
    // 🔹 AuthProvider оборачивает всё приложение (ДЗ 14)
    <AuthProvider>
      {/* 🔹 AppProvider для избранного (ДЗ 13) */}
      <AppProvider>
        <BrowserRouter>
          {/* 🔹 Глобальный индикатор сети (ДЗ 14) */}
          <NetworkStatus />
          
          {/* 🔹 Navbar уже обновлён — оставляем как есть */}
          <Navbar />
          
          <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
            <Suspense fallback={<Spinner />}>
              <Routes>
                {/* 🔹 Публичный маршрут: вход (ДЗ 14) */}
                <Route path="/login" element={<Login />} />
                
                {/* 🔹 Защищённые маршруты (ДЗ 14 + ДЗ 13) */}
                <Route path="/" element={
                  <ProtectedRoute><Home /></ProtectedRoute>
                } />
                <Route path="/list" element={
                  <ProtectedRoute><List /></ProtectedRoute>
                } />
                <Route path="/list/:id" element={
                  <ProtectedRoute><Details /></ProtectedRoute>
                } />
                <Route path="/about" element={
                  <ProtectedRoute><About /></ProtectedRoute>
                } />
                <Route path="/favorites" element={
                  <ProtectedRoute><Favorites /></ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </main>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;