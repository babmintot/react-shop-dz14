import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';      // 🔹 ДЗ 13: избранное
import { useAuth } from '@/context/AuthContext';    // 🔹 ДЗ 14: авторизация

export const Navbar = () => {
  const { favorites } = useApp();                   // 🔹 ДЗ 13
  const { isAuthenticated, user, logout } = useAuth(); // 🔹 ДЗ 14
  const navigate = useNavigate();

  // Стиль для активной ссылки
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#2563eb' : 'inherit',
    textDecoration: 'none',
    padding: '0.5rem'
  });

  // 🔹 Обработчик выхода (ДЗ 14)
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between',  // 🔹 Разносим навигацию и авторизацию по краям
      alignItems: 'center',
      gap: '1rem', 
      padding: '1rem 2rem', 
      background: '#f3f4f6',
      borderBottom: '1px solid #e5e7eb'
    }}>
      {/* 🔹 Левая часть: навигация (ДЗ 13) */}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <NavLink to="/" style={linkStyle}>Главная</NavLink>
        <NavLink to="/list" style={linkStyle}>Каталог</NavLink>
        <NavLink to="/about" style={linkStyle}>О нас</NavLink>
        <NavLink to="/favorites" style={linkStyle}>
          🔖 Закладки ({favorites.length})
        </NavLink>
      </div>
      
      {/* 🔹 Правая часть: авторизация (ДЗ 14) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated ? (
          // ✅ Авторизован: показываем имя + кнопку выхода
          <>
            <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
              👤 {user?.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Выйти
            </button>
          </>
        ) : (
          // ❌ Не авторизован: показываем кнопку входа
          <NavLink
            to="/login"
            style={{
              padding: '0.5rem 1rem',
              background: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            Войти
          </NavLink>
        )}
      </div>
    </nav>
  );
};