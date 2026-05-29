export const ErrorMessage = ({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry: () => void;
}) => (
  <div style={{ textAlign: 'center', padding: '3rem', color: '#dc2626' }}>
    <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>❌ {message}</p>
    <button 
      onClick={onRetry} 
      style={{ 
        padding: '0.6rem 1.2rem', 
        background: '#2563eb', 
        color: 'white', 
        border: 'none', 
        borderRadius: '6px', 
        cursor: 'pointer',
        fontSize: '1rem'
      }}
    >
      Попробовать снова
    </button>
  </div>
);