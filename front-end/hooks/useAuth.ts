// hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export const useAuth = (): AuthState & {
  login: (userData: User, tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
} => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const userStr = localStorage.getItem('user');
        
        if (accessToken && userStr) {
          const user = JSON.parse(userStr);
          
          // Vérifier si le token n'est pas expiré (optionnel)
          // Vous pouvez ajouter une validation JWT ici
          
          setAuthState({
            isAuthenticated: true,
            user,
            isLoading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        // En cas d'erreur, nettoyer le localStorage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User, tokens: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    setAuthState({
      isAuthenticated: true,
      user: userData,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
};