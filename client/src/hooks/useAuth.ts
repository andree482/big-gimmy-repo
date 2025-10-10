import { useState, useEffect } from 'react';

export interface AuthUser {
  username: string;
  loginTime?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null
  });

  const checkAuthStatus = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const response = await fetch('/api/auth/check', {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to check auth status');
      }

      const data = await response.json();

      if (data.success) {
        setAuthState({
          isAuthenticated: data.authenticated,
          user: data.user || null,
          isLoading: false,
          error: null
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
          error: data.message || 'Auth check failed'
        });
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Auth check failed'
      });
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Update immediato e sincrono dello stato
        setAuthState({
          isAuthenticated: true,
          user: data.user,
          isLoading: false,
          error: null
        });
        return { success: true };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: data.message || 'Login failed'
        }));
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return { success: false, message: errorMessage };
    }
  };

  const logout = async (): Promise<{ success: boolean; message?: string }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      const data = await response.json();

      // Sempre resetta lo stato locale anche se la richiesta fallisce
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null
      });

      return { success: data.success || true, message: data.message };
    } catch (error) {
      // Anche in caso di errore, resetta lo stato locale
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null
      });
      return { success: true, message: 'Logout completed locally' };
    }
  };

  // Check auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    ...authState,
    login,
    logout,
    checkAuthStatus
  };
};