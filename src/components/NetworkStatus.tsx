import { useOnlineStatus } from '@/hooks/useOnlineStatus';

export const NetworkStatus = () => {
  const online = useOnlineStatus();
  
  // 🔹 Простой рендер без useEffect — убираем предупреждение о setState
  if (online) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '0.75rem 1.5rem',
      background: '#ef4444',
      color: 'white',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      borderRadius: '8px',
      zIndex: 9999,
      fontSize: '0.9rem'
    }}>
      📴 Вы в офлайн-режиме
    </div>
  );
};