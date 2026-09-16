import {
    createContext,
    useContext,
    useState,
} from 'react';

import type {
    ReactNode,
} from 'react';

import {
    apiRequest,
} from '@/services/api';

type User = {
  id: number;
  name: string;
  email: string;
  created_at?: string;
};

type AuthResponse = {
  success: boolean;
  message: string;
  token: string;
  user: User;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => void;

  updateName: (
    name: string
  ) => void;
};

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function login(
    email: string,
    password: string
  ): Promise<boolean> {
    if (
      !email.trim() ||
      !password.trim()
    ) {
      return false;
    }

    try {
      setLoading(true);

      const response =
        await apiRequest<AuthResponse>(
          '/auth/login',
          {
            method: 'POST',
            body: {
              email: email.trim(),
              password,
            },
          }
        );

      setUser(response.user);
      setToken(response.token);

      return true;
    } catch (error) {
      console.error(
        'Login error:',
        error
      );

      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signup(
    name: string,
    email: string,
    password: string
  ): Promise<boolean> {
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      return false;
    }

    try {
      setLoading(true);

      const response =
        await apiRequest<AuthResponse>(
          '/auth/signup',
          {
            method: 'POST',
            body: {
              name: name.trim(),
              email: email
                .trim()
                .toLowerCase(),
              password,
            },
          }
        );

      setUser(response.user);
      setToken(response.token);

      return true;
    } catch (error) {
      console.error(
        'Signup error:',
        error
      );

      return false;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  function updateName(
    name: string
  ) {
    if (!name.trim()) {
      return;
    }

    setUser((currentUser) => {
      if (!currentUser) {
        return null;
      }

      return {
        ...currentUser,
        name: name.trim(),
      };
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}