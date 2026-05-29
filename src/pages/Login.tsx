import { useState, type FormEvent } from 'react';  // 🔹 type для FormEvent
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // 🔹 Обработка отправки формы
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 🔹 Валидация email (простой regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return setError('Введите корректный email');
    }
    
    // 🔹 Валидация пароля (минимум 6 символов)
    if (!password || password.length < 6) {
      return setError('Пароль должен содержать не менее 6 символов');
    }
    
    try {
      // 🔹 Для демо: эмулируем успешный вход (без реального API)
      // В реальном проекте раскомментируй fetch ниже:
      /*
      const res = await fetch('https://example.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Неверный email или пароль');
      const data = await res.json();
      login(data.token, email);
      */
      
      // 🔹 Демо-режим: всегда успешно (для тестирования)
      login('demo-token-123', email);
      navigate('/');  // 🔹 Перенаправляем на главную после входа
      
    } catch (err: unknown) {  // 🔹 unknown вместо any
      const msg = err instanceof Error ? err.message : 'Ошибка входа';
      setError(msg);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1.5rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>🔐 Вход</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        
        {/* Поле Email */}
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 14,
              boxSizing: 'border-box'
            }}
            disabled={false}
          />
        </div>
        
        {/* Поле Пароль */}
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>
            Пароль
          </label>
          <input
            id="password"
            type="password"
            placeholder="Минимум 6 символов"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              fontSize: 14,
              boxSizing: 'border-box'
            }}
            disabled={false}
          />
        </div>
        
        {/* Сообщение об ошибке */}
        {error && (
          <span style={{ color: '#ef4444', fontSize: 14, marginTop: 4 }}>{error}</span>
        )}
        
        {/* Кнопка входа */}
        <button
          type="submit"
          style={{
            padding: 10,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500,
            marginTop: 8
          }}
        >
          Войти
        </button>
        
      </form>
    </div>
  );
};