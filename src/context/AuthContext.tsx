import { 
  createContext, 
  useContext, 
  useState, 
  type ReactNode 
} from 'react';  // 🔹 Больше не нужен useLayoutEffect!

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string } | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  checkToken: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

// 🔹 Вспомогательная функция для чтения из localStorage
const getInitialAuth = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = localStorage.getItem(USER_KEY);
    
    if (token && userData) {
      return {
        isAuthenticated: true,
        user: JSON.parse(userData) as { email: string }
      };
    }
  } catch {
    // Если данные повреждены — очищаем
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
  return { isAuthenticated: false, user: null };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 🔹 Читаем из localStorage ПРЯМО при инициализации состояния (не в эффекте!)
  const initial = getInitialAuth();
  
  const [isAuthenticated, setIsAuthenticated] = useState(initial.isAuthenticated);
  const [user, setUser] = useState<{ email: string } | null>(initial.user);

  // 🔹 Больше НЕТ useEffect/useLayoutEffect для инициализации!
  // Предупреждение исчезнет, потому что setState вызывается не в эффекте

  const login = (token: string, email: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify({ email }));
    setIsAuthenticated(true);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkToken = () => !!localStorage.getItem(TOKEN_KEY);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      checkToken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth должен использоваться внутри AuthProvider');
  return ctx;
};